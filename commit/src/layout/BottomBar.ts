export function BottomBar(): string {
  return `<div class="bottom-bar">
      <div class="shortcuts-bar">
        <span class="shortcut"><span class="kbd">Esc</span> Cancel</span>
        <span class="shortcut"><span class="kbd">⏎</span> Commit</span>
        <span class="shortcut"><span class="kbd">⇧</span><span class="kbd">⏎</span> Commit & Push</span>
      </div>
      <div class="bottom-bar-right">
        <button class="btn" id="btnCancel">Cancel</button>
        <div class="split-btn-container" id="commitContainer">
          <button class="btn btn-primary btn-split-left" id="btnCommit" disabled>Commit</button>
          <button class="btn btn-primary btn-split-right" id="btnCommitMenuToggle" disabled aria-label="More options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="popover-menu" id="commitMenu">
            <div class="menu-item" id="miCommit">
              <div>Commit<span class="desc">Create a local commit</span></div>
              <span class="menu-shortcut"><span class="kbd">⏎</span></span>
            </div>
            <div class="menu-item" id="miCommitPush">
              <div>Commit & Push<span class="desc">Create commit and push to remote</span></div>
              <span class="menu-shortcut"><span class="kbd">⇧</span><span class="kbd">⏎</span></span>
            </div>
          </div>
        </div>`;
}
