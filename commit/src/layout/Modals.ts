export function Modals(): string {
  return `<div class="overlay" id="generateOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span>Generating Commit</span>
        <span class="overlay-header-counter" id="genCounter">0/4</span>
      </div>
      <div class="overlay-body">
        <div class="progress-steps" id="generateSteps">
          <div class="step" data-step="0">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Analyzing selected files</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="1">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Detecting logical groupings</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="2">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Generating commit message</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="3">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Finalizing commit</span>
            </div>
            <span class="step-status">queue</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Commit Progress Overlay -->
  <div class="overlay" id="commitOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span id="commitOverlayTitle">Committing changes</span>
        <span class="overlay-header-counter" id="commitCounter">0/4</span>
      </div>
      <div class="overlay-body">
        <div class="progress-steps" id="commitSteps">
          <div class="step" data-step="0">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Finalizing commit</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="1">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Creating commit objects</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="2">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Connecting to GitHub</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="3">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Sending commit payload</span>
            </div>
            <span class="step-status">queue</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Prompt Overlay -->
  <div class="overlay" id="promptOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span>Generate with prompt</span>
        <button class="btn btn-ghost" id="promptClose" style="padding:4px 8px;">✕</button>
      </div>
      <div class="overlay-body">
        <p class="prompt-subtitle">Provide additional context to generate more accurate commit messages.</p>
        <textarea class="prompt-input" id="promptInput" placeholder="What should these commits emphasize or avoid? (scope, split, tone, issue links)."></textarea>
        <div class="model-selector">
          <label class="form-label">Model</label>
          <select class="form-input" id="modelSelect">
            <option value="gpt-4o" selected>GPT-4o (Default)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="gemini-pro">Gemini Pro</option>
          </select>
        </div>
      </div>
      <div class="prompt-actions">
        <button class="btn" id="promptCancel">Cancel</button>
        <button class="btn btn-primary" id="promptGenerate">Generate</button>
      </div>
    </div>
  </div>

  <!-- Context Menu -->
  <div class="context-menu" id="contextMenu">
    <div class="context-menu-item" id="ctxCopyPath">Copy file path</div>
    <div class="context-menu-item" id="ctxOpenBrowser">Open in file browser</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" id="ctxCheckAll">Check all</div>
    <div class="context-menu-item" id="ctxUncheckAll">Uncheck all</div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" id="ctxCheckSelected">Check selected</div>
    <div class="context-menu-item" id="ctxUncheckSelected">Uncheck selected</div>
  </div>`;
}
