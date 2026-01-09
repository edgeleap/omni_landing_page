export function Sidebar(): string {
  return `<aside class="sidebar">

        <!-- File Changes -->
        <div class="sidebar-section" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">
          <div class="section-header">
            <span class="label">File changes</span>
            <span class="meta" id="fileCount">0 Files</span>
          </div>
          <div style="margin-bottom:10px;">
            <div class="dropdown-search" style="padding:0; border:none;">
              <input type="text" id="fileFilter" placeholder="Filter files..." />
              <button class="clear-btn" id="fileFilterClear" aria-label="Clear">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div id="fileList" style="flex:1; overflow-y:auto;"></div>
        </div>

        <!-- Proposed Commits (hidden until generate) -->
        <div class="sidebar-section" id="commitsSection" style="display:none; flex:1; overflow:hidden; flex-direction:column;">
          <div class="section-header">
            <span class="label">Proposed commits</span>
            <span class="meta" id="commitCount">0 / 0</span>
          </div>
          <div id="commitList" style="flex:1; overflow-y:auto;"></div>
        </div>

      </aside>`;
}
