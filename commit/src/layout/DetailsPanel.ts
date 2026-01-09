export function DetailsPanel(): string {
  return `<section class="details-panel">

        <!-- Top Bar -->
        <div class="top-bar">
          <label class="autosplit-row" id="autosplitToggle">
            <input type="checkbox" class="checkbox" id="autosplitCheck" checked />
            <span>Auto-split commits</span>
          </label>

          <div style="flex:1;"></div>

          <!-- Branch selector -->
          <div class="dropdown-container">
            <button class="btn" id="btnBranch">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="6" y1="3" x2="6" y2="15"></line>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
              <span>Branch: <span id="branchLabel">main</span></span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="dropdown" id="branchDropdown">
              <div class="dropdown-header">
                <span>Select branch</span>
                <span class="branch-count" id="branchCount">7</span>
              </div>
              <div class="dropdown-search">
                <input type="text" id="branchFilter" placeholder="Filter branches..." />
                <button class="clear-btn" id="branchFilterClear" aria-label="Clear">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="dropdown-list" id="branchList"></div>
            </div>
          </div>

          <!-- Generate split button -->
          <div class="split-btn-container" id="generateContainer">
            <button class="btn btn-primary btn-split-left" id="btnGenerate" disabled>Generate commit</button>
            <button class="btn btn-primary btn-split-right" id="btnGenerateMenuToggle" disabled aria-label="More options">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="popover-menu popover-down" id="generateMenu">
              <div class="menu-item" id="miGenerate">
                <div>
                  Generate commit
                  <span class="desc">Generate commits based on the current file changes</span>
                </div>
                <span class="menu-shortcut"><span class="kbd">⌘</span><span class="kbd">G</span></span>
              </div>
              <div class="menu-item" id="miGeneratePrompt">
                <div>
                  Generate with prompt
                  <span class="desc">Provide additional context for more accurate messages</span>
                </div>
                <span class="menu-shortcut"><span class="kbd">⇧</span><span class="kbd">⌘</span><span class="kbd">G</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Content Area -->
        <div class="details-content-area">

          <!-- Placeholder -->
          <div class="placeholder-state" id="placeholder">
            <div class="title">Nothing selected</div>
            <div class="desc">Select a file on the left to inspect details.</div>
          </div>

          <!-- File view -->
          <div class="detail-view" id="fileView">
            <div class="code-box">
              <div class="code-header">
                <span class="code-path" id="codePath"></span>
                <span class="code-meta" id="codeMeta"></span>
              </div>
              <div class="code-content" id="codeContent"></div>
            </div>
          </div>

          <!-- Commit editor view -->
          <div class="detail-view" id="commitView">
            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
                <label class="form-label" style="margin-bottom:0;">Title</label>
                <span class="char-count" id="titleCount" style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">0 chars</span>
              </div>
              <input type="text" class="form-input" id="titleInput" placeholder="e.g., feat: add user authentication…" />
            </div>

            <div class="form-group flex-grow">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
                <label class="form-label" style="margin-bottom:0;">Description</label>
                <span id="bodyCount" style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">0 chars</span>
              </div>
              <textarea class="form-input" id="bodyInput" placeholder="Why this change? Link issues or add context…"></textarea>
            </div>

            <div class="detail-files">
              <div class="detail-files-header">
                <span>Files in commit</span>
                <span class="detail-files-stats" id="fileStats">
                  <span id="fileCountStats">0 files</span>
                  <span class="add" id="insertionStats">+0 insertions</span>
                  <span class="rem" id="deletionStats">−0 deletions</span>
                </span>
              </div>
              <div class="detail-files-grid" id="fileGrid"></div>
            </div>
          </div>

        </div>

      </section>`;
}
