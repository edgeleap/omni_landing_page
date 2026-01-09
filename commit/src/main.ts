// src/main.ts
import './styles/main.css';
import { getLayoutHTML } from './layout/index';

// Inject layout into body
document.body.innerHTML = getLayoutHTML();

// ============ ORIGINAL APP LOGIC ============
// The code below is your original JS, kept intact.
// Gradually refactor by importing from utils/ and store/.

// === Data ===
    const branches = ['main', 'develop', 'release/v1.2.0', 'feature/commit-generator', 'feature/auth-session', 'bugfix/ui-spacing', 'chore/deps'];
    let currentBranch = 'main';

    const fileData = [
      { id:'f1', path:'src/auth/login.ts', delta:'+84 -12', status:'M', checked:true, selected:false },
      { id:'f2', path:'src/auth/session.ts', delta:'+51 -8', status:'M', checked:true, selected:false },
      { id:'f3', path:'src/api/client.ts', delta:'+33 -6', status:'M', checked:true, selected:false },
      { id:'f4', path:'src/ui/Button.tsx', delta:'+22 -2', status:'M', checked:true, selected:false },
      { id:'f5', path:'src/ui/Toast.tsx', delta:'+18 -0', status:'M', checked:true, selected:false },
      { id:'f6', path:'README.md', delta:'+9 -1', status:'M', checked:true, selected:false },
      { id:'f7', path:'tests/auth.spec.ts', delta:'+44 -3', status:'A', checked:true, selected:false },
      { id:'f8', path:'docs/old.md', delta:'+0 -17', status:'R', checked:true, selected:false }
    ];

    const fileContents = {
      f1: ["import createClient from '../api/client';", "import validateLogin from './validation';", "", "export async function login(email: string, password: string) {", "  const ok = validateLogin(email, password);", "  if (!ok) throw new Error('Invalid credentials');", "  const client = createClient();", "  const res = await client.post('/login', { email, password });", "  return res.data;", "}"],
      f5: ["import { useEffect, useState } from 'react';", "", "type ToastProps = { id: string; title: string; body?: string };", "", "export function Toast({ title, body }: ToastProps) {", "  const [open, setOpen] = useState(true);", "  useEffect(() => {", "    const t = setTimeout(() => setOpen(false), 3800);", "    return () => clearTimeout(t);", "  }, []);", "", "  if (!open) return null;", "  return (", "    <div className='toast'>", "      <div className='title'>{title}</div>", "      {body ? <div className='body'>{body}</div> : null}", "    </div>", "  );", "}"],
      f8: ["Deprecated", "", "This document has been removed.", "Please refer to docs/new.md instead."]
    };

    const commitData = [
      { id:'c1', title:'feat(auth): introduce login+session wiring', subtitle:'4 files · +156 · -22', checked:true, selected:false, body:'- Summary: Create a minimal login session flow.\n- Notes: Keeps scope tight and reviewable.', files:['f1','f2','f4','f6'] },
      { id:'c2', title:'refactor(api): isolate client route composition', subtitle:'1 file · +33 · -6', checked:true, selected:false, body:'- Summary: Separate API client from routing layer.\n- Notes: No behavior change intended.', files:['f3'] },
      { id:'c3', title:'test(auth): cover login happy-path', subtitle:'1 file · +44 · -0', checked:true, selected:false, body:'- Summary: Add baseline coverage for login/session.\n- Notes: Focused on the green path only.', files:['f7'] }
    ];

    let commitsVisible = false;
    let lastFileIndex = null;
    let lastCommitIndex = null;

    // === DOM refs ===
    const fileListEl = document.getElementById('fileList');
    const fileCountEl = document.getElementById('fileCount');
    const fileFilterEl = document.getElementById('fileFilter');
    const fileFilterClearEl = document.getElementById('fileFilterClear');
    const commitListEl = document.getElementById('commitList');
    const commitCountEl = document.getElementById('commitCount');
    const commitsSectionEl = document.getElementById('commitsSection');

    const placeholder = document.getElementById('placeholder');
    const fileView = document.getElementById('fileView');
    const commitView = document.getElementById('commitView');
    const codePath = document.getElementById('codePath');
    const codeMeta = document.getElementById('codeMeta');
    const codeContent = document.getElementById('codeContent');
    const titleInput = document.getElementById('titleInput');
    const titleCount = document.getElementById('titleCount');
    const bodyInput = document.getElementById('bodyInput');
    const bodyCount = document.getElementById('bodyCount');
    const chipsEl = document.getElementById('chips');
    const chipsMeta = document.getElementById('chipsMeta');

    const btnBranch = document.getElementById('btnBranch');
    const branchLabel = document.getElementById('branchLabel');
    const branchDropdown = document.getElementById('branchDropdown');
    const branchFilter = document.getElementById('branchFilter');
    const branchFilterClear = document.getElementById('branchFilterClear');
    const branchList = document.getElementById('branchList');
    const branchCountEl = document.getElementById('branchCount');

    const btnGenerate = document.getElementById('btnGenerate');
    const btnGenerateMenuToggle = document.getElementById('btnGenerateMenuToggle');
    const generateMenu = document.getElementById('generateMenu');
    const generateOverlay = document.getElementById('generateOverlay');
    const genCounter = document.getElementById('genCounter');

    const btnCommit = document.getElementById('btnCommit');
    const btnCommitMenuToggle = document.getElementById('btnCommitMenuToggle');
    const commitMenu = document.getElementById('commitMenu');
    const commitOverlay = document.getElementById('commitOverlay');
    const commitCounter = document.getElementById('commitCounter');
    const commitOverlayTitle = document.getElementById('commitOverlayTitle');

    const promptOverlay = document.getElementById('promptOverlay');
    const promptInput = document.getElementById('promptInput');
    const modelSelect = document.getElementById('modelSelect');

    const contextMenu = document.getElementById('contextMenu');

    const autosplitCheck = document.getElementById('autosplitCheck');

    // === Helpers ===
    function escapeHTML(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function getCheckedFiles() { return fileData.filter(f => f.checked); }
    function getCheckedCommits() { return commitData.filter(c => c.checked); }
    function getSelectedFiles() { return fileData.filter(f => f.selected); }
    function getSelectedCommits() { return commitData.filter(c => c.selected); }

    // === Render functions ===
    function renderFileList() {
      const query = fileFilterEl.value.toLowerCase().trim();
      const visible = query ? fileData.filter(f => f.path.toLowerCase().includes(query)) : fileData;

      fileCountEl.textContent = getCheckedFiles().length + ' Files';
      fileFilterClearEl.classList.toggle('show', query.length > 0);

      fileListEl.innerHTML = '';
      visible.forEach((f, i) => {
        const idx = fileData.indexOf(f);
        const el = document.createElement('div');
        el.className = 'file-item' + (f.selected ? ' active' : '');
        el.dataset.index = idx;

        // Parse delta to apply styling
        const deltaMatch = f.delta.match(/\+(\d+).*-(\d+)/);
        let deltaHtml = escapeHTML(f.delta);
        if (deltaMatch) {
          deltaHtml = `<span class="add">+${deltaMatch[1]}</span> <span class="rem">−${deltaMatch[2]}</span>`;
        }

        el.innerHTML = `
          <input type="checkbox" class="checkbox" data-action="check" ${f.checked ? 'checked' : ''} />
          <span class="file-path">${escapeHTML(f.path)}</span>
          <span class="file-changes">${deltaHtml}</span>
          <span class="file-status ${f.status}">${f.status}</span>
        `;
        el.addEventListener('click', e => onFileClick(e, idx));
        el.addEventListener('contextmenu', e => onFileContext(e, idx));
        fileListEl.appendChild(el);
      });

      updateGenerateBtn();
    }

    function renderCommitList() {
      if (!commitsVisible) {
        commitsSectionEl.style.display = 'none';
        return;
      }
      commitsSectionEl.style.display = 'flex';
      commitCountEl.textContent = getCheckedCommits().length + ' / ' + commitData.length;

      commitListEl.innerHTML = '';
      commitData.forEach((c, idx) => {
        const el = document.createElement('div');
        el.className = 'commit-item' + (c.selected ? ' active' : '');
        el.dataset.index = idx;

        // Parse subtitle to apply styling to + and - numbers
        let subtitleHtml = escapeHTML(c.subtitle);
        const subtitleMatch = c.subtitle.match(/\+(\d+).*-(\d+)/);
        if (subtitleMatch) {
          subtitleHtml = c.subtitle.replace(/\+(\d+).*-(\d+)/, (match, add, del) => {
            return `· <span class="add">+${add}</span> · <span class="rem">−${del}</span>`;
          });
        }

        el.innerHTML = `
          <input type="checkbox" class="checkbox" data-action="check" ${c.checked ? 'checked' : ''} />
          <div class="commit-info">
            <div class="commit-title">${escapeHTML(c.title)}</div>
            <div class="commit-subtitle">${subtitleHtml}</div>
          </div>
        `;
        el.addEventListener('click', e => onCommitClick(e, idx));
        commitListEl.appendChild(el);
      });

      updateCommitBtn();
    }

    function renderDetails() {
      const selFiles = getSelectedFiles();
      const selCommits = getSelectedCommits();

      placeholder.style.display = 'none';
      fileView.classList.remove('active');
      commitView.classList.remove('active');

      if (selFiles.length === 1 && selCommits.length === 0) {
        const f = selFiles[0];
        fileView.classList.add('active');
        codePath.textContent = f.path;
        codeMeta.textContent = f.delta;
        const lines = fileContents[f.id] || ['No preview available for ' + f.path];
        codeContent.innerHTML = lines.map((line, i) => {
          return '<span class="ln">' + String(i+1).padStart(2,' ') + '</span>' + escapeHTML(line);
        }).join('\n');
      } else if (selCommits.length === 1 && selFiles.length === 0) {
        const c = selCommits[0];
        commitView.classList.add('active');
        titleInput.value = c.title;
        bodyInput.value = c.body;
        updateCharCount();
        renderFileDrawer(c);
      } else if (selFiles.length > 1) {
        placeholder.style.display = 'flex';
        placeholder.querySelector('.title').textContent = selFiles.length + ' files selected';
        placeholder.querySelector('.desc').textContent = selFiles.filter(f=>f.checked).length + ' of ' + selFiles.length + ' checked.\nRight-click for bulk actions.';
      } else if (selCommits.length > 1) {
        placeholder.style.display = 'flex';
        placeholder.querySelector('.title').textContent = selCommits.length + ' commits selected';
        placeholder.querySelector('.desc').textContent = 'Select a single commit to edit.';
      } else {
        placeholder.style.display = 'flex';
        placeholder.querySelector('.title').textContent = 'Nothing selected';
        placeholder.querySelector('.desc').textContent = 'Select a file on the left to inspect details.';
      }
    }

    function renderFileDrawer(c) {
      const fileGrid = document.getElementById('fileGrid');
      fileGrid.innerHTML = '';
      let add = 0, del = 0;

      c.files.forEach(fid => {
        const f = fileData.find(x => x.id === fid);
        if (!f) return;
        const m = f.delta.match(/\+(\d+).*-(\d+)/);
        if (m) { add += +m[1]; del += +m[2]; }

        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
          <span class="file-status ${f.status}">${f.status}</span>
          <span class="file-path">${escapeHTML(f.path)}</span>
          <span class="file-changes"><span class="add">+${m?m[1]:0}</span> <span class="rem">−${m?m[2]:0}</span></span>
        `;
        fileGrid.appendChild(item);
      });

      document.getElementById('fileCountStats').textContent = c.files.length + ' files';
      document.getElementById('insertionStats').textContent = '+' + add + ' insertions';
      document.getElementById('deletionStats').textContent = '−' + del + ' deletions';
    }

    function updateCharCount() {
      const tLen = titleInput.value.length;
      const bLen = bodyInput.value.length;
      titleCount.textContent = tLen + ' chars';
      titleCount.classList.remove('warning', 'danger');
      if (tLen > 72) titleCount.classList.add('danger');
      else if (tLen > 50) titleCount.classList.add('warning');
      bodyCount.textContent = bLen + ' chars';
    }

    function updateGenerateBtn() {
      const enabled = getCheckedFiles().length > 0;
      btnGenerate.disabled = !enabled;
      btnGenerateMenuToggle.disabled = !enabled;
    }

    function updateCommitBtn() {
      const enabled = commitsVisible && getCheckedCommits().length > 0;
      btnCommit.disabled = !enabled;
      btnCommitMenuToggle.disabled = !enabled;
    }

    // === Event handlers ===
    function onFileClick(e, idx) {
      if (e.target.closest('[data-action="check"]')) {
        fileData[idx].checked = !fileData[idx].checked;
        renderFileList();
        renderDetails();
        return;
      }
      commitData.forEach(c => c.selected = false);
      if (e.shiftKey && lastFileIndex !== null) {
        const a = Math.min(lastFileIndex, idx), b = Math.max(lastFileIndex, idx);
        fileData.forEach((f, i) => f.selected = i >= a && i <= b);
      } else if (e.metaKey || e.ctrlKey) {
        fileData[idx].selected = !fileData[idx].selected;
      } else {
        fileData.forEach(f => f.selected = false);
        fileData[idx].selected = true;
      }
      lastFileIndex = idx;
      renderFileList();
      renderCommitList();
      renderDetails();
    }

    function onCommitClick(e, idx) {
      if (e.target.closest('[data-action="check"]')) {
        commitData[idx].checked = !commitData[idx].checked;
        renderCommitList();
        return;
      }
      fileData.forEach(f => f.selected = false);
      if (e.shiftKey && lastCommitIndex !== null) {
        const a = Math.min(lastCommitIndex, idx), b = Math.max(lastCommitIndex, idx);
        commitData.forEach((c, i) => c.selected = i >= a && i <= b);
      } else if (e.metaKey || e.ctrlKey) {
        commitData[idx].selected = !commitData[idx].selected;
      } else {
        commitData.forEach(c => c.selected = false);
        commitData[idx].selected = true;
      }
      lastCommitIndex = idx;
      renderFileList();
      renderCommitList();
      renderDetails();
    }

    function onFileContext(e, idx) {
      e.preventDefault();
      if (!fileData[idx].selected) {
        fileData.forEach(f => f.selected = false);
        fileData[idx].selected = true;
        renderFileList();
        renderDetails();
      }
      contextMenu.style.left = e.clientX + 'px';
      contextMenu.style.top = e.clientY + 'px';
      contextMenu.classList.add('show');
    }

    // === Branch dropdown ===
    function renderBranchList() {
      const q = branchFilter.value.toLowerCase().trim();
      const filtered = q ? branches.filter(b => b.toLowerCase().includes(q)) : branches;
      branchFilterClear.classList.toggle('show', q.length > 0);
      branchCountEl.textContent = filtered.length;

      branchList.innerHTML = '';
      filtered.forEach(b => {
        const el = document.createElement('div');
        el.className = 'dropdown-item' + (b === currentBranch ? ' selected' : '');
        el.innerHTML = '<span>' + escapeHTML(b) + '</span>' + (b === currentBranch ? '<span class="branch-current-indicator">current</span>' : '');
        el.addEventListener('click', () => {
          currentBranch = b;
          branchLabel.textContent = b;
          branchDropdown.classList.remove('show');
        });
        branchList.appendChild(el);
      });
    }

    btnBranch.addEventListener('click', e => {
      e.stopPropagation();
      branchDropdown.classList.toggle('show');
      if (branchDropdown.classList.contains('show')) {
        renderBranchList();
        branchFilter.focus();
      }
    });
    branchFilter.addEventListener('input', renderBranchList);
    branchFilterClear.addEventListener('click', () => { branchFilter.value = ''; renderBranchList(); branchFilter.focus(); });

    // === Generate menu ===
    btnGenerateMenuToggle.addEventListener('click', e => {
      e.stopPropagation();
      if (!btnGenerateMenuToggle.disabled) generateMenu.classList.toggle('show');
    });
    btnGenerate.addEventListener('click', () => { if (!btnGenerate.disabled) runGenerate(); });
    document.getElementById('miGenerate').addEventListener('click', () => { generateMenu.classList.remove('show'); runGenerate(); });
    document.getElementById('miGeneratePrompt').addEventListener('click', () => { generateMenu.classList.remove('show'); promptOverlay.classList.add('show'); promptInput.focus(); });

    // === Commit menu ===
    btnCommitMenuToggle.addEventListener('click', e => {
      e.stopPropagation();
      if (!btnCommitMenuToggle.disabled) commitMenu.classList.toggle('show');
    });
    btnCommit.addEventListener('click', () => { if (!btnCommit.disabled) runCommit('commit'); });
    document.getElementById('miCommit').addEventListener('click', () => { commitMenu.classList.remove('show'); runCommit('commit'); });
    document.getElementById('miCommitPush').addEventListener('click', () => { commitMenu.classList.remove('show'); runCommit('commitPush'); });

    // === Prompt overlay ===
    document.getElementById('promptCancel').addEventListener('click', () => promptOverlay.classList.remove('show'));
    document.getElementById('promptClose').addEventListener('click', () => promptOverlay.classList.remove('show'));
    document.getElementById('promptGenerate').addEventListener('click', () => { promptOverlay.classList.remove('show'); runGenerate(); });

    // === Context menu actions ===
    document.getElementById('ctxCopyPath').addEventListener('click', () => {
      const paths = getSelectedFiles().map(f => f.path).join('\n');
      navigator.clipboard.writeText(paths);
      contextMenu.classList.remove('show');
    });
    document.getElementById('ctxOpenBrowser').addEventListener('click', () => {
      console.log('Open in browser:', getSelectedFiles().map(f => f.path));
      contextMenu.classList.remove('show');
    });
    document.getElementById('ctxCheckAll').addEventListener('click', () => { fileData.forEach(f => f.checked = true); renderFileList(); contextMenu.classList.remove('show'); });
    document.getElementById('ctxUncheckAll').addEventListener('click', () => { fileData.forEach(f => f.checked = false); renderFileList(); contextMenu.classList.remove('show'); });
    document.getElementById('ctxCheckSelected').addEventListener('click', () => { fileData.forEach(f => { if (f.selected) f.checked = true; }); renderFileList(); contextMenu.classList.remove('show'); });
    document.getElementById('ctxUncheckSelected').addEventListener('click', () => { fileData.forEach(f => { if (f.selected) f.checked = false; }); renderFileList(); contextMenu.classList.remove('show'); });

    // === File filter ===
    fileFilterEl.addEventListener('input', renderFileList);
    fileFilterClearEl.addEventListener('click', () => { fileFilterEl.value = ''; renderFileList(); fileFilterEl.focus(); });

    // === Title/body input ===
    titleInput.addEventListener('input', () => {
      const sel = getSelectedCommits();
      if (sel.length === 1) sel[0].title = titleInput.value;
      updateCharCount();
    });
    bodyInput.addEventListener('input', () => {
      const sel = getSelectedCommits();
      if (sel.length === 1) sel[0].body = bodyInput.value;
      updateCharCount();
    });

    // === Progress animations ===
    const genSubSteps = [
      ['Reading file metadata...', 'Computing differences...', 'Parsing changes...', 'Analyzing code...'],
      ['Loading file list...', 'Extracting key changes...', 'Identifying patterns...', 'Generating summary...'],
      ['Formatting message...', 'Adding context...', 'Including scope...', 'Finalizing format...'],
      ['Validating metadata...', 'Checking permissions...', 'Preparing payload...', 'Ready to commit...']
    ];

    const commitSubSteps = [
      ['Collecting metadata...', 'Validating inputs...', 'Building request...', 'Verifying permissions...'],
      ['Hashing tree objects...', 'Writing blob objects...', 'Creating tree...', 'Writing commit object...'],
      ['Updating HEAD...', 'Writing refs...', 'Syncing index...', 'Verifying integrity...'],
      ['Commit created!', 'All checks passed', 'Ready for push', 'Done']
    ];

    async function runProgress(overlay, counter, stepsEl, subSteps) {
      overlay.classList.add('show');
      const steps = stepsEl.querySelectorAll('.step');
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const status = step.querySelector('.step-status');
        const indicator = step.querySelector('.step-indicator');
        step.classList.add('active');
        indicator.innerHTML = '<div class="step-spinner"></div>';
        counter.textContent = i + '/' + steps.length;
        for (const sub of subSteps[i]) {
          status.textContent = sub;
          await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
        }
        step.classList.remove('active');
        step.classList.add('done');
        status.textContent = 'done';
        indicator.innerHTML = '✓';
        counter.textContent = (i+1) + '/' + steps.length;
      }
      await new Promise(r => setTimeout(r, 300));
      overlay.classList.remove('show');
      steps.forEach(s => {
        s.classList.remove('active', 'done');
        s.querySelector('.step-status').textContent = 'queue';
        s.querySelector('.step-indicator').innerHTML = '';
      });
    }

    async function runGenerate() {
      await runProgress(generateOverlay, genCounter, document.getElementById('generateSteps'), genSubSteps);
      commitsVisible = true;
      commitData.forEach(c => c.checked = true);
      fileData.forEach(f => f.selected = false);
      if (commitData.length > 0) commitData[0].selected = true;
      renderFileList();
      renderCommitList();
      renderDetails();
    }

    async function runCommit(mode) {
      commitOverlayTitle.textContent = mode === 'commitPush' ? 'Committing & pushing' : 'Committing changes';
      await runProgress(commitOverlay, commitCounter, document.getElementById('commitSteps'), commitSubSteps);
    }

    // === Global click to close menus ===
    document.addEventListener('click', () => {
      branchDropdown.classList.remove('show');
      generateMenu.classList.remove('show');
      commitMenu.classList.remove('show');
      contextMenu.classList.remove('show');
    });

    // === Keyboard shortcuts ===
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        branchDropdown.classList.remove('show');
        generateMenu.classList.remove('show');
        commitMenu.classList.remove('show');
        contextMenu.classList.remove('show');
        generateOverlay.classList.remove('show');
        commitOverlay.classList.remove('show');
        promptOverlay.classList.remove('show');
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'g' && !e.shiftKey) {
        e.preventDefault();
        if (!btnGenerate.disabled) runGenerate();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        if (!btnGenerate.disabled) { promptOverlay.classList.add('show'); promptInput.focus(); }
      }
    });

    // === Init ===
    fileData[0].selected = true;
    renderFileList();
    renderCommitList();
    renderDetails();
    renderBranchList();
