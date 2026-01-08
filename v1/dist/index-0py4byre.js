var a=`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Omni - Pull Request</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #09090b;
      --bg-tertiary: #141414;
      --bg-hover: #1a1a1a;
      --kbd-bg: rgba(255,255,255,0.05);
      --border: #27272a;
      --border-light: #3f3f46;
      --text-primary: #fafafa;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;
      --accent: #fafafa;
      --accent-dim: rgba(255,255,255,0.08);
      --green: #22c55e;
      --amber: #f59e0b;
      --orange: #fb923c;
      --red: #ef4444;
      --shadow: 0 25px 50px -12px rgba(0,0,0,0.65);
      --mono: 'JetBrains Mono', ui-monospace, monospace;
      --sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
      --radius: 10px;
    }

    html, body { height: 100%; }
    body {
      background: radial-gradient(1100px 700px at 70% 20%, rgba(255,255,255,0.04), transparent 60%),
                  radial-gradient(900px 650px at 15% 75%, rgba(34,197,94,0.04), transparent 62%),
                  linear-gradient(180deg, #000, #0a0a0a);
      color: var(--text-primary);
      font-family: var(--sans);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
    }

    /* Scanlines CRT effect */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.012), rgba(255,255,255,0.012) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 6px);
      mix-blend-mode: overlay;
      opacity: 0.18;
      z-index: 9999;
    }

    ::selection { background: rgba(255,255,255,0.2); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #52525b; }

    /* Main Window */
    .window {
      width: 100%;
      max-width: 1100px;
      height: min(680px, calc(100vh - 60px));
      background: rgba(9,9,11,0.88);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      backdrop-filter: blur(12px);
    }

    /* Status Bar (macOS style) */
    .status-bar {
      height: 44px;
      padding: 0 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .traffic-lights {
      display: flex;
      gap: 8px;
    }

    .traffic-light {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .traffic-light.red { background: #ff5f57; }
    .traffic-light.yellow { background: #febc2e; }
    .traffic-light.green { background: #28c840; }
    .traffic-light:hover { filter: brightness(1.15); transform: scale(1.1); }
    .traffic-light::after {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      background: rgba(0,0,0,0.15);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .traffic-light:hover::after { opacity: 1; }

    .status-title {
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-family: var(--mono);
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }

    .status-spacer { width: 52px; }

    /* Buttons */
    .btn {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      user-select: none;
    }
    .btn:hover { background: var(--bg-hover); border-color: var(--border-light); }
    .btn:active { transform: translateY(1px); }
    .btn:disabled, .btn[aria-disabled="true"] {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    .btn-primary {
      background: var(--text-primary);
      color: var(--bg-primary);
      border-color: transparent;
    }
    .btn-primary:hover { background: #e4e4e7; }

    .btn-ghost {
      background: transparent;
      border-color: transparent;
    }
    .btn-ghost:hover { background: var(--accent-dim); border-color: var(--border); }

    .btn .icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .btn .chevron {
      width: 12px;
      height: 12px;
      opacity: 0.5;
      margin-left: auto;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* Left Sidebar */
    .sidebar {
      width: 280px;
      border-right: 1px solid var(--border);
      background: rgba(0,0,0,0.16);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow: hidden;
    }

    .sidebar-section {
      padding: 12px;
      border-bottom: 1px solid rgba(39,39,42,0.5);
    }

    .sidebar-section:first-child {
      padding-top: 14px;
    }

    .sidebar-section:last-child { border-bottom: none; }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .section-header .label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .section-header .meta {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    /* PR Item */
    .pr-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border-radius: 6px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-secondary);
      transition: background 0.15s;
      cursor: pointer;
    }
    .pr-item:hover { background: var(--accent-dim); }
    .pr-item.active { background: var(--accent-dim); }

    .pr-number {
      flex-shrink: 0;
    }

    .pr-status {
      font-size: 11px;
      font-weight: 500;
      white-space: nowrap;
    }

    .pr-status.mergeable {
      color: var(--green);
    }

    /* File List */
    .file-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border-radius: 6px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-secondary);
      transition: background 0.15s;
      cursor: pointer;
    }
    .file-item:hover { background: var(--bg-hover); }
    .file-item.active { background: var(--accent-dim); }

    /* Commit detail file items use same styling as file stats */
    .detail-files-grid .file-item {
      background: var(--bg-tertiary);
      text-transform: none;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      opacity: 0.8;
    }

    /* NEW: Header layout styles */
    .detail-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .detail-header-buttons {
      display: flex;
      gap: 8px;
    }

    .detail-header-btn {
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .detail-header-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
      border-color: var(--border-light);
    }

    .detail-header-subtitle {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-muted);
      font-family: var(--mono);
    }

    /* Inline SHA + copy icon inside commit header subtitle */
    .commit-sha-inline {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .sha-copy-btn {
      width: 18px;
      height: 18px;
      padding: 0;
      border: 1px solid transparent;
      border-radius: 4px;
      background: transparent;
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .sha-copy-btn:hover {
      background: var(--accent-dim);
      border-color: var(--border);
      color: var(--text-primary);
    }

    .sha-copy-btn svg {
      width: 12px;
      height: 12px;
      opacity: 0.75;
    }

    /* NEW: Multi-line subtitle support */
    .detail-header-subtitle-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .detail-header-subtitle-row {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-muted);
      font-family: var(--mono);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* UPDATED: Files header layout to support flex */
    .detail-files-header {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 10px;
      display: flex; /* Added flex */
      align-items: center;
      justify-content: space-between; /* Spacing */
    }

    /* NEW: File stats styles */
    .detail-files-stats {
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 500;
      color: var(--text-muted);
      opacity: 0.7;
      text-transform: none;
      letter-spacing: normal;
      display: flex;
      gap: 12px;
    }

    /* Ensure all spans inside file stats use mono font */
    .detail-files-stats span {
      font-family: var(--mono);
    }

    .file-status {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .file-status.M { background: rgba(245,158,11,0.18); color: var(--amber); }
    .file-status.A { background: rgba(34,197,94,0.18); color: var(--green); }
    .file-status.R { background: rgba(239,68,68,0.18); color: var(--red); }

    .file-path {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-changes {
      font-size: 10px;
      color: var(--text-muted);
      white-space: nowrap;
    }
    .file-changes .add { color: var(--green); }
    .file-changes .rem { color: var(--red); }

    /* Commit List */
    .commit-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 6px;
      font-size: 12px;
      color: var(--text-secondary);
      transition: background 0.15s;
      cursor: pointer;
    }
    .commit-item:hover { background: var(--accent-dim); }
    .commit-item.active { background: var(--accent-dim); }

    .commit-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ffffff;
      margin-top: 5px;
      flex-shrink: 0;
    }

    .commit-msg {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--mono);
    }

    .empty-state {
      padding: 16px 12px;
      text-align: center;
      font-size: 12px;
      color: var(--text-muted);
      font-style: italic;
    }

    /* Details Panel */
    .details-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: rgba(0,0,0,0.08);
    }

    /* Top Bar - Now in Details Panel */
    .top-bar {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.18);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      flex-shrink: 0;
    }

    .top-bar.hidden {
      display: none;
    }

    .details-content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      overflow-y: auto;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group.flex-grow {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      background: rgba(0,0,0,0.25);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      font-family: var(--sans);
      font-size: 13px;
      color: var(--text-primary);
      transition: border-color 0.2s;
    }
    .form-input:focus { outline: none; border-color: var(--border-light); }

    /* Kbd - using system fonts for better symbol support */
    .kbd {
      padding: 2px 6px;
      background: var(--kbd-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace;
      color: var(--text-secondary);
      display: inline-block;
      vertical-align: baseline;
      transition: background 0.3s ease, border-color 0.2s ease, color 0.2s ease;
    }

    .form-input::placeholder { color: var(--text-muted); }

    textarea.form-input {
      flex: 1;
      min-height: 140px;
      resize: none;
      font-family: var(--mono);
      line-height: 1.6;
    }

    /* Detail Views */
    .detail-view {
      display: none;
      flex-direction: column;
      height: 100%;
    }

    .detail-view.active {
      display: flex;
    }

    .detail-view-header {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    .detail-view-subheader {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
      font-weight: 400;
    }

    .detail-content {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 20px;
    }

    .detail-text {
      font-family: var(--mono);
      font-size: 12px;
      line-height: 1.6;
      color: var(--text-secondary);
      white-space: pre-wrap;
    }

    .detail-files {
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }

    .detail-files-header {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 10px;
    }

    .detail-files-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .detail-files-grid .file-item {
      flex: 0 0 auto;
      min-width: 0;
    }

    /* Bottom Bar */
    .bottom-bar {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }

    .bottom-bar-left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    .shortcuts-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    .shortcuts-bar .shortcut {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .shortcuts-bar .shortcut .kbd {
      margin-right: 2px;
    }


    

    .bottom-bar-right {
      display: flex;
      gap: 10px;
    }

    /* Dropdown / Popover */
    .dropdown-container { position: relative; }

    .dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      min-width: 280px;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 100;
      overflow: hidden;
    }
    .dropdown.show { display: block; }

    .dropdown-header {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      background: rgba(0,0,0,0.25);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dropdown-header .branch-count {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .dropdown-search {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      position: relative;
    }

    .dropdown-search input {
      width: 100%;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 32px 8px 12px;
      font-size: 12px;
      color: var(--text-primary);
    }
    .dropdown-search input:focus { outline: none; border-color: var(--border-light); }
    .dropdown-search input::placeholder { color: var(--text-muted); }

    .clear-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
      display: none;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.15s;
    }
    .clear-btn:hover { 
      background: var(--accent-dim); 
      color: var(--text-secondary);
    }
    .clear-btn.show { display: flex; }

    .clear-btn svg {
      width: 14px;
      height: 14px;
    }

    .dropdown-list {
      max-height: 240px;
      overflow-y: auto;
      padding: 6px;
    }

    .dropdown-item {
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.12s;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
    }
    .dropdown-item:hover { background: var(--accent-dim); color: var(--text-primary); }

    .dropdown-item.selected { background: var(--accent-dim); color: var(--text-primary); }

    .dropdown-item .branch-icon {
      width: 14px;
      height: 14px;
      opacity: 0.6;
    }

    .branch-current-indicator {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--mono);
      margin-left: auto;
      padding-left: 8px;
    }

    /* Reviewer Dropdown */
    .reviewer-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.12s;
    }
    .reviewer-row:hover { background: var(--accent-dim); }

    .reviewer-checkbox {
      width: 16px;
      height: 16px;
      appearance: none;
      border: 1.5px solid var(--border-light);
      border-radius: 4px;
      background: var(--bg-primary);
      cursor: pointer;
      position: relative;
      flex-shrink: 0;
    }
    .reviewer-checkbox:checked {
      background: var(--text-primary);
      border-color: var(--text-primary);
    }
    .reviewer-checkbox:checked::after {
      content: '✓';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-primary);
      font-size: 10px;
      font-weight: bold;
    }

    .reviewer-info { flex: 1; min-width: 0; }
    .reviewer-info .name {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-primary);
    }
    .reviewer-info .handle {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--mono);
    }

    /* Overlay */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.70);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 200;
    }
    .overlay.show { display: flex; }

    .overlay-content {
      background: rgba(9,9,11,0.95);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow);
      width: min(520px, calc(100vw - 36px));
      overflow: hidden;
    }

    .overlay-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .overlay-header-counter {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .overlay-body {
      padding: 12px 16px;
    }

    /* Progress Steps */
    .progress-steps {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .step {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 0px;
      border-radius: 12px;
      background: transparent;
      border: none;
      font-family: var(--mono);
      font-size: 12.5px;
      color: var(--text-primary);
      transition: all 0.2s;
    }

    .step.done {
      color: var(--text-secondary);
      background: transparent;
    }

    .step-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .step-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      flex-shrink: 0;
      position: relative;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 400;
    }

    .step.active .step-indicator {
      border-color: rgba(251, 146, 60, 0.3);
    }
    
    .step.done .step-indicator {
      border-color: var(--green);
      background: rgba(34,197,94,0.15);
      color: var(--green);
    }

    .step-spinner {
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      border: 2px solid rgba(251, 146, 60, 0.25);
      border-top-color: rgba(251, 146, 60, 0.9);
      animation: spin 0.8s linear infinite;
    }

    .step-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .step-status {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-muted);
      flex-shrink: 0;
      min-width: 180px;
      text-align: right;
    }

    .step.active .step-status {
      color: var(--orange);
    }

    .step.done .step-status {
      color: var(--green);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .overlay.show .overlay-content {
      animation: fadeIn 0.22s ease;
    }

    /* Split Button Container */
    .split-btn-container {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    /* Apply unified hover effect to entire container */
    .split-btn-container:hover .btn {
      background: #e4e4e7 !important;
      border-color: var(--border-light) !important;
    }

    /* Apply unified active effect to entire container */
    .split-btn-container:active .btn {
      transform: translateY(1px) !important;
    }

    /* Remove default margins */
    .split-btn-container .btn {
      margin: 0;
    }

    /* Main Button (Left) */
    #btnCreate {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      padding-right: 12px;
      position: relative;
    }

    /* Vertical Separator */
    #btnCreate::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(113, 113, 122, 0.4);
      z-index: 1;
    }

    /* Chevron Button (Right) */
    #btnCreateMenuToggle {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      padding-left: 8px;
      padding-right: 8px;
      width: 32px;
    }

    /* Disabled State */
    .split-btn-container.disabled {
      opacity: 0.5;
    }

    .split-btn-container.disabled:hover .btn {
      background: rgba(0,0,0,0.22);
    }

    /* Popover Menu */
    .popover-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      width: 380px;              /* Fixed width as requested */
      height: 140px;             /* Fixed height as requested */
      min-width: 250px;
      display: none;
      z-index: 1000; /* Higher z-index to appear above everything */
      overflow: hidden;
      flex-direction: column;
      /* REMOVE: white-space: nowrap; */
    }

    .popover-menu.show {
      display: flex;
    }

    /* Popover that opens downward (used for top bar Generate split button) */
    .popover-menu.popover-down {
      bottom: auto;
      top: 100%;
      margin-top: 8px;
      margin-bottom: 0;
    }

    /* Generate split button: match Create split button styling */
    #btnGenerate {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      padding-right: 12px;
      position: relative;
    }

    /* Vertical Separator */
    #btnGenerate::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(113, 113, 122, 0.4);
      z-index: 1;
    }

    /* Chevron Button (Right) */
    #btnGenerateMenuToggle {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      padding-left: 8px;
      padding-right: 8px;
      width: 32px;
    }

    .menu-item {
      padding: 12px 16px;
      font-size: 14px;
      cursor: pointer;
      color: var(--text-primary);
      transition: background 0.2s;
      display: flex;
      align-items: flex-start;      /* Changed from center to flex-start */
      justify-content: space-between; /* Push shortcut to right */
      gap: 12px;                    /* Add gap between title/desc and shortcut */
      /* REMOVE: white-space: nowrap; */
    }

    .menu-item:hover {
      background: var(--bg-hover);
    }

    .menu-item span.desc {
      display: block; /* Subtitle below title */
      font-size: 11px;
      color: var(--text-secondary);
      margin-top: 4px; /* Space below title */
      white-space: normal;          /* Changed from nowrap to normal */
      line-height: 1.4;             /* Add line-height for readability */
    }

    .menu-shortcut {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--mono);
      margin-left: 12px;
      white-space: nowrap;          /* Keep shortcuts on single line */
      flex-shrink: 0;
      align-self: flex-start;       /* Align to top when desc wraps */
      margin-top: 2px;              /* Small offset to align with title */
    }

    .menu-shortcut .kbd {
      padding: 2px 6px;
      background: var(--kbd-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 10px;
      font-family: var(--mono);
      display: inline-block;
      vertical-align: baseline;
      margin-right: 3px;
    }

    .menu-shortcut .kbd:last-child {
      margin-right: 0;
    }

    .prompt-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .prompt-input {
      width: 100%;
      background: rgba(0,0,0,0.25);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 14px;
      font-family: var(--sans);
      font-size: 13px;
      color: var(--text-primary);
      resize: vertical;
      min-height: 120px;
      margin-bottom: 16px;
    }

    .prompt-input:focus {
      outline: none;
      border-color: var(--border-light);
    }

    .model-selector {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .model-selector .form-label {
      margin-bottom: 0;
      min-width: 50px;
    }

    .model-selector .form-input {
      flex: 1;
      margin-bottom: 0;
    }

    /* Style the select dropdown chevron */
    .model-selector .form-input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 12px;
      padding-right: 30px;
      background-color: rgba(0,0,0,0.25);
    }

    .prompt-actions {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Context Menu */
    .context-menu {
      position: fixed;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      min-width: 180px;
      z-index: 1000;
      display: none;
      overflow: hidden;
    }

    .context-menu.show {
      display: block;
    }

    .context-menu-item {
      padding: 10px 14px;
      font-size: 13px;
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.15s;
    }

    .context-menu-item:hover {
      background: var(--bg-hover);
    }

    .context-menu-item svg {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .context-menu-separator {
      height: 1px;
      background: var(--border);
      margin: 4px 0;
    }
  </style>
</head>
<body>

  <!-- Main Window -->
  <div class="window">

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="traffic-lights">
        <div class="traffic-light red"></div>
        <div class="traffic-light yellow"></div>
        <div class="traffic-light green"></div>
      </div>
      <div class="status-title">Omni — Pull Request</div>
      <div class="status-spacer"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">

      <!-- Left Sidebar -->
      <aside class="sidebar">

        <!-- Pull Request Overview -->
        <div class="sidebar-section">
          <div class="section-header">
            <span class="label">Pull request overview</span>
          </div>
          <div id="prOverview">
            <div class="pr-item active" data-pr-id="pr">
              <span class="pr-number">my-project/pr/#549</span>
              <span class="pr-status mergeable">Ready to merge</span>
            </div>
          </div>
        </div>

        <!-- Commits Overview -->
        <div class="sidebar-section">
          <div class="section-header">
            <span class="label">Commits overview</span>
            <span class="meta" id="commitCount">3 Commits</span>
          </div>
          <div id="commitList">
            <div class="commit-item" data-commit-id="0">
              <span class="commit-dot"></span>
              <span class="commit-msg">feat(ui): add branch picker</span>
            </div>
            <div class="commit-item" data-commit-id="1">
              <span class="commit-dot"></span>
              <span class="commit-msg">feat(ai): generate title/description</span>
            </div>
            <div class="commit-item" data-commit-id="2">
              <span class="commit-dot"></span>
              <span class="commit-msg">chore: polish copy & spacing</span>
            </div>
          </div>
        </div>

        <!-- File Overview -->
        <div class="sidebar-section">
          <div class="section-header">
            <span class="label">File overview</span>
            <span class="meta" id="fileCount">4 Files</span>
          </div>
          <div id="fileList">
            <div class="file-item" data-file-id="0">
              <span class="file-status M">M</span>
              <span class="file-path">src/ui/BranchPicker.tsx</span>
              <span class="file-changes"><span class="add">+50</span> <span class="rem">-10</span></span>
            </div>
            <div class="file-item" data-file-id="1">
              <span class="file-status A">A</span>
              <span class="file-path">src/ui/ReviewerPopover.tsx</span>
              <span class="file-changes"><span class="add">+68</span> <span class="rem">-0</span></span>
            </div>
            <div class="file-item" data-file-id="2">
              <span class="file-status M">M</span>
              <span class="file-path">src/ai/generatePr.ts</span>
              <span class="file-changes"><span class="add">+31</span> <span class="rem">-2</span></span>
            </div>
            <div class="file-item" data-file-id="3">
              <span class="file-status R">R</span>
              <span class="file-path">README.md</span>
              <span class="file-changes"><span class="add">+7</span> <span class="rem">-1</span></span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Details Panel -->
      <section class="details-panel">
        
        <!-- Top Bar - Moved inside Details Panel -->
        <div class="top-bar" id="topBar">
          <div class="dropdown-container">
            <button class="btn" id="btnSource">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="6" y1="3" x2="6" y2="15"></line>
                <circle cx="18" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M18 9a9 9 0 0 1-9 9"></path>
              </svg>
              <span id="sourceBranchText">Source: develop</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="dropdown" id="sourceDropdown">
              <div class="dropdown-header">
                <span>Select source branch</span>
                <span class="branch-count" id="sourceBranchCount">0</span>
              </div>
              <div class="dropdown-search">
                <input type="text" placeholder="Filter branches..." id="sourceFilter">
                <button class="clear-btn" id="sourceClearBtn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="dropdown-list" id="sourceList"></div>
            </div>
          </div>

          <div class="dropdown-container">
            <button class="btn" id="btnDest">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M6 21V9a9 9 0 0 0 9 9"></path>
              </svg>
              <span id="destBranchText">Target: main</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="dropdown" id="destDropdown">
              <div class="dropdown-header">
                <span>Select target branch</span>
                <span class="branch-count" id="destBranchCount">0</span>
              </div>
              <div class="dropdown-search">
                <input type="text" placeholder="Filter branches..." id="destFilter">
                <button class="clear-btn" id="destClearBtn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="dropdown-list" id="destList"></div>
            </div>
          </div>

          <div class="dropdown-container">
            <button class="btn" id="btnReviewers">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Pick reviewers</span>
              <span id="reviewerBadge" style="background:var(--border);padding:2px 8px;border-radius:999px;font-size:11px;margin-left:4px;display:none;">0</span>
              <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="dropdown" id="reviewerDropdown" style="min-width:300px;">
              <div class="dropdown-header">Select reviewers</div>
              <div class="dropdown-list" id="reviewerList" style="padding:8px;"></div>
            </div>
          </div>

          <div class="split-btn-container" id="generateSplitContainer">
            <!-- Main Action -->
            <button class="btn btn-primary" id="btnGenerate">
              <span id="generateButtonText">Generate pull request</span>
            </button>

            <!-- Chevron / Menu Toggle -->
            <button class="btn btn-primary" id="btnGenerateMenuToggle" aria-label="Generate pull request options">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <!-- Popover Menu (opens downward from top bar) -->
            <div class="popover-menu popover-down" id="generateMenuPopover">
              <div class="menu-item" id="optGenerateDefault">
                <div>
                  Generate pull request
                  <span class="desc">Generate pull requests based on the current file changes</span>
                </div>
                <span class="menu-shortcut">
                  <span class="kbd">⌘</span><span class="kbd">G</span>
                </span>
              </div>

              <div class="menu-item" id="optGenerateWithOptions">
                <div>
                  Generate pull request w/ options
                  <span class="desc">Generate pull requests based on the current commits and user prompt</span>
                </div>
                <span class="menu-shortcut">
                  <span class="kbd">⇧</span><span class="kbd">⌘</span><span class="kbd">G</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="details-content-area">
        
          <!-- PR Details View (Default) -->
          <div class="detail-view active" id="prDetailsView">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="prTitle" placeholder="(Generate to fill) e.g., Improve PR creation UX">
            </div>

            <div class="form-group flex-grow">
              <label class="form-label">Description</label>
              <textarea class="form-input" id="prDescription" placeholder="(Generate to fill) e.g., Summary, testing notes, screenshots..."></textarea>
            </div>
          </div>

          <!-- Commit Detail View -->
          <div class="detail-view" id="commitDetailView">
            <div class="detail-view-header">
              <!-- Modified Header Row -->
              <div class="detail-header-row">
                <div id="commitDetailTitle">feat(ui): add branch picker</div>
                <div class="detail-header-buttons">
                  <button class="detail-header-btn" id="showOnGitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Show on GitHub
                  </button>
                  <button class="detail-header-btn" id="copySHA">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy SHA to clipboard
                  </button>
                </div>
              </div>
              <!-- New Subtitle Row -->
              <div class="detail-header-subtitle" id="commitDetailSubtitle">SHA: abc123f • 20240105123045 • john.doe</div>
            </div>

            <div class="detail-content">
              <div class="detail-text" id="commitDetailDescription">...</div>
            </div>

            <div class="detail-files">
              <!-- Modified Files Header -->
              <div class="detail-files-header">
                <span>Files in commit</span>
                <span class="detail-files-stats" id="commitFileStats">
                  <!-- Stats will be injected here via JS -->
                </span>
              </div>
              <div class="detail-files-grid" id="commitDetailFiles">
                <!-- File items will be populated here -->
              </div>
            </div>
          </div>

          <!-- File Detail View -->
          <div class="detail-view" id="fileDetailView">
            <div class="detail-view-header">
              <!-- Header Row with Title and Buttons -->
              <div class="detail-header-row">
                <div id="fileDetailName">src/ui/BranchPicker.tsx</div>
                <div class="detail-header-buttons">
                  <button class="detail-header-btn" id="showInFileBrowser">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Show in file-browser
                  </button>
                  <button class="detail-header-btn" id="openInIDE">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Open in IDE
                  </button>
                  <button class="detail-header-btn" id="showFileOnGitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Show on GitHub
                  </button>
                </div>
              </div>

              <!-- Subtitle Group -->
              <div class="detail-header-subtitle-group" id="fileDetailSubtitles">
                <div class="detail-header-subtitle-row">dist/app-bundle.zip • 2026-12-24 16:45:12 • 2.0mb</div>
                <div class="detail-header-subtitle-row">SHA: 19dce5f0d2d04f31c4c27f72cb57fdbb1dc63637</div>
              </div>
            </div>

            <div class="detail-content">
              <div class="detail-text" id="fileDetailContent"></div>
            </div>
          </div>

        </div>
      </section>
    </div>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
      <div class="bottom-bar-left">
        <div class="shortcuts-bar">
          <span>Keyboard</span>
          <span class="shortcut">
            <span class="kbd">␛</span> Cancel
          </span>
          <span class="shortcut">
            <span class="kbd">⏎</span> Create PR
          </span>
          <span class="shortcut">
            <span class="kbd">⇧</span>
            <span class="kbd">⏎</span>
            Create PR + Merge
          </span>
        </div>
      </div>
      <div class="bottom-bar-right">
        <button class="btn btn-ghost" id="btnCancel">Cancel</button>
        <div class="split-btn-container">
          <!-- Main Action -->
          <button class="btn btn-primary" id="btnCreate" disabled>
            Create Pull Request
          </button>

          <!-- Chevron / Menu Toggle -->
          <button class="btn btn-primary" id="btnCreateMenuToggle" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- Popover Menu -->
          <div class="popover-menu" id="createMenuPopover">
            <div class="menu-item" id="optCreate">
              <div>
                Create pull-request
                <span class="desc">Create the PR and leave it open</span>
              </div>
              <span class="menu-shortcut"><span class="kbd">↵</span></span>
            </div>
            <div class="menu-item" id="optCreateMerge">
              <div>
                Create pull-request and merge
                <span class="desc">Create and immediately merge</span>
              </div>
              <span class="menu-shortcut"><span class="kbd">⇧</span><span class="kbd">↵</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Generate Progress Overlay -->
  <div class="overlay" id="generateOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span>Generating Pull Request</span>
        <span class="overlay-header-counter" id="genCounter">0/4</span>
      </div>
      <div class="overlay-body">
        <div class="progress-steps" id="generateSteps">
          <div class="step" data-step="0">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Analyzing branch diff</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="1">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Summarizing commit descriptions</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="2">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Generating PR body</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="3">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Finalizing PR proposal</span>
            </div>
            <span class="step-status">queue</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Create PR Progress Overlay -->
  <div class="overlay" id="createOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span>Creating Pull Request</span>
        <span class="overlay-header-counter" id="createCounter">0/4</span>
      </div>
      <div class="overlay-body">
        <div class="progress-steps" id="createSteps">
          <div class="step" data-step="0">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Preparing pull request</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="1">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Pushing to GitHub</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="2">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Configuring PR metadata</span>
            </div>
            <span class="step-status">queue</span>
          </div>
          <div class="step" data-step="3">
            <div class="step-left">
              <div class="step-indicator"></div>
              <span class="step-text">Pull request created!</span>
            </div>
            <span class="step-status">queue</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Prompt Popup Overlay -->
  <div class="overlay" id="promptOverlay">
    <div class="overlay-content">
      <div class="overlay-header">
        <span>Generate pull requests with options</span>
      </div>
      <div class="overlay-body">
      <div class="prompt-subtitle">Provide additional context to generate more accurate pull request messages</div>
      <textarea class="prompt-input" id="promptInput" placeholder="Example: Focus on key changes, breaking changes (if any), and testing steps." rows="6"></textarea>
        <div class="model-selector">
          <label class="form-label">Model</label>
          <select class="form-input" id="modelSelect">
            <option value="gpt-4" selected>GPT-4 (Default)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
          </select>
        </div>
      </div>
      <div class="prompt-actions">
        <button class="btn btn-ghost" id="btnPromptCancel">Cancel</button>
        <button class="btn btn-primary" id="btnPromptGenerate">Generate</button>
      </div>
    </div>
  </div>

<!-- Context Menu for Commits -->
<div class="context-menu" id="commitContextMenu">
  <div class="context-menu-item" id="ctxCopySha">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    Copy SHA
  </div>
  <div class="context-menu-item" id="ctxViewOnGitHub">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
    View on GitHub
  </div>
</div>

<!-- Context Menu for Files -->
<div class="context-menu" id="fileContextMenu">
  <div class="context-menu-item" id="ctxRevealInFileBrowser">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
    Reveal in file-browser
  </div>
  <div class="context-menu-item" id="ctxFileViewOnGitHub">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
    View on GitHub
  </div>
  <div class="context-menu-item" id="ctxOpenWithDefault">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
    Open with default program
  </div>
  <div class="context-menu-separator"></div>
  <div class="context-menu-item" id="ctxCopyFilePath">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    Copy file path
  </div>
</div>

  <script>
    // Data
    const branches = [
      'main',
      'develop',
      'release/1.8.0',
      'feature/pr-window-ui',
      'release/hot-fix',
      'hotfix/critical-null-check',
      'chore/refactor-api-client'
    ];

    const reviewers = [
      { 
        id: 'sarah', 
        name: 'Sarah Chen', 
        handle: '@sara99', 
        email: 'sarah.chen@company.com'
      },
      { 
        id: 'noah', 
        name: 'Noah Eriksen', 
        handle: '@noah_e', 
        email: 'noah.eriksen@company.com'
      },
      { 
        id: 'mia', 
        name: 'Mia Solheim', 
        handle: '@miaS', 
        email: 'mia.solheim@company.com'
      },
      { 
        id: 'liam', 
        name: 'Liam Jensen', 
        handle: '@liamj', 
        email: 'liam.jensen@company.com'
      },
      { 
        id: 'zoe', 
        name: 'Zoë Larsen', 
        handle: '@zoe_l', 
        email: 'zoe.larsen@company.com'
      }
    ];

    const commits = [
      {
        id: 0,
        title: 'feat(ui): add branch picker',
        sha: "abc123f456e789d012345678901234567890abcd", // Add this
        date: "20240105123045", // Add this
        author: "john.doe", // Add this
        description: \`Added interactive branch picker component with dropdown functionality.

Features:
- Search/filter branches
- Real-time branch selection
- Visual feedback for selected branches
- Keyboard navigation support\`,
        files: [
          { path: 'src/ui/BranchPicker.tsx', status: 'A', add: 120, rem: 0 },
          { path: 'src/ui/index.ts', status: 'M', add: 1, rem: 0 }
        ]
      },
      {
        id: 1,
        title: 'feat(ai): generate title/description',
        sha: "def456g789h012i345678901234567890123bcde", // Add this
        date: "20240105123115", // Add this
        author: "jane.smith", // Add this
        description: \`Implemented AI-powered PR title and description generation.

Uses GPT-4 to analyze:
- Commit messages
- File changes
- Code diffs

Generates contextual PR descriptions automatically.\`,
        files: [
          { path: 'src/ai/generatePr.ts', status: 'A', add: 85, rem: 0 },
          { path: 'src/api/openai.ts', status: 'M', add: 12, rem: 3 }
        ]
      },
      {
        id: 2,
        title: 'chore: polish copy & spacing',
        sha: "ghi789j012k345l6789012345678901234567fgh", // Add this
        date: "20240105123200", // Add this
        author: "bob.wilson", // Add this
        description: \`Minor UI polish updates:
- Adjusted spacing in sidebar sections
- Updated placeholder text
- Fixed typos in labels\`,
        files: [
          { path: 'src/ui/Sidebar.tsx', status: 'M', add: 8, rem: 5 },
          { path: 'README.md', status: 'M', add: 7, rem: 1 }
        ]
      }
    ];

    const files = [
      {
        id: 0,
        path: 'src/ui/BranchPicker.tsx',
        status: 'M',
        add: 50,
        rem: 10,
        // Add these fields:
        size: '12kb',
        date: '2026-12-24 16:45:12',
        sha: '19dce5f0d2d04f31c4c27f72cb57fdbb1dc63637',
        content: \`import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface BranchPickerProps {
  branches: string[];
  selected?: string;
  onChange: (branch: string) => void;
}

export const BranchPicker: React.FC<BranchPickerProps> = ({
  branches,
  selected,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filtered = branches.filter(b =>
    b.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="branch-picker">
      <button onClick={() => setIsOpen(!isOpen)}>
        {selected || 'Select branch'}
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter branches..."
          />
          {filtered.map(branch => (
            <div
              key={branch}
              onClick={() => {
                onChange(branch);
                setIsOpen(false);
              }}
            >
              {branch}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};\`
      },
      {
        id: 1,
        path: 'src/ui/ReviewerPopover.tsx',
        status: 'A',
        add: 68,
        rem: 0,
        // Add these fields:
        size: '15kb',
        date: '2026-12-24 16:42:33',
        sha: 'a8f9e1c2b3d04e5f6g7h8i9j0k1l2m3n4o5p6q',
        content: \`import React from 'react';

interface Reviewer {
  id: string;
  name: string;
  email: string;
}

interface ReviewerPopoverProps {
  reviewers: Reviewer[];
  selected: Set<string>;
  onChange: (selected: Set<string>) => void;
}

export const ReviewerPopover: React.FC<ReviewerPopoverProps> = ({
  reviewers,
  selected,
  onChange
}) => {
  const toggleReviewer = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    onChange(newSelected);
  };

  return (
    <div className="reviewer-popover">
      {reviewers.map(reviewer => (
        <label key={reviewer.id}>
          <input
            type="checkbox"
            checked={selected.has(reviewer.id)}
            onChange={() => toggleReviewer(reviewer.id)}
          />
          <span>{reviewer.name}</span>
          <span>{reviewer.email}</span>
        </label>
      ))}
    </div>
  );
};\`
      },
      {
        id: 2,
        path: 'src/ai/generatePr.ts',
        status: 'M',
        add: 31,
        rem: 2,
        // Add these fields:
        size: '8kb',
        date: '2026-12-24 16:38:45',
        sha: 'b7c8d9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5',
        content: \`import OpenAI from 'openai';

interface GeneratePROptions {
  commits: string[];
  files: string[];
  sourceBranch: string;
  targetBranch: string;
}

export async function generatePR(options: GeneratePROptions) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = buildPrompt(options);

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that generates PR descriptions.' },
      { role: 'user', content: prompt }
    ]
  });

  return response.choices[0].message.content;
}

function buildPrompt(options: GeneratePROptions): string {
  return \\\`Generate a PR title and description for:
- Source: \\\${options.sourceBranch}
- Target: \\\${options.targetBranch}
- Commits: \\\${options.commits.join(', ')}
- Files: \\\${options.files.join(', ')}\\\`;
}\`
      },
      {
        id: 3,
        path: 'README.md',
        status: 'R',
        add: 7,
        rem: 1,
        // Add these fields:
        size: '3kb',
        date: '2026-12-24 16:35:22',
        sha: 'c6d7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4',
        content: \`# Omni PR Tool

An intelligent pull request creation tool with AI-powered descriptions.

## Features

- 🔀 Branch picker with search
- 👥 Reviewer selection
- 🤖 AI-generated PR descriptions
- 📊 Commit and file overview
- ✨ Beautiful dark UI

## Usage

1. Select source and target branches
2. Pick reviewers
3. Click "Generate pull request"
4. Review and create

## Tech Stack

- React
- TypeScript
- OpenAI GPT-4
- Tailwind CSS\`
      }
    ];

    // Sub-steps for each main step
    const genSubSteps = [
      ['Reading branch metadata...', 'Computing file differences...', 'Parsing commit history...', 'Analyzing code changes...'],
      ['Loading commit messages...', 'Extracting key changes...', 'Identifying patterns...', 'Generating summary...'],
      ['Formatting description...', 'Adding testing notes...', 'Including code snippets...', 'Finalizing markdown...'],
      ['Validating PR metadata...', 'Checking branch permissions...', 'Preparing final payload...', 'Ready to create...']
    ];

    const createSubSteps = [
      ['Collecting PR metadata...', 'Validating inputs...', 'Building request body...', 'Verifying permissions...', 'Payload ready...'],
      ['Connecting to GitHub API...', 'Authenticating request...', 'Enumerating objects...', 'Compressing objects...', 'Writing objects: 100%...', 'Submitting PR data...', 'PR created on GitHub...'],
      ['Fetching reviewer IDs...', 'Assigning reviewers...', 'Reviewers notified...', 'Updating PR metadata...', 'Running final checks...', 'Syncing status...'],
      ['PR created successfully!', 'All checks passed', 'Ready for review', 'Done']
    ];

    // State
    let sourceBranch = 'develop';
    let destBranch = 'main';
    const selectedReviewers = new Set();
    let currentView = 'pr';
    let currentCommitId = 0; // Track current commit for button handlers

    // Elements
    const topBar = document.getElementById('topBar');
    const btnSource = document.getElementById('btnSource');
    const btnDest = document.getElementById('btnDest');
    const btnReviewers = document.getElementById('btnReviewers');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnCreate = document.getElementById('btnCreate');
    const btnCancel = document.getElementById('btnCancel');
    const generateButtonText = document.getElementById('generateButtonText');
    const sourceDropdown = document.getElementById('sourceDropdown');
    const destDropdown = document.getElementById('destDropdown');
    const reviewerDropdown = document.getElementById('reviewerDropdown');
    const sourceList = document.getElementById('sourceList');
    const destList = document.getElementById('destList');
    const reviewerList = document.getElementById('reviewerList');
    const sourceFilter = document.getElementById('sourceFilter');
    const destFilter = document.getElementById('destFilter');
    const sourceClearBtn = document.getElementById('sourceClearBtn');
    const destClearBtn = document.getElementById('destClearBtn');
    const sourceBranchCount = document.getElementById('sourceBranchCount');
    const destBranchCount = document.getElementById('destBranchCount');
    const prTitle = document.getElementById('prTitle');
    const prDescription = document.getElementById('prDescription');
    const generateOverlay = document.getElementById('generateOverlay');
    const createOverlay = document.getElementById('createOverlay');
    const reviewerBadge = document.getElementById('reviewerBadge');
    const genCounter = document.getElementById('genCounter');
    const createCounter = document.getElementById('createCounter');

    // Generate split button elements
    const generateSplitContainer = document.getElementById('generateSplitContainer');
    const btnGenerateMenuToggle = document.getElementById('btnGenerateMenuToggle');
    const generateMenuPopover = document.getElementById('generateMenuPopover');
    const optGenerateDefault = document.getElementById('optGenerateDefault');
    const optGenerateWithOptions = document.getElementById('optGenerateWithOptions');

    // Prompt popup elements
    const promptOverlay = document.getElementById('promptOverlay');
    const promptInput = document.getElementById('promptInput');
    const modelSelect = document.getElementById('modelSelect');
    const btnPromptCancel = document.getElementById('btnPromptCancel');
    const btnPromptGenerate = document.getElementById('btnPromptGenerate');

    // Detail view elements
    const prDetailsView = document.getElementById('prDetailsView');
    const commitDetailView = document.getElementById('commitDetailView');
    const fileDetailView = document.getElementById('fileDetailView');

    // Helpers
    function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function closeAllDropdowns() {
      sourceDropdown.classList.remove('show');
      destDropdown.classList.remove('show');
      reviewerDropdown.classList.remove('show');
    }

    function updateGenerateBtn() {
      // Always keep the button enabled visually - no disabled state
      // The button is always clickable, but will show appropriate feedback if branches aren't selected
    }

    function updateCreateBtn() {
      const hasTitle = prTitle.value.trim().length > 0;
      const hasDesc = prDescription.value.trim().length > 0;
      const canCreate = sourceBranch && destBranch && hasTitle && hasDesc;
      // Toggle the container class instead of individual buttons for visual state
      // Use the specific Create button container
      const container = document.querySelector('.bottom-bar .split-btn-container');
      if (canCreate) {
        container.classList.remove('disabled');
        btnCreate.disabled = false;
        btnCreateMenuToggle.disabled = false;
      } else {
        container.classList.add('disabled');
        btnCreate.disabled = true;
        btnCreateMenuToggle.disabled = true;
      }
    }

    function switchView(viewName) {
      currentView = viewName;
      
      prDetailsView.classList.remove('active');
      commitDetailView.classList.remove('active');
      fileDetailView.classList.remove('active');
      
      // Show/hide top bar based on view
      if (viewName === 'pr') {
        prDetailsView.classList.add('active');
        generateButtonText.textContent = 'Generate pull request';
        topBar.classList.remove('hidden');
      } else if (viewName === 'commit') {
        commitDetailView.classList.add('active');
        generateButtonText.textContent = 'Show pull request preview';
        topBar.classList.add('hidden');
      } else if (viewName === 'file') {
        fileDetailView.classList.add('active');
        generateButtonText.textContent = 'Show pull request preview';
        topBar.classList.add('hidden');
      }

      document.querySelectorAll('.pr-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.commit-item').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
      
      if (viewName === 'pr') {
        document.querySelector('.pr-item[data-pr-id="pr"]').classList.add('active');
      }
    }

    // Updated showCommitDetail function
    function showCommitDetail(commitId) {
      const commit = commits[commitId];
      currentCommitId = commitId; // Track current commit for button handlers

      // Set title and description
      document.getElementById('commitDetailTitle').textContent = commit.title;
      document.getElementById('commitDetailDescription').textContent = commit.description;

      // NEW: Update subtitle and stats
      updateCommitSubtitle(commit);
      updateFileStats(commit.files);

      // Render files
      const filesHtml = commit.files.map(f => \`
        <div class="file-item">
          <span class="file-status \${f.status}">\${f.status}</span>
          <span class="file-path">\${esc(f.path)}</span>
          <span class="file-changes"><span class="add">+\${f.add}</span> <span class="rem">-\${f.rem}</span></span>
        </div>
      \`).join('');

      const filesContainer = document.getElementById('commitDetailFiles');
      filesContainer.innerHTML = filesHtml;

      switchView('commit');
      document.querySelector(\`[data-commit-id="\${commitId}"]\`).classList.add('active');
    }

    function showFileDetail(fileId) {
      const file = files[fileId];

      // Set Title (just filename, not full path)
      const fileName = file.path.split('/').pop();
      document.getElementById('fileDetailName').textContent = fileName;

      // Update Subtitles
      const subtitleContainer = document.getElementById('fileDetailSubtitles');
      if (subtitleContainer) {
        // Use real values from data or fallbacks
        const dateStr = file.date || '2026-12-24 16:45:12';
        const sizeStr = file.size || '2.0mb';

        subtitleContainer.innerHTML = \`
          <div class="detail-header-subtitle-row">\${file.path} • \${dateStr} • \${sizeStr}</div>
        \`;
      }

      // Render content
      const contentEl = document.getElementById('fileDetailContent');
      // ... (keep existing content rendering logic)
      contentEl.textContent = file.content; // Simple text rendering example

      switchView('file');
      document.querySelector(\`[data-file-id="\${fileId}"]\`).classList.add('active');
    }

    function renderBranchList(container, filter, onSelect, exclude, countElement, clearBtn) {
      const query = filter.value.toLowerCase();
      const filtered = branches.filter(b => 
        b.toLowerCase().includes(query) && b !== exclude
      );
      
      countElement.textContent = \`\${filtered.length} branches\`;
      
      if (filter.value.trim().length > 0) {
        clearBtn.classList.add('show');
      } else {
        clearBtn.classList.remove('show');
      }

      container.innerHTML = filtered.map(b => \`
        <div class="dropdown-item" data-branch="\${esc(b)}">
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg class="branch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
            \${esc(b)}
          </div>
          \${b === (container.id === 'sourceList' ? sourceBranch : destBranch) ? '<span class="branch-current-indicator">current</span>' : ''}
        </div>
      \`).join('');

      container.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          onSelect(item.dataset.branch);
          closeAllDropdowns();
        });
      });
    }

    function renderReviewerList() {
      reviewerList.innerHTML = reviewers.map(r => \`
        <label class="reviewer-row">
          <input type="checkbox" class="reviewer-checkbox" data-id="\${r.id}" \${selectedReviewers.has(r.id) ? 'checked' : ''}>
          <div class="reviewer-info">
            <div class="name">\${esc(r.name)}</div>
            <div class="handle">\${esc(r.handle)}</div>
          </div>
        </label>
      \`).join('');

      reviewerList.querySelectorAll('.reviewer-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          if (e.target.checked) {
            selectedReviewers.add(e.target.dataset.id);
          } else {
            selectedReviewers.delete(e.target.dataset.id);
          }
          updateReviewerBadge();
        });
      });
    }

    function updateReviewerBadge() {
      const count = selectedReviewers.size;
      reviewerBadge.textContent = count;
      reviewerBadge.style.display = count > 0 ? 'inline' : 'none';
    }

    // New helper to update subtitle
    function updateCommitSubtitle(commit) {
      const subtitle = document.getElementById('commitDetailSubtitle');
      if (!subtitle || !commit) return;

      const shortSha = commit.sha ? commit.sha.substring(0, 7) : 'unknown';
      const formattedDate = formatCommitDate(commit.date || '20240105123045');
      const author = commit.author || 'unknown';

      subtitle.innerHTML = \`
        <span class="commit-sha-inline">
          <span>SHA</span>
          <span>\${shortSha}</span>
          <button
            type="button"
            class="sha-copy-btn js-copy-commit-sha"
            aria-label="Copy full SHA"
            title="Copy full SHA"
            data-sha="\${esc(commit.sha || '')}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </span>
        <span> • \${formattedDate} • \${esc(author)}</span>
      \`;
    }

    // Helper to format commit date from YYYYMMDDHHMMSS to readable format
    function formatCommitDate(dateStr) {
      // Parse YYYYMMDDHHMMSS format
      const year = dateStr.substring(0, 4);
      const month = parseInt(dateStr.substring(4, 6)) - 1; // JS months are 0-based
      const day = dateStr.substring(6, 8);
      const hour = parseInt(dateStr.substring(8, 10));
      const minute = dateStr.substring(10, 12);

      const date = new Date(year, month, day, hour, minute);

      // Format as "Jan 5, 2024 at 12:30 PM"
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };

      return date.toLocaleDateString('en-US', options).replace(',', '');
    }

    // New helper to update file stats
    function updateFileStats(files) {
      const statsElement = document.getElementById('commitFileStats');
      if (statsElement && files) {
        const fileCount = files.length;
        const totalAdditions = files.reduce((sum, f) => sum + (f.add || 0), 0);
        const totalDeletions = files.reduce((sum, f) => sum + (f.rem || 0), 0);

        statsElement.innerHTML = \`
          <span>\${fileCount} file\${fileCount !== 1 ? 's' : ''}</span>
          <span class="add">\${totalAdditions} insertion\${totalAdditions !== 1 ? 's' : ''}</span>
          <span class="rem">\${totalDeletions} deletion\${totalDeletions !== 1 ? 's' : ''}</span>
        \`;
      }
    }

    // Event Listeners
    btnSource.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sourceDropdown.classList.contains('show');
      closeAllDropdowns();
      if (!isOpen) {
        sourceDropdown.classList.add('show');
        renderBranchList(sourceList, sourceFilter, (b) => {
          sourceBranch = b;
          document.getElementById('sourceBranchText').textContent = \`Source: \${b}\`;
          updateGenerateBtn();
        }, destBranch, sourceBranchCount, sourceClearBtn);
        sourceFilter.focus();
      }
    });

    btnDest.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = destDropdown.classList.contains('show');
      closeAllDropdowns();
      if (!isOpen) {
        destDropdown.classList.add('show');
        renderBranchList(destList, destFilter, (b) => {
          destBranch = b;
          document.getElementById('destBranchText').textContent = \`Target: \${b}\`;
          updateGenerateBtn();
        }, sourceBranch, destBranchCount, destClearBtn);
        destFilter.focus();
      }
    });

    btnReviewers.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = reviewerDropdown.classList.contains('show');
      closeAllDropdowns();
      if (!isOpen) {
        reviewerDropdown.classList.add('show');
        renderReviewerList();
      }
    });

    sourceFilter.addEventListener('input', () => {
      renderBranchList(sourceList, sourceFilter, (b) => {
        sourceBranch = b;
        document.getElementById('sourceBranchText').textContent = \`Source: \${b}\`;
        updateGenerateBtn();
      }, destBranch, sourceBranchCount, sourceClearBtn);
    });

    destFilter.addEventListener('input', () => {
      renderBranchList(destList, destFilter, (b) => {
        destBranch = b;
        document.getElementById('destBranchText').textContent = \`Target: \${b}\`;
        updateGenerateBtn();
      }, sourceBranch, destBranchCount, destClearBtn);
    });

    sourceClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sourceFilter.value = '';
      renderBranchList(sourceList, sourceFilter, (b) => {
        sourceBranch = b;
        document.getElementById('sourceBranchText').textContent = \`Source: \${b}\`;
        updateGenerateBtn();
      }, destBranch, sourceBranchCount, sourceClearBtn);
      sourceFilter.focus();
    });

    destClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      destFilter.value = '';
      renderBranchList(destList, destFilter, (b) => {
        destBranch = b;
        document.getElementById('destBranchText').textContent = \`Target: \${b}\`;
        updateGenerateBtn();
      }, sourceBranch, destBranchCount, destClearBtn);
      destFilter.focus();
    });

    document.addEventListener('click', closeAllDropdowns);

    [sourceDropdown, destDropdown, reviewerDropdown].forEach(el => {
      el.addEventListener('click', (e) => e.stopPropagation());
    });

    prTitle.addEventListener('input', updateCreateBtn);
    prDescription.addEventListener('input', updateCreateBtn);

    // PR item click handler
    document.querySelector('.pr-item[data-pr-id="pr"]').addEventListener('click', () => {
      switchView('pr');
    });

    document.querySelectorAll('.commit-item').forEach(item => {
      item.addEventListener('click', () => {
        showCommitDetail(parseInt(item.dataset.commitId));
      });
    });

    document.querySelectorAll('.file-item').forEach(item => {
      if (item.dataset.fileId) {
        item.addEventListener('click', () => {
          showFileDetail(parseInt(item.dataset.fileId));
        });
      }
    });

    btnGenerate.addEventListener('click', () => {
      if (currentView === 'pr') {
        runGenerateSteps();
      } else {
        switchView('pr');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (currentView !== 'pr') {
          switchView('pr');
        } else {
          btnCancel.click();
        }
      } else if (e.key === 'Enter') {
        // Ignore if menu is open and we are navigating (optional, but good practice)

        if (!btnCreate.disabled) {
          if (e.shiftKey) {
            e.preventDefault();
            // Shift + Enter: Create & Merge
            addMergeStep();
            btnCreate.click();
          } else {
            // Normal Enter is usually handled by form submission or existing logic.
            // If you strictly want Enter to ONLY create when not in a text area, check e.target.
            // However, usually Cmd+Enter or Ctrl+Enter is used for form submission.
            // Assuming "Enter" on the button itself or global Enter was the requested behavior.

            // Ensure we don't double-trigger if the user is focused on the button itself
            if (document.activeElement !== btnCreate) {
               // existing enter logic usually handled by form submit or separate listener?
               // The UI shows "Enter Create", so we might need to enforce it:
               // btnCreate.click();
            }
          }
        }
      }

      const isCmdG = e.metaKey && (e.key || '').toLowerCase() === 'g';
      if (isCmdG) {
        if (!btnGenerate.disabled) {
          e.preventDefault();
          if (e.shiftKey) triggerGenerateWithOptions();
          else triggerGenerateDefault();
        }
        return;
      }
    });

    async function runGenerateSteps(mode = 'default', userPrompt = '', selectedModel = 'gpt-4') {
      generateOverlay.classList.add('show');
      const steps = generateOverlay.querySelectorAll('.step');
      const totalSteps = steps.length;

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const subSteps = genSubSteps[i];
        const statusEl = step.querySelector('.step-status');

        genCounter.textContent = \`\${i}/\${totalSteps}\`;

        step.classList.add('active');
        step.querySelector('.step-indicator').innerHTML = '<div class="step-spinner"></div>';

        for (let j = 0; j < subSteps.length; j++) {
          statusEl.textContent = subSteps[j];
          await new Promise(r => setTimeout(r, 100 + Math.random() * 300));
        }

        step.classList.remove('active');
        step.classList.add('done');
        statusEl.textContent = 'done';
        step.querySelector('.step-indicator').innerHTML = '✓';

        genCounter.textContent = \`\${i + 1}/\${totalSteps}\`;
      }

      await new Promise(r => setTimeout(r, 100));
      generateOverlay.classList.remove('show');

      steps.forEach(s => {
        s.classList.remove('active', 'done');
        s.querySelector('.step-status').textContent = 'queue';
        s.querySelector('.step-indicator').innerHTML = '';
      });
      genCounter.textContent = '0/4';

      prTitle.value = \`Merge \${sourceBranch} into \${destBranch}\`;
      prDescription.value =
        \`## Summary\\n- Adds an interactive PR window layout (status bar, top bar, content, bottom bar)\\n- Includes branch pickers, reviewer popover, AI-generation loader\\n\\n## Testing\\n- Open the HTML file in a browser\\n- Select target & destination, click Generate, pick reviewers, then Create\`;

      if (mode === 'options') {
        prDescription.value += \`\\n\\nOptions prompt\\n- \${userPrompt.trim() ? userPrompt.trim() : '(none)'}\\nmodel: \${selectedModel}\`;
      }

      updateCreateBtn();
    }

    btnCreate.addEventListener('click', async () => {
      createOverlay.classList.add('show');
      const steps = createOverlay.querySelectorAll('.step');
      const totalSteps = steps.length;
      
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const subSteps = createSubSteps[i];
        const statusEl = step.querySelector('.step-status');
        
        createCounter.textContent = \`\${i}/\${totalSteps}\`;
        
        step.classList.add('active');
        step.querySelector('.step-indicator').innerHTML = '<div class="step-spinner"></div>';
        
        for (let j = 0; j < subSteps.length; j++) {
          statusEl.textContent = subSteps[j];
          await new Promise(r => setTimeout(r, 75 + Math.random() * 250));
        }
        
        step.classList.remove('active');
        step.classList.add('done');
        statusEl.textContent = 'done';
        step.querySelector('.step-indicator').innerHTML = '✓';
        
        createCounter.textContent = \`\${i + 1}/\${totalSteps}\`;
      }

      await new Promise(r => setTimeout(r, 125));
      createOverlay.classList.remove('show');
      
      steps.forEach(s => {
        s.classList.remove('active', 'done');
        s.querySelector('.step-status').textContent = 'queue';
        s.querySelector('.step-indicator').innerHTML = '';
      });
      createCounter.textContent = '0/4';
    });

    btnCancel.addEventListener('click', () => {
      sourceBranch = 'develop';
      destBranch = 'main';
      selectedReviewers.clear();
      document.getElementById('sourceBranchText').textContent = 'Source: develop';
      document.getElementById('destBranchText').textContent = 'Target: main';
      prTitle.value = '';
      prDescription.value = '';
      updateGenerateBtn();
      updateCreateBtn();
      updateReviewerBadge();
      switchView('pr');
    });

    // Button handlers
    const showOnGitHubBtn = document.getElementById('showOnGitHub');
    const copySHABtn = document.getElementById('copySHA');

    if (showOnGitHubBtn) {
      showOnGitHubBtn.addEventListener('click', () => {
        // Get current commit - assuming currentCommitId is tracked in your app
        // If not, you might need to track it in showCommitDetail
        const commitData = commits[currentCommitId || 0];
        if (commitData && commitData.sha) {
           // Replace with your actual repo URL logic
          window.open(\`https://github.com/owner/repo/commit/\${commitData.sha}\`, '_blank');
        }
      });
    }

    if (copySHABtn) {
      copySHABtn.addEventListener('click', async () => {
        const commitData = commits[currentCommitId || 0];
        if (commitData && commitData.sha) {
          try {
            await navigator.clipboard.writeText(commitData.sha);
            // Visual feedback
            const originalHtml = copySHABtn.innerHTML;
            copySHABtn.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!\`;
            setTimeout(() => {
              copySHABtn.innerHTML = originalHtml;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy', err);
          }
        }
      });
    }

    // File detail view button handlers
    ['showInFileBrowser', 'openInIDE', 'showFileOnGitHub'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          // Add your action logic here
          console.log(\`Action: \${id} for file \${files[0].path}\`); // Example

          // Visual feedback
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>Done!</span>';
          setTimeout(() => btn.innerHTML = originalText, 1000);
        });
      }
    });

    /* --- New Split Button & Menu Logic --- */
    const btnCreateMenuToggle = document.getElementById('btnCreateMenuToggle');
    const createMenuPopover = document.getElementById('createMenuPopover');
    const optCreate = document.getElementById('optCreate');
    const optCreateMerge = document.getElementById('optCreateMerge');
    const generateSteps = document.getElementById('generateSteps');

    // Toggle Menu
    btnCreateMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      createMenuPopover.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      // Close Create menu
      if (btnCreateMenuToggle && createMenuPopover) {
        if (!btnCreateMenuToggle.contains(e.target) && !createMenuPopover.contains(e.target)) {
          createMenuPopover.classList.remove('show');
        }
      }

      // Close Generate menu
      if (btnGenerateMenuToggle && generateMenuPopover) {
        if (!btnGenerateMenuToggle.contains(e.target) && !generateMenuPopover.contains(e.target)) {
          generateMenuPopover.classList.remove('show');
        }
      }
    });

    // Option 1: Create (Default)
    optCreate.addEventListener('click', () => {
      createMenuPopover.classList.remove('show');
      resetMergeStep(); // Ensure clean state
      btnCreate.click(); // Trigger original logic
    });

    // Option 2: Create and Merge
    optCreateMerge.addEventListener('click', () => {
      createMenuPopover.classList.remove('show');
      addMergeStep(); // Inject the additional merge step
      btnCreate.click(); // Trigger logic
    });

    // Helper to inject the "Merge" step dynamically
    function addMergeStep() {
      if (document.getElementById('step-merge')) return;

      const currentSteps = generateSteps.querySelectorAll('.step').length;
      // Create new step HTML
      const mergeStepHTML = \`
        <div class="step" data-step="\${currentSteps}" id="step-merge">
          <div class="step-left">
            <div class="step-indicator"></div>
            <span class="step-text">Merging Pull Request...</span>
          </div>
          <div class="step-right">
            <svg class="step-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </div>
        </div>
      \`;
      generateSteps.insertAdjacentHTML('beforeend', mergeStepHTML);

      // Update the counter (e.g., 0/4 -> 0/5)
      const counter = document.getElementById('createCounter');
      if (counter) {
        const [curr, total] = counter.innerText.split('/');
        counter.innerText = \`\${curr}/\${parseInt(total) + 1}\`;
      }
    }

    // Helper to remove "Merge" step if switching back to normal create
    function resetMergeStep() {
      const mergeStep = document.getElementById('step-merge');
      if (mergeStep) {
        mergeStep.remove();
        const counter = document.getElementById('createCounter');
        if (counter) {
          const [curr, total] = counter.innerText.split('/');
          counter.innerText = \`\${curr}/\${parseInt(total) - 1}\`;
        }
      }
    }

    // Generate split button functions
    function triggerGenerateDefault() {
      if (generateMenuPopover) generateMenuPopover.classList.remove('show');
      // Only generate when user is on PR view; otherwise keep existing "preview" behavior
      if (currentView === 'pr') runGenerateSteps('default');
      else switchView('pr');
    }

    function triggerGenerateWithOptions() {
      if (generateMenuPopover) {
        generateMenuPopover.classList.remove('show');
      }

      // Show prompt popup
      promptOverlay.classList.add('show');

      // Auto-focus the prompt input
      setTimeout(() => {
        promptInput.focus();
      }, 100);
    }

    // Generate split button event handlers
    if (btnGenerateMenuToggle) {
      btnGenerateMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (generateMenuPopover) generateMenuPopover.classList.toggle('show');
        // If the Create menu exists, close it when opening this one
        if (typeof createMenuPopover !== 'undefined' && createMenuPopover) {
          createMenuPopover.classList.remove('show');
        }
      });
    }

    if (optGenerateDefault) {
      optGenerateDefault.addEventListener('click', () => {
        triggerGenerateDefault();
      });
    }

    if (optGenerateWithOptions) {
      optGenerateWithOptions.addEventListener('click', () => {
        triggerGenerateWithOptions();
      });
    }

    // Update main button click handler
    btnGenerate.addEventListener('click', () => {
      triggerGenerateDefault();
    });

    // Prompt popup event handlers
    btnPromptCancel.addEventListener('click', () => {
      promptOverlay.classList.remove('show');
      promptInput.value = ''; // Clear input
    });

    btnPromptGenerate.addEventListener('click', () => {
      const userPrompt = promptInput.value.trim();
      const selectedModel = modelSelect.value;

      // Close popup
      promptOverlay.classList.remove('show');

      // Switch to PR view if needed
      if (currentView !== 'pr') {
        switchView('pr');
      }

      // Run generation with prompt and model
      runGenerateSteps('options', userPrompt, selectedModel);

      // Clear input for next time
      promptInput.value = '';
    });

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (promptOverlay.classList.contains('show')) {
          promptOverlay.classList.remove('show');
          promptInput.value = '';
          return;
        }
        // ... existing Esc handling
      }
    });

    // Close on outside click
    promptOverlay.addEventListener('click', (e) => {
      if (e.target === promptOverlay) {
        promptOverlay.classList.remove('show');
        promptInput.value = '';
      }
    });

    // Prevent closing when clicking inside the popup content
    document.querySelector('#promptOverlay .overlay-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Context Menu for Commits
    const commitContextMenu = document.getElementById('commitContextMenu');
    const ctxCopySha = document.getElementById('ctxCopySha');
    const ctxViewOnGitHub = document.getElementById('ctxViewOnGitHub');
    let contextMenuCommitId = null;

    // Prevent default context menu and show custom one ONLY on commit items
    document.getElementById('commitList').addEventListener('contextmenu', function(e) {
      const commitItem = e.target.closest('.commit-item');
      if (commitItem) {
        e.preventDefault();
        contextMenuCommitId = parseInt(commitItem.dataset.commitId);

        // Position the menu
        commitContextMenu.style.left = e.clientX + 'px';
        commitContextMenu.style.top = e.clientY + 'px';
        commitContextMenu.classList.add('show');

        // Adjust if menu goes off-screen
        const menuRect = commitContextMenu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth) {
          commitContextMenu.style.left = (e.clientX - menuRect.width) + 'px';
        }
        if (menuRect.bottom > window.innerHeight) {
          commitContextMenu.style.top = (e.clientY - menuRect.height) + 'px';
        }
      }
    });

    // Close context menu on click anywhere
    document.addEventListener('click', function() {
      commitContextMenu.classList.remove('show');
    });

    // Close context menu on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        commitContextMenu.classList.remove('show');
      }
    });

    // Copy SHA action
    ctxCopySha.addEventListener('click', async function() {
      if (contextMenuCommitId !== null) {
        const commit = commits[contextMenuCommitId];
        if (commit && commit.sha) {
          try {
            await navigator.clipboard.writeText(commit.sha);
            // Visual feedback
            const originalText = ctxCopySha.innerHTML;
            ctxCopySha.innerHTML = \`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            \`;
            setTimeout(() => {
              ctxCopySha.innerHTML = originalText;
            }, 1500);
          } catch (err) {
            console.error('Failed to copy SHA:', err);
          }
        }
      }
      commitContextMenu.classList.remove('show');
    });

    // View on GitHub action
    ctxViewOnGitHub.addEventListener('click', function() {
      if (contextMenuCommitId !== null) {
        const commit = commits[contextMenuCommitId];
        if (commit && commit.sha) {
          // Replace with your actual repo URL
          window.open(\`https://github.com/owner/repo/commit/\${commit.sha}\`, '_blank');
        }
      }
      commitContextMenu.classList.remove('show');
    });

    // ============================================
    // Context Menu for Files (File Overview list)
    // ============================================
    const fileContextMenu = document.getElementById('fileContextMenu');
    const ctxRevealInFileBrowser = document.getElementById('ctxRevealInFileBrowser');
    const ctxFileViewOnGitHub = document.getElementById('ctxFileViewOnGitHub');
    const ctxOpenWithDefault = document.getElementById('ctxOpenWithDefault');
    const ctxCopyFilePath = document.getElementById('ctxCopyFilePath');
    let contextMenuFileId = null;

    // Prevent default context menu and show custom one ONLY on file items in sidebar
    document.getElementById('fileList').addEventListener('contextmenu', function(e) {
      const fileItem = e.target.closest('.file-item');
      if (fileItem) {
        e.preventDefault();
        contextMenuFileId = parseInt(fileItem.dataset.fileId);

        // Close commit context menu if open
        commitContextMenu.classList.remove('show');

        // Position the menu
        fileContextMenu.style.left = e.clientX + 'px';
        fileContextMenu.style.top = e.clientY + 'px';
        fileContextMenu.classList.add('show');

        // Adjust if menu goes off-screen
        const menuRect = fileContextMenu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth) {
          fileContextMenu.style.left = (e.clientX - menuRect.width) + 'px';
        }
        if (menuRect.bottom > window.innerHeight) {
          fileContextMenu.style.top = (e.clientY - menuRect.height) + 'px';
        }
      }
    });

    // Close file context menu on click anywhere
    document.addEventListener('click', function() {
      fileContextMenu.classList.remove('show');
    });

    // Close file context menu on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        fileContextMenu.classList.remove('show');
      }
    });

    // Reveal in file-browser action
    ctxRevealInFileBrowser.addEventListener('click', function() {
      if (contextMenuFileId !== null) {
        const file = files[contextMenuFileId];
        if (file && file.path) {
          // In a real app, this would trigger a native file browser reveal
          // For web demo, we show feedback
          console.log('Reveal in file-browser:', file.path);
          showContextMenuFeedback(ctxRevealInFileBrowser, 'Opening...');
        }
      }
      fileContextMenu.classList.remove('show');
    });

    // View on GitHub action
    ctxFileViewOnGitHub.addEventListener('click', function() {
      if (contextMenuFileId !== null) {
        const file = files[contextMenuFileId];
        if (file && file.path) {
          // Replace with your actual repo URL
          const branch = sourceBranch || 'main';
          window.open(\`https://github.com/owner/repo/blob/\${branch}/\${file.path}\`, '_blank');
        }
      }
      fileContextMenu.classList.remove('show');
    });

    // Open with default program action
    ctxOpenWithDefault.addEventListener('click', function() {
      if (contextMenuFileId !== null) {
        const file = files[contextMenuFileId];
        if (file && file.path) {
          // In a real app, this would trigger the OS default handler
          console.log('Open with default program:', file.path);
          showContextMenuFeedback(ctxOpenWithDefault, 'Opening...');
        }
      }
      fileContextMenu.classList.remove('show');
    });

    // Copy file path action
    ctxCopyFilePath.addEventListener('click', async function() {
      if (contextMenuFileId !== null) {
        const file = files[contextMenuFileId];
        if (file && file.path) {
          try {
            await navigator.clipboard.writeText(file.path);
            showContextMenuFeedback(ctxCopyFilePath, 'Copied!');
          } catch (err) {
            console.error('Failed to copy file path:', err);
          }
        }
      }
      fileContextMenu.classList.remove('show');
    });

    // Helper function for visual feedback on context menu items
    function showContextMenuFeedback(element, message) {
      const originalHTML = element.innerHTML;
      element.innerHTML = \`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        \${message}
      \`;
      setTimeout(() => {
        element.innerHTML = originalHTML;
      }, 1500);
    }

    // Update the existing click handler to close ALL context menus
    document.addEventListener('click', function() {
      commitContextMenu.classList.remove('show');
      fileContextMenu.classList.remove('show');
    });

    // Update the existing keydown handler to close ALL context menus
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        commitContextMenu.classList.remove('show');
        fileContextMenu.classList.remove('show');
      }
    });

    // Bind copy-to-clipboard behavior for inline SHA copy buttons
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest(".js-copy-commit-sha");
      if (!btn) return;

      const sha = btn.dataset.sha || "";
      if (!sha) return;

      try {
        await navigator.clipboard.writeText(sha);

        // Optional tiny feedback
        btn.style.transform = "scale(0.95)";
        setTimeout(() => (btn.style.transform = ""), 120);
      } catch (err) {
        console.error("Failed to copy SHA:", err);
      }
    });

    // Initialize
    renderReviewerList();
    updateReviewerBadge();
    updateGenerateBtn();
    updateCreateBtn();
  </script>

</body>
</html>
`;var i=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Omni — Commit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #09090b;
      --bg-tertiary: #141414;
      --bg-hover: #1a1a1a;
      --border: #27272a;
      --border-light: #3f3f46;
      --text-primary: #fafafa;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;
      --accent: #fafafa;
      --accent-dim: rgba(255,255,255,0.08);
      --green: #22c55e;
      --amber: #f59e0b;
      --orange: #fb923c;
      --red: #ef4444;
      --shadow: 0 25px 50px -12px rgba(0,0,0,0.65);
      --mono: 'JetBrains Mono', ui-monospace, monospace;
      --sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
      --radius: 10px;
      --focus-ring: rgba(255,255,255,0.08);
      --kbd-bg: rgba(255,255,255,0.05);
      --split-separator: rgba(113,113,122,0.4);
      --btn-primary-hover: #e4e4e7;
      --btn-primary-text: #0a0a0a;
    }

    html, body { height: 100%; }
    body {
      background: radial-gradient(1100px 700px at 70% 20%, rgba(255,255,255,0.04), transparent 60%),
                  radial-gradient(900px 650px at 15% 75%, rgba(34,197,94,0.04), transparent 62%),
                  linear-gradient(180deg, #000, #0a0a0a);
      color: var(--text-primary);
      font-family: var(--sans);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.012), rgba(255,255,255,0.012) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 6px);
      mix-blend-mode: overlay;
      opacity: 0.18;
      z-index: 9999;
    }

    ::selection { background: rgba(255,255,255,0.2); }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #52525b; }

    /* Main Window */
    .window {
      width: 100%;
      max-width: 1100px;
      height: min(680px, calc(100vh - 60px));
      background: rgba(9,9,11,0.88);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      backdrop-filter: blur(12px);
    }

    /* Status Bar */
    .status-bar {
      height: 44px;
      padding: 0 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .traffic-lights { display: flex; gap: 8px; }
    .traffic-light {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .traffic-light.red { background: #ff5f57; }
    .traffic-light.yellow { background: #febc2e; }
    .traffic-light.green { background: #28c840; }
    .traffic-light:hover { filter: brightness(1.15); transform: scale(1.1); }

    .status-title {
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-family: var(--mono);
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }

    .status-spacer { width: 52px; }

    /* Buttons */
    .btn {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      user-select: none;
    }
    .btn:hover { background: var(--bg-hover); border-color: var(--border-light); }
    .btn:active { transform: translateY(1px); }
    .btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    .btn-primary {
      background: var(--text-primary);
      color: var(--btn-primary-text);
      border-color: transparent;
    }
    .btn-primary:hover { background: var(--btn-primary-hover); }

    .btn-ghost {
      background: transparent;
      border-color: transparent;
    }
    .btn-ghost:hover { background: var(--accent-dim); border-color: var(--border); }

    .btn .icon { width: 14px; height: 14px; opacity: 0.7; }
    .btn .chevron { width: 12px; height: 12px; opacity: 0.5; margin-left: auto; }

    /* Split Button - matching styleguide */
    .split-btn-container { 
      display: inline-flex; 
      position: relative; 
      vertical-align: middle; 
    }
    .split-btn-container .btn { margin: 0; }
    .split-btn-container:hover .btn:not(:disabled) {
      background: var(--btn-primary-hover);
      border-color: var(--border-light);
      color: var(--btn-primary-text);
    }
    .split-btn-container:active .btn:not(:disabled) { transform: translateY(1px); }

    .btn-split-left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      padding-right: 12px;
      position: relative;
    }
    .btn-split-left::after {
      content: "";
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: var(--split-separator);
      z-index: 1;
    }
    .btn-split-right {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      padding-left: 8px;
      padding-right: 8px;
      width: 36px;
      justify-content: center;
    }
    .btn-split-right svg { width: 16px; height: 16px; }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* Left Sidebar */
    .sidebar {
      width: 280px;
      border-right: 1px solid var(--border);
      background: rgba(0,0,0,0.16);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow: hidden;
    }

    .sidebar-section {
      padding: 12px;
      border-bottom: 1px solid rgba(39,39,42,0.5);
    }
    .sidebar-section:first-child { padding-top: 14px; }
    .sidebar-section:last-child { border-bottom: none; }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .section-header .label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .section-header .meta {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    /* Checkbox - matching styleguide */
    .checkbox {
      width: 16px;
      height: 16px;
      appearance: none;
      -webkit-appearance: none;
      border: 1.5px solid var(--border-light);
      border-radius: 4px;
      background: var(--bg-primary);
      cursor: pointer;
      position: relative;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .checkbox:hover { border-color: var(--text-muted); }
    .checkbox:checked {
      background: var(--text-primary);
      border-color: var(--text-primary);
    }
    .checkbox:checked::after {
      content: "✓";
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-primary);
      font-size: 10px;
      font-weight: bold;
    }
    .checkbox:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus-ring);
    }

    /* Checkbox subtle variant (stroke-only) */
    .checkbox-subtle {
      width: 16px;
      height: 16px;
      appearance: none;
      -webkit-appearance: none;
      border: 1px solid var(--border-light);  /* thinner: 1px instead of 1.5px */
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      position: relative;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .checkbox-subtle:hover {
      border-color: var(--text-secondary);  /* brighter hover */
    }
    .checkbox-subtle:checked {
      border-color: var(--text-primary);  /* full brightness */
      background: transparent;
    }
    .checkbox-subtle:checked::after {
      content: "✓";
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary);  /* full brightness checkmark */
      font-size: 10px;
      font-weight: bold;
    }
    .checkbox-subtle:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus-ring);
    }

    /* File Item */
    .file-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border-radius: 6px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-secondary);
      transition: background 0.15s;
      cursor: pointer;
    }
    .file-item:hover { background: var(--bg-hover); }
    .file-item.active { background: var(--accent-dim); }

    .file-status {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .file-status.M { background: rgba(245,158,11,0.18); color: var(--amber); }
    .file-status.A { background: rgba(34,197,94,0.18); color: var(--green); }
    .file-status.R { background: rgba(239,68,68,0.18); color: var(--red); }

    /* File drawer items - status on left side */
    .detail-files-grid .file-status {
      order: -1;
      margin-right: 8px;
      margin-left: 0;
    }

    /* Sidebar file items - status on right side */
    #fileList .file-status {
      order: 1;
      margin-left: 8px;
      margin-right: 0;
    }

    .file-path {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-changes {
      font-size: 10px;
      color: var(--text-muted);
      white-space: nowrap;
    }
    .file-changes .add { color: var(--green); }
    .file-changes .rem { color: var(--red); }

    /* Commit Item */
    .commit-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border-radius: 6px;
      font-size: 12px;
      color: var(--text-secondary);
      transition: background 0.15s;
      cursor: pointer;
    }
    .commit-item:hover { background: var(--accent-dim); }
    .commit-item.active { background: var(--accent-dim); }
    .commit-item .checkbox { margin-top: 3px; }
    .commit-item .commit-info { flex: 1; min-width: 0; }
    .commit-item .commit-title {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .commit-item .commit-subtitle {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .empty-state {
      padding: 16px 12px;
      text-align: center;
      font-size: 12px;
      color: var(--text-muted);
      font-style: italic;
    }

    /* Details Panel */
    .details-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: rgba(0,0,0,0.08);
    }

    .top-bar {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.18);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      flex-shrink: 0;
    }

    .details-content-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;
      overflow-y: auto;
    }

    .form-group { margin-bottom: 20px; }
    .form-group.flex-grow {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      background: rgba(0,0,0,0.25);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      font-family: var(--sans);
      font-size: 13px;
      color: var(--text-primary);
      transition: border-color 0.2s;
    }
    .form-input:focus { outline: none; border-color: var(--border-light); }
    .form-input::placeholder { color: var(--text-muted); }

    textarea.form-input {
      flex: 1;
      min-height: 140px;
      resize: none;
      font-family: var(--mono);
      line-height: 1.6;
    }

    /* KBD - matching styleguide */
    .kbd {
      padding: 2px 6px;
      background: var(--kbd-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, var(--mono), monospace;
      color: var(--text-secondary);
      display: inline-block;
      vertical-align: baseline;
    }

    /* Shortcuts bar - matching styleguide */
    .shortcuts-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }
    .shortcuts-bar .shortcut {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .shortcuts-bar .shortcut .kbd {
      margin-right: 2px;
    }

    /* Menu shortcut - matching styleguide */
    .menu-shortcut {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--mono);
      margin-left: 12px;
      white-space: nowrap;
      flex-shrink: 0;
      align-self: flex-start;
      margin-top: 2px;
    }
    .menu-shortcut .kbd {
      margin-right: 3px;
    }
    .menu-shortcut .kbd:last-child {
      margin-right: 0;
    }

    /* Detail Views */
    .detail-view {
      display: none;
      flex-direction: column;
      height: 100%;
    }
    .detail-view.active { display: flex; }

    /* Bottom Bar */
    .bottom-bar {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
    }

    .bottom-bar-right {
      display: flex;
      gap: 10px;
    }

    /* Dropdown */
    .dropdown-container { position: relative; }

    .dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      min-width: 280px;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 100;
      overflow: hidden;
    }
    .dropdown.show { display: block; }

    .dropdown-header {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      background: rgba(0,0,0,0.25);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dropdown-header .branch-count {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .dropdown-search {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      position: relative;
    }

    .dropdown-search input {
      width: 100%;
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 32px 8px 12px;
      font-size: 12px;
      color: var(--text-primary);
    }
    .dropdown-search input:focus { outline: none; border-color: var(--border-light); }
    .dropdown-search input::placeholder { color: var(--text-muted); }

    .clear-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
      display: none;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.15s;
    }
    .clear-btn:hover { background: var(--accent-dim); color: var(--text-secondary); }
    .clear-btn.show { display: flex; }
    .clear-btn svg { width: 14px; height: 14px; }

    .dropdown-list {
      max-height: 240px;
      overflow-y: auto;
      padding: 6px;
    }

    .dropdown-item {
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.12s;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
    }
    .dropdown-item:hover { background: var(--accent-dim); color: var(--text-primary); }
    .dropdown-item.selected { background: var(--accent-dim); color: var(--text-primary); }

    .branch-current-indicator {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--mono);
      margin-left: auto;
      padding-left: 8px;
    }

    /* Overlay */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.70);
      backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 200;
    }
    .overlay.show { display: flex; }

    .overlay-content {
      background: rgba(9,9,11,0.95);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow);
      width: min(520px, calc(100vw - 36px));
      overflow: hidden;
    }

    .overlay-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .overlay-header-counter {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .overlay-body { padding: 12px 16px; }

    /* Progress Steps */
    .progress-steps {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .step {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 0px;
      border-radius: 12px;
      background: transparent;
      border: none;
      font-family: var(--mono);
      font-size: 12.5px;
      color: var(--text-primary);
      transition: all 0.2s;
    }
    .step.done { color: var(--text-secondary); background: transparent; }

    .step-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .step-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      flex-shrink: 0;
      position: relative;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 400;
    }
    .step.active .step-indicator { border-color: rgba(251, 146, 60, 0.3); }
    .step.done .step-indicator {
      border-color: var(--green);
      background: rgba(34,197,94,0.15);
      color: var(--green);
    }

    .step-spinner {
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      border: 2px solid rgba(251, 146, 60, 0.25);
      border-top-color: rgba(251, 146, 60, 0.9);
      animation: spin 0.8s linear infinite;
    }

    .step-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .step-status {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-muted);
      flex-shrink: 0;
      min-width: 180px;
      text-align: right;
    }
    .step.active .step-status { color: var(--orange); }
    .step.done .step-status { color: var(--green); }

    @keyframes spin { to { transform: rotate(360deg); } }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .overlay.show .overlay-content { animation: fadeIn 0.22s ease; }

    /* Popover Menu */
    .popover-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      width: 380px;
      height: 140px;
      min-width: 250px;
      display: none;
      z-index: 1000;
      overflow: hidden;
      flex-direction: column;
    }
    .popover-menu.show { display: flex; }
    .popover-menu.popover-down {
      bottom: auto;
      top: 100%;
      margin-top: 8px;
      margin-bottom: 0;
    }

    .menu-item {
      padding: 12px 16px;
      font-size: 14px;
      cursor: pointer;
      color: var(--text-primary);
      transition: background 0.2s;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .menu-item:hover { background: var(--bg-hover); }

    .menu-item span.desc {
      display: block;
      font-size: 11px;
      color: var(--text-secondary);
      margin-top: 4px;
      white-space: normal;
      line-height: 1.4;
    }

    /* Context Menu */
    .context-menu {
      position: fixed;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      min-width: 180px;
      z-index: 1000;
      display: none;
      overflow: hidden;
    }
    .context-menu.show { display: block; }

    .context-menu-item {
      padding: 10px 14px;
      font-size: 13px;
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.15s;
    }
    .context-menu-item:hover { background: var(--bg-hover); }
    .context-menu-item svg { width: 14px; height: 14px; opacity: 0.7; }

    .context-menu-separator {
      height: 1px;
      background: var(--border);
      margin: 4px 0;
    }

    /* Prompt overlay */
    .prompt-subtitle {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .prompt-input {
      width: 100%;
      background: rgba(0,0,0,0.25);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 14px;
      font-family: var(--sans);
      font-size: 13px;
      color: var(--text-primary);
      resize: vertical;
      min-height: 120px;
      margin-bottom: 16px;
    }
    .prompt-input:focus { outline: none; border-color: var(--border-light); }

    .model-selector {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .model-selector .form-label { margin-bottom: 0; min-width: 50px; }
    .model-selector .form-input {
      flex: 1;
      margin-bottom: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 12px;
      padding-right: 30px;
      background-color: rgba(0,0,0,0.25);
    }

    .prompt-actions {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    /* Autosplit toggle row */
    .autosplit-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-secondary);
      user-select: none;
      cursor: pointer;
    }

    /* File drawer - matching styleguide */
    .detail-files {
      border-top: 1px solid var(--border);
      padding-top: 12px;
      margin-top: auto;
    }

    .detail-files-header {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .detail-files-stats {
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 500;
      color: var(--text-muted);
      opacity: 0.7;
      text-transform: none;
      letter-spacing: normal;
      display: flex;
      gap: 12px;
    }

    .detail-files-stats .add { color: var(--green); }
    .detail-files-stats .rem { color: var(--red); }

    .detail-files-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .detail-files-grid .file-item {
      flex: 0 0 auto;
      min-width: 0;
      background: var(--bg-tertiary);
      text-transform: none;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      opacity: 0.8;
    }

    /* Code preview box */
    .code-box {
      flex: 1;
      min-height: 0;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.12);
    }
    .code-path {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .code-meta {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
    }
    .code-content {
      flex: 1;
      overflow: auto;
      padding: 12px 14px;
      font-family: var(--mono);
      font-size: 12px;
      line-height: 1.6;
      color: var(--text-secondary);
      white-space: pre;
    }
    .code-content .ln {
      color: var(--text-muted);
      user-select: none;
      display: inline-block;
      width: 3ch;
      text-align: right;
      margin-right: 12px;
      opacity: 0.6;
    }

    /* Placeholder state */
    .placeholder-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }
    .placeholder-state .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    .placeholder-state .desc {
      font-size: 12px;
      color: var(--text-muted);
      font-family: var(--mono);
      line-height: 1.5;
      white-space: pre-wrap;
    }

    /* Character count colors */
    .char-count { transition: color 0.15s; }
    .char-count.warning { color: var(--amber); }
    .char-count.danger { color: var(--red); }
  </style>
</head>
<body>

  <!-- Main Window -->
  <div class="window">

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="traffic-lights" aria-hidden="true">
        <div class="traffic-light red"></div>
        <div class="traffic-light yellow"></div>
        <div class="traffic-light green"></div>
      </div>
      <div class="status-title">Omni — Commit</div>
      <div class="status-spacer"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">

      <!-- Left Sidebar -->
      <aside class="sidebar">

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

      </aside>

      <!-- Details Panel -->
      <section class="details-panel">

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

      </section>

    </div>

    <!-- Bottom Bar -->
    <div class="bottom-bar">
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
        </div>
      </div>
    </div>

  </div>

  <!-- Generate Progress Overlay -->
  <div class="overlay" id="generateOverlay">
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
  </div>

  <script>
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
      { id:'c1', title:'feat(auth): introduce login+session wiring', subtitle:'4 files · +156 · -22', checked:true, selected:false, body:'- Summary: Create a minimal login session flow.\\n- Notes: Keeps scope tight and reviewable.', files:['f1','f2','f4','f6'] },
      { id:'c2', title:'refactor(api): isolate client route composition', subtitle:'1 file · +33 · -6', checked:true, selected:false, body:'- Summary: Separate API client from routing layer.\\n- Notes: No behavior change intended.', files:['f3'] },
      { id:'c3', title:'test(auth): cover login happy-path', subtitle:'1 file · +44 · -0', checked:true, selected:false, body:'- Summary: Add baseline coverage for login/session.\\n- Notes: Focused on the green path only.', files:['f7'] }
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
        const deltaMatch = f.delta.match(/\\+(\\d+).*-(\\d+)/);
        let deltaHtml = escapeHTML(f.delta);
        if (deltaMatch) {
          deltaHtml = \`<span class="add">+\${deltaMatch[1]}</span> <span class="rem">−\${deltaMatch[2]}</span>\`;
        }

        el.innerHTML = \`
          <input type="checkbox" class="checkbox" data-action="check" \${f.checked ? 'checked' : ''} />
          <span class="file-path">\${escapeHTML(f.path)}</span>
          <span class="file-changes">\${deltaHtml}</span>
          <span class="file-status \${f.status}">\${f.status}</span>
        \`;
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
        const subtitleMatch = c.subtitle.match(/\\+(\\d+).*-(\\d+)/);
        if (subtitleMatch) {
          subtitleHtml = c.subtitle.replace(/\\+(\\d+).*-(\\d+)/, (match, add, del) => {
            return \`· <span class="add">+\${add}</span> · <span class="rem">−\${del}</span>\`;
          });
        }

        el.innerHTML = \`
          <input type="checkbox" class="checkbox" data-action="check" \${c.checked ? 'checked' : ''} />
          <div class="commit-info">
            <div class="commit-title">\${escapeHTML(c.title)}</div>
            <div class="commit-subtitle">\${subtitleHtml}</div>
          </div>
        \`;
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
        }).join('\\n');
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
        placeholder.querySelector('.desc').textContent = selFiles.filter(f=>f.checked).length + ' of ' + selFiles.length + ' checked.\\nRight-click for bulk actions.';
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
        const m = f.delta.match(/\\+(\\d+).*-(\\d+)/);
        if (m) { add += +m[1]; del += +m[2]; }

        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = \`
          <span class="file-status \${f.status}">\${f.status}</span>
          <span class="file-path">\${escapeHTML(f.path)}</span>
          <span class="file-changes"><span class="add">+\${m?m[1]:0}</span> <span class="rem">−\${m?m[2]:0}</span></span>
        \`;
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
      const paths = getSelectedFiles().map(f => f.path).join('\\n');
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
  </script>
</body>
</html>
`;var n=`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Omni - Release</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* =========================================================
       Omni UI System - Design Tokens from styleguide2
       ========================================================= */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      /* Core colors */
      --bg-primary: #0a0a0a;
      --bg-secondary: #09090b;
      --bg-tertiary: #141414;
      --bg-hover: #1a1a1a;
      --border: #27272a;
      --border-light: #3f3f46;

      /* Text */
      --text-primary: #fafafa;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;

      /* Accent */
      --accent: #fafafa;
      --accent-dim: rgba(255,255,255,0.08);

      /* Status colors */
      --green: #22c55e;
      --amber: #f59e0b;
      --orange: #fb923c;
      --red: #ef4444;

      /* Layout */
      --shadow: 0 25px 50px -12px rgba(0,0,0,0.65);
      --shadow-sm: 0 10px 25px -5px rgba(0,0,0,0.5);
      --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      --sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
      --radius: 10px;
      --ease: cubic-bezier(.2,.8,.2,1);
    }

    html, body { height: 100%; margin: 0; }
    body {
      background:
        radial-gradient(1100px 700px at 70% 20%, rgba(255,255,255,0.04), transparent 60%),
        radial-gradient(900px 650px at 15% 75%, rgba(34,197,94,0.04), transparent 62%),
        linear-gradient(180deg, #000, #0a0a0a);
      color: var(--text-primary);
      font-family: var(--sans);
      display: grid;
      place-items: center;
      padding: 24px;
      overflow: hidden;
    }

    /* Scanlines / CRT overlay */
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.012),
        rgba(255,255,255,0.012) 1px,
        rgba(0,0,0,0) 3px,
        rgba(0,0,0,0) 6px
      );
      mix-blend-mode: overlay;
      opacity: 0.18;
      z-index: 99999;
    }

    ::selection { background: rgba(255,255,255,0.2); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #52525b; }

    /* =========================================================
       Window Shell
       ========================================================= */
    .window {
      width: min(1100px, calc(100vw - 48px));
      height: min(680px, calc(100vh - 48px));
      border-radius: calc(var(--radius) + 4px);
      border: 1px solid var(--border);
      background: rgba(9,9,11,0.88);
      box-shadow: var(--shadow);
      backdrop-filter: blur(12px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Status Bar (macOS style) */
    .statusbar {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.35);
      position: relative;
      flex-shrink: 0;
    }
    .traffic {
      position: absolute;
      left: 14px;
      display: flex;
      gap: 8px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.15s ease;
      position: relative;
    }
    .dot::after {
      content: "";
      position: absolute;
      inset: 3px;
      border-radius: 999px;
      background: rgba(0,0,0,0.25);
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .dot:hover::after { opacity: 1; }
    .dot:hover { transform: scale(1.1); }
    .dot.red { background: #ff5f57; }
    .dot.yellow { background: #febc2e; }
    .dot.green { background: #28c840; }
    .statusbar-title {
      font-size: 13px;
      font-family: var(--mono);
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: var(--text-muted);
      user-select: none;
    }

    /* =========================================================
       Top Bar
       ========================================================= */
    .topbar {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0,0,0,0.25);
      flex-shrink: 0;
      gap: 12px;
      flex-wrap: wrap;
      position: relative;
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Checkbox */
    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .checkbox {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid var(--border-light);
      background: rgba(0,0,0,0.3);
      display: grid;
      place-items: center;
      transition: all 0.15s ease;
    }
    .checkbox[data-checked="true"] {
      background: var(--accent);
      border-color: var(--accent);
    }
    .checkbox svg {
      opacity: 0;
      transition: opacity 0.1s ease;
    }
    .checkbox[data-checked="true"] svg { opacity: 1; }
    .checkbox-label {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* =========================================================
       Buttons
       ========================================================= */
    .btn {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.22);
      color: var(--text-primary);
      cursor: pointer;
      user-select: none;
      transition: all 0.15s var(--ease);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn:hover {
      background: var(--bg-hover);
      border-color: var(--border-light);
    }
    .btn:active { transform: translateY(1px); }
    .btn.primary {
      background: var(--text-primary);
      color: var(--bg-primary);
      border-color: transparent;
    }
    .btn.primary:hover { background: #e4e4e7; }
    .btn.ghost {
      background: transparent;
      border-color: transparent;
    }
    .btn.ghost:hover {
      background: var(--accent-dim);
      border-color: var(--border);
    }
    .btn.small {
      padding: 6px 10px;
      font-size: 11px;
    }
    .btn:disabled, .btn[aria-disabled="true"] {
      opacity: 0.45;
      pointer-events: none;
      filter: grayscale(0.2);
    }
    .kbd {
      font-family: var(--mono);
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.05);
      color: var(--text-secondary);
    }

    /* =========================================================
       Main Body
       ========================================================= */
    .main-body {
      flex: 1;
      display: grid;
      grid-template-columns: 320px 1fr;
      overflow: hidden;
    }
    @media (max-width: 800px) {
      .main-body { grid-template-columns: 1fr; }
      .sidebar { display: none; }
    }

    /* =========================================================
       Sidebar
       ========================================================= */
    .sidebar {
      border-right: 1px solid var(--border);
      background: rgba(0,0,0,0.16);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    /* Overview Section */
    .overview-section {
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.08);
    }
    .overview-header {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
    }
    .overview-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .overview-item {
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      position: relative;
    }
    .overview-item:hover { background: var(--accent-dim); }
    .overview-item.selected {
      background: var(--accent-dim);
      border-left-color: var(--accent);
    }
    .overview-item-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
    }
    .overview-item-text {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .overview-item.selected .overview-item-text { color: var(--green); }

    /* Files Section */
    .files-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .sidebar-header {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .sidebar-header-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .sidebar-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .sidebar-subtitle {
      font-size: 11px;
      font-family: var(--mono);
      color: var(--text-muted);
    }
    .file-list-container {
      flex: 1;
      overflow-y: auto;
      padding: 0;
    }
    .file-item {
      display: flex;
      flex-direction: column;
      padding: 10px 14px;
      background: transparent;
      cursor: pointer;
      transition: all 0.15s ease;
      gap: 6px;
      -webkit-user-select: none;
      user-select: none;
    }
    .file-item:hover { background: var(--accent-dim); }
    .file-item[data-selected="true"] { background: var(--accent-dim); }
    .file-item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .file-name {
      font-family: var(--mono);
      font-size: 12px;
      font-weight: 500;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-timestamp {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .file-path {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-size {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .file-placeholder {
      border: 1px dashed var(--border-light);
      border-radius: var(--radius);
      padding: 24px;
      text-align: center;
      color: var(--text-secondary);
      font-size: 13px;
      margin: 12px;
    }
    .sidebar-footer {
      padding: 10px 14px;
      border-top: 1px solid var(--border);
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      background: rgba(0,0,0,0.16);
    }

    /* =========================================================
       Detail View
       ========================================================= */
    .detail-view {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: rgba(0,0,0,0.08);
      position: relative;
    }
    .detail-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Release Detail View */
    .release-detail-view {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      min-height: 0;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }
    .form-group.flex-fill {
      flex: 1;
      min-height: 0;
    }
    .form-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      flex-shrink: 0;
    }
    .input {
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      color: var(--text-primary);
      font-family: var(--sans);
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.15s ease;
    }
    .input:focus {
      border-color: var(--border-light);
      box-shadow: 0 0 0 3px rgba(255,255,255,0.06);
    }
    .input::placeholder { color: var(--text-muted); }
    textarea.input {
      resize: none;
      font-family: var(--mono);
      font-size: 13px;
      line-height: 1.6;
      flex: 1;
      min-height: 0;
    }

    /* File Detail View */
    .file-detail-view {
      display: flex;
      flex-direction: column;
      gap: 14px;
      height: 100%;
    }
    .file-detail-header {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .file-detail-header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .file-detail-name {
      font-family: var(--mono);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .file-detail-actions {
      display: flex;
      gap: 8px;
    }
    .file-detail-meta {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .file-content-preview {
      flex: 1;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(0,0,0,0.28);
      padding: 14px;
      overflow: auto;
      font-family: var(--mono);
      font-size: 12px;
      line-height: 1.6;
      color: var(--text-primary);
      white-space: pre-wrap;
    }

    /* Binary File View */
    .binary-file-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      flex: 1;
      padding: 48px 32px;
      text-align: center;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: rgba(0,0,0,0.28);
    }
    .binary-file-message {
      font-size: 15px;
      color: var(--text-primary);
      font-weight: 500;
      line-height: 1.5;
      padding: 16px 20px;
      background: rgba(0,0,0,0.25);
      border-radius: 8px;
    }

    /* =========================================================
       Bottom Bar
       ========================================================= */
    .bottombar {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0,0,0,0.25);
      flex-shrink: 0;
      gap: 12px;
      flex-wrap: wrap;
    }
    .bottombar-left {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-muted);
    }
    .bottombar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* =========================================================
       Tag Popover
       ========================================================= */
    .popover {
      position: fixed;
      width: 420px;
      max-width: calc(100vw - 48px);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(9,9,11,0.96);
      box-shadow: var(--shadow);
      backdrop-filter: blur(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s var(--ease);
      z-index: 50000;
      transform: translateY(-8px);
    }
    .popover.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .popover-header {
      padding: 14px 16px 12px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0,0,0,0.25);
    }
    .popover-title {
      font-size: 14px;
      font-weight: 600;
    }
    .popover-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-height: 420px;
      overflow-y: auto;
    }
    .tab-switcher {
      display: flex;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      background: rgba(0,0,0,0.2);
    }
    .tab-btn {
      flex: 1;
      padding: 8px 14px;
      font-size: 12px;
      font-family: var(--mono);
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tab-btn:hover { background: var(--accent-dim); }
    .tab-btn.active {
      background: var(--accent-dim);
      color: var(--text-primary);
    }
    .tab-content { display: none; }
    .tab-content.active {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .row {
      display: flex;
      gap: 12px;
    }
    .row > * { flex: 1; }
    .select {
      width: 100%;
      padding: 8px 32px 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      color: var(--text-primary);
      font-family: var(--mono);
      font-size: 11px;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23a1a1aa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
    }
    .select:focus { border-color: var(--border-light); }
    .small-input {
      padding: 9px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      color: var(--text-primary);
      font-family: var(--mono);
      font-size: 13px;
      outline: none;
      width: 100%;
    }
    .small-input:focus { border-color: var(--border-light); }

    /* Segmented selector */
    .segmented-selector {
      display: flex;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      background: rgba(0,0,0,0.2);
    }
    .segment-btn {
      flex: 1;
      padding: 8px 12px;
      font-size: 11px;
      font-family: var(--mono);
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .segment-btn:hover { background: var(--accent-dim); }
    .segment-btn.active {
      background: var(--accent-dim);
      color: var(--text-primary);
    }

    /* =========================================================
       Progress Overlay
       ========================================================= */
    .overlay {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(0,0,0,0.70);
      backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 220ms var(--ease);
      z-index: 4000;
    }
    .overlay.show {
      opacity: 1;
      pointer-events: auto;
    }
    .overlayCard {
      width: min(520px, calc(100vw - 48px));
      border-radius: calc(var(--radius) + 4px);
      border: 1px solid var(--border);
      background: rgba(9,9,11,0.95);
      box-shadow: var(--shadow);
      padding: 14px;
      position: relative;
      animation: fadeIn 0.22s ease;
    }
    .overlayTitle {
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-primary);
      margin: 0;
      padding: 8px 2px 12px;
      border: 0;
      background: transparent;
      border-radius: 0;
    }
    .progPanel {
      border: 0;
      border-top: 1px solid var(--border);
      border-radius: 0;
      background: transparent;
      padding: 12px 2px 0;
    }
    .progList {
      display: grid;
      gap: 8px;
    }
    .progItem {
      display: grid;
      grid-template-columns: 28px 1fr auto;
      align-items: center;
      gap: 10px;
      border: 0;
      background: transparent;
      border-radius: 0;
      padding: 8px 0;
    }
    .progItem[data-state="active"] { background: rgba(255,255,255,0.04); }
    .progItem[data-state="done"] { background: transparent; }
    .progLeft {
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .progRight {
      font-family: var(--mono);
      font-size: 11.5px;
      color: var(--text-muted);
      white-space: nowrap;
      text-transform: lowercase;
      letter-spacing: 0.02em;
    }
    .progItem[data-state="active"] .progRight { color: var(--amber); }
    .progItem[data-state="done"] .progRight { color: var(--green); }

    /* Arc Spinner */
    @keyframes arcspin {
      from { transform: rotate(-90deg); }
      to { transform: rotate(270deg); }
    }
    .arcWrap {
      width: 24px;
      height: 24px;
      position: relative;
      display: grid;
      place-items: center;
    }
    svg.arc {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transform-box: fill-box;
    }
    .progItem[data-state="active"] svg.arc {
      animation: arcspin 0.5s linear infinite;
    }
    .arc .track {
      stroke: rgba(113,113,122,0.35);
      fill: none;
    }
    .arc .bar {
      stroke: rgba(113,113,122,0.65);
      fill: none;
      stroke-dasharray: 25 100;
      stroke-dashoffset: 0;
      transition: stroke 160ms var(--ease), opacity 160ms var(--ease);
    }
    .progItem[data-state="active"] .arc .track { stroke: rgba(245,158,11,0.18); }
    .progItem[data-state="active"] .arc .bar { stroke: rgba(245,158,11,0.92); }
    .progItem[data-state="done"] .arc .track { stroke: rgba(34,197,94,0.95); }
    .progItem[data-state="done"] .arc .bar { opacity: 0; }
    .progItem[data-state="done"] svg.arc { animation: none; }
    .arcDone {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 500;
      color: rgba(34,197,94,0.98);
      opacity: 0;
      pointer-events: none;
    }
    .progItem[data-state="done"] .arcDone { opacity: 1; }

    /* Hide/Show views */
    .hidden { display: none !important; }

    /* =========================================================
       Split Button & Popovers
       ========================================================= */
    .btn-group-wrapper {
      position: relative;
      display: inline-block;
    }
    .btn-group {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--radius);
      background: var(--text-primary);
      overflow: hidden;
    }
    .btn-group .btn {
      margin: 0;
      border-radius: 0;
      background: transparent;
      color: var(--bg-primary);
      border: none;
    }
    .btn-group:hover .btn { background: rgba(0,0,0,0.05); }
    .btn-group:active .btn { background: rgba(0,0,0,0.1); }
    .btn-group-sep {
      width: 1px;
      background: rgba(0,0,0,0.15);
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .btn-group .btn:first-child {
      border-top-left-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
      padding-right: 12px;
    }
    .btn-group .btn:last-child {
      border-top-right-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
      padding-left: 6px;
      padding-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Generate Popover */
    .gen-popover {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 380px;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 1000;
      display: none;
      flex-direction: column;
      padding: 5px;
      backdrop-filter: blur(12px);
    }
    .gen-popover.show {
      display: flex;
      animation: fadePop 0.15s ease-out;
    }
    @keyframes fadePop {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadePopUp {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .gen-option {
      display: flex;
      align-items: flex-start;
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      gap: 12px;
      transition: background 0.1s;
    }
    .gen-option:hover { background: var(--bg-hover); }
    .gen-opt-info { flex: 1; }
    .gen-opt-title {
      font-weight: 500;
      font-size: 13px;
      color: var(--text-primary);
      margin-bottom: 4px;
      display: block;
    }
    .gen-opt-sub {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.35;
      display: block;
    }
    .gen-opt-keys {
      display: flex;
      gap: 4px;
      align-items: center;
      margin-top: 2px;
    }

    /* Create Release Split Button */
    .create-release-wrapper {
      position: relative;
      display: inline-block;
    }
    .create-release-btn-group {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--radius);
      background: var(--text-primary);
      transition: all 0.15s var(--ease);
    }
    .create-release-btn-group.disabled {
      opacity: 0.45;
      pointer-events: none;
      filter: grayscale(0.2);
    }
    .create-release-btn-group .btn-main,
    .create-release-btn-group .btn-dropdown {
      margin: 0;
      border-radius: 0;
      background: transparent;
      color: var(--bg-primary);
      border: none;
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      padding: 9px 14px;
      cursor: pointer;
      user-select: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .create-release-btn-group .btn-main {
      border-top-left-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
    }
    .create-release-btn-group .btn-dropdown {
      padding: 9px 10px 9px 8px;
      border-top-right-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
      justify-content: center;
      gap: 0;
    }
    .create-release-btn-group .btn-sep {
      width: 1px;
      background: rgba(0,0,0,0.15);
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .create-release-btn-group:not(.disabled):hover { background: #e4e4e7; }
    .create-release-btn-group:not(.disabled):active { background: rgba(255,255,255,0.78); }

    /* Create Release Popover */
    .create-release-popover {
      position: absolute;
      bottom: calc(100% + 8px);
      right: 0;
      width: 380px;
      background: rgba(9,9,11,0.96);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 1000;
      display: none;
      flex-direction: column;
      padding: 5px;
      backdrop-filter: blur(12px);
    }
    .create-release-popover.show {
      display: flex;
      animation: fadePopUp 0.15s ease-out;
    }

    /* Context menu */
    .ctx-menu {
      position: fixed;
      min-width: 220px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(9,9,11,0.96);
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(16px);
      padding: 6px;
      z-index: 65000;
      display: none;
    }
    .ctx-menu.show { display: block; }
    .ctx-item {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--text-primary);
      font-family: var(--sans);
      font-size: 13px;
      text-align: left;
      padding: 10px 10px;
      border-radius: var(--radius);
      cursor: pointer;
    }
    .ctx-item:hover { background: var(--bg-hover); }
    .ctx-item:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Prompt Popup Modal */
    .prompt-overlay {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgba(0,0,0,0.70);
      backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 220ms var(--ease);
      z-index: 60000;
    }
    .prompt-overlay.show {
      opacity: 1;
      pointer-events: auto;
    }
    .prompt-popup {
      width: min(520px, calc(100vw - 48px));
      border-radius: calc(var(--radius) + 4px);
      border: 1px solid var(--border);
      background: rgba(9,9,11,0.95);
      box-shadow: var(--shadow);
      padding: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      transform: translateY(-10px);
      transition: transform 220ms var(--ease);
      animation: fadeIn 0.22s ease;
    }
    .prompt-overlay.show .prompt-popup { transform: translateY(0); }
    .prompt-popup-header {
      padding: 18px 20px 14px 20px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
    }
    .prompt-popup-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }
    .prompt-popup-subtitle {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }
    .prompt-popup-body {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .prompt-textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px 14px;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      color: var(--text-primary);
      font-family: var(--mono);
      font-size: 13px;
      line-height: 1.6;
      outline: none;
      resize: vertical;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .prompt-textarea:focus {
      border-color: var(--border-light);
      box-shadow: 0 0 0 3px rgba(255,255,255,0.06);
    }
    .prompt-textarea::placeholder { color: var(--text-muted); }
    .prompt-model-selector {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .prompt-model-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .prompt-model-select {
      width: 100%;
      padding: 10px 36px 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
      color: var(--text-primary);
      font-family: var(--mono);
      font-size: 12px;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23a1a1aa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      transition: border-color 0.15s ease;
    }
    .prompt-model-select:focus { border-color: var(--border-light); }
    .prompt-popup-footer {
      padding: 14px 20px 18px 20px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

  </style>
</head>
</head>
<body>
  <div class="window" role="application" aria-label="Release window">
    <!-- Status Bar -->
    <div class="statusbar">
      <div class="traffic" aria-hidden="true">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="statusbar-title">Omni – Release</div>
    </div>

    <!-- Main Body -->
    <div class="main-body">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Overview Section -->
        <div class="overview-section">
          <div class="overview-header">
            <div class="overview-title">Release overview</div>
          </div>
          <div class="overview-item selected" id="overviewItem">
            <div class="overview-item-left">
              <div class="overview-item-text" id="overviewItemText">Tag: v0.1.5</div>
            </div>
            <button class="btn small" id="btnEditTag">Edit tag</button>
          </div>
        </div>

        <!-- Files Section -->
        <div class="files-section">
          <div class="sidebar-header">
            <div class="sidebar-header-left">
              <div class="sidebar-title">Release assets</div>
              <div class="sidebar-subtitle" id="fileStats">7 files • 2.1mb</div>
            </div>
            <button class="btn small" id="btnPickFiles">Choose files</button>
            <input type="file" id="filePicker" multiple hidden>
          </div>
          <div class="file-list-container" id="fileList">
            <div class="file-placeholder" id="filePlaceholder">No files selected</div>
          </div>
          <div class="sidebar-footer">Right click to show more options</div>
        </div>
      </div>

      <!-- Detail View -->
      <div class="detail-view">
        <!-- Top Bar (only shown when release overview is selected) -->
        <div class="topbar" id="topbar">
          <div class="topbar-left">
            <label class="checkbox-wrap" id="checksumToggle">
              <div class="checkbox" data-checked="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span class="checkbox-label">Include checksum</span>
            </label>
          </div>
          <div class="topbar-right">

            <div class="btn-group-wrapper">
              <div class="btn-group">
                <button class="btn" id="btnGenerateText">Generate release text</button>
                <div class="btn-group-sep"></div>
                <button class="btn" id="btnGenerateOptions">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              <!-- Popover Menu -->
              <div class="gen-popover" id="genPopover">
                <!-- Option 1 -->
                <div class="gen-option" id="optGenStandard">
                  <div class="gen-opt-info">
                    <span class="gen-opt-title">Generate release text</span>
                    <span class="gen-opt-sub">Generate release text based on the current files and commits since last release</span>
                  </div>
                  <div class="gen-opt-keys">
                    <span class="kbd">⌘</span><span class="kbd">G</span>
                  </div>
                </div>
                <!-- Option 2 -->
                <div class="gen-option" id="optGenOptions">
                  <div class="gen-opt-info">
                    <span class="gen-opt-title">Generate release text with options</span>
                    <span class="gen-opt-sub">Generate release text based on the current files, commits since last release and user prompt</span>
                  </div>
                  <div class="gen-opt-keys">
                    <span class="kbd">⇧</span><span class="kbd">⌘</span><span class="kbd">G</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Detail Content Area -->
        <div class="detail-content">
          <!-- Release Detail View -->
          <div class="release-detail-view" id="releaseDetailView">
            <div class="form-group">
              <label class="form-label">Release Title</label>
              <input type="text" class="input" id="releaseTitle" placeholder="(Generate to fill) e.g., Authentication Hotfix...">
            </div>
            <div class="form-group flex-fill">
              <label class="form-label">Release Description</label>
              <textarea class="input" id="releaseDesc" placeholder="(Generate to fill) e.g., What's new + Fixes + Known issues (if any)…"></textarea>
            </div>
          </div>

          <!-- File Detail View (hidden by default) -->
          <div class="file-detail-view hidden" id="fileDetailView">
            <div class="file-detail-header">
              <div class="file-detail-header-top">
                <div class="file-detail-name" id="fileDetailName">filename.txt</div>
                <div class="file-detail-actions">
                  <button class="btn small" id="btnOpenIDETop">Open in IDE</button>
                  <button class="btn small" id="btnRevealFileTop">Reveal in file-browser</button>
                </div>
              </div>
              <div class="file-detail-meta" id="fileDetailMeta">
                <div id="fileDetailMetaLine1"><!-- Path, date, size --></div>
                <div id="fileDetailMetaLine2"><!-- SHA --></div>
              </div>
            </div>

            <!-- Text File Preview -->
            <div class="file-content-preview hidden" id="fileContentPreview">
              File content will appear here...
            </div>

            <!-- Binary File View -->
            <div class="binary-file-view hidden" id="binaryFileView">
              <div class="binary-file-message">This is a binary file and cannot be previewed</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bottombar">
      <div class="bottombar-left">
        <span>Keyboard:</span>
        <span class="kbd">⌘</span><span class="kbd">G</span>
        <span>Toggle tag popover</span>
        <span class="kbd">␛</span>
        <span>Cancel</span>
        <span class="kbd">⇧</span><span class="kbd">↵</span>
        <span>Create release</span>
      </div>
      <div class="bottombar-right">
        <button class="btn ghost" id="btnCancel">Cancel</button>
        <!-- NEW: Create Release Split Button -->
        <div class="create-release-wrapper">
          <div class="create-release-btn-group disabled" id="createReleaseBtnGroup">
            <button class="btn-main" id="btnCreateRelease">Create Release</button>
            <div class="btn-sep"></div>
            <button class="btn-dropdown" id="btnCreateReleaseDropdown">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <!-- Create Release Popover -->
          <div class="create-release-popover" id="createReleasePopover">
            <!-- Option 1: Create Release -->
            <div class="gen-option" id="optCreateRelease">
              <div class="gen-opt-info">
                <span class="gen-opt-title">Create release</span>
                <span class="gen-opt-sub">Create release and upload to GitHub</span>
              </div>
              <div class="gen-opt-keys">
                <span class="kbd">⌘</span><span class="kbd">↵</span>
              </div>
            </div>
            <!-- Option 2: Create Release Draft -->
            <div class="gen-option" id="optCreateReleaseDraft">
              <div class="gen-opt-info">
                <span class="gen-opt-title">Create release draft</span>
                <span class="gen-opt-sub">Create release draft and upload to GitHub</span>
              </div>
              <div class="gen-opt-keys">
                <span class="kbd">⇧</span><span class="kbd">⌘</span><span class="kbd">↵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Overlay (Generate) -->
    <div class="overlay" id="generateOverlay" aria-hidden="true">
      <div class="overlayCard" role="dialog" aria-label="Progress indicator">
        <div class="overlayTitle" id="generateTitle">Generating release</div>
        <div class="progPanel">
          <div class="progList" id="generateList"></div>
        </div>
      </div>
    </div>

    <!-- Progress Overlay (Create) -->
    <div class="overlay" id="createOverlay" aria-hidden="true">
      <div class="overlayCard" role="dialog" aria-label="Progress indicator">
        <div class="overlayTitle" id="createTitle">Creating release</div>
        <div class="progPanel">
          <div class="progList" id="createList"></div>
        </div>
      </div>
    </div>
  </div>

    <!-- Tag Popover - OUTSIDE .window, positioned with JS -->
    <div class="popover" id="tagPopover">
      <div class="popover-header">
        <div class="popover-title">Version Tag</div>
      </div>
      <div class="popover-body">
        <div class="tab-switcher">
          <button class="tab-btn active" data-tab="semver">sem-ver</button>
          <button class="tab-btn" data-tab="hashver">hash-ver</button>
        </div>

        <!-- Sem-ver Tab -->
        <div class="tab-content active" id="tab-semver">
          <div class="row">
            <div class="form-group">
              <label class="form-label">Bump</label>
              <div class="segmented-selector" id="bumpSelector">
                <button class="segment-btn" data-value="patch">patch</button>
                <button class="segment-btn active" data-value="minor">minor</button>
                <button class="segment-btn" data-value="major">major</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Rollover</label>
              <div class="segmented-selector" id="rolloverSelector">
                <button class="segment-btn active" data-value="standard">Standard</button>
                <button class="segment-btn" data-value="progression">Progression</button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Tag</label>
            <input type="text" class="small-input" id="semverTag" value="v0.1.5">
          </div>
        </div>

        <!-- Hash-ver Tab -->
        <div class="tab-content" id="tab-hashver">
          <div class="row">
            <div class="form-group">
              <label class="form-label">SHA format</label>
              <div class="segmented-selector" id="shaSelector">
                <button class="segment-btn active" data-value="short">short</button>
                <button class="segment-btn" data-value="long">long</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Commit</label>
              <select class="select" id="commitPicker">
                <option value="a3f9c21" selected>a3f9c21 – Latest commit (HEAD)</option>
                <option value="b7e4d82">b7e4d82 – Fix auth session</option>
                <option value="c0ffee1">c0ffee1 – Update dependencies</option>
                <option value="d34db33">d34db33 – Refactor API client</option>
                <option value="e5f6a78">e5f6a78 – Add unit tests</option>
                <option value="f9b8c7d">f9b8c7d – Fix typo in readme</option>
                <option value="1a2b3c4">1a2b3c4 – Update CI config</option>
                <option value="2d3e4f5">2d3e4f5 – Improve error handling</option>
                <option value="3f4a5b6">3f4a5b6 – Add logging</option>
                <option value="4c5d6e7">4c5d6e7 – Initial release prep</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Tag</label>
            <input type="text" class="small-input" id="hashverTag" value="my-project@a3f9c21">
          </div>
        </div>
      </div>
    </div>

    <!-- File list context menu (only used for right-click on left file items) -->
    <div id="fileContextMenu" class="ctx-menu" aria-hidden="true">
      <button class="ctx-item" id="ctxSelectAll" type="button">Select all</button>
      <button class="ctx-item" id="ctxUnselectAll" type="button">Unselect all</button>
      <button class="ctx-item" id="ctxRemoveAll" type="button">Remove all</button>
      <hr style="margin: 6px 0; border: 0; border-top: 1px solid var(--border);">
      <button class="ctx-item" id="ctxRemoveItem" type="button">Remove item</button>
      <button class="ctx-item" id="ctxRevealItem" type="button">Reveal in file-browser</button>
    </div>

  <!-- Prompt Popup Modal -->
  <div class="prompt-overlay" id="promptOverlay" aria-hidden="true">
    <div class="prompt-popup" role="dialog" aria-label="Generate release text with options">
      <div class="prompt-popup-header">
        <h2 class="prompt-popup-title">Generate release text with options</h2>
        <p class="prompt-popup-subtitle">Provide additional context to generate more accurate release text</p>
      </div>
      <div class="prompt-popup-body">
        <textarea class="prompt-textarea" id="promptTextarea" placeholder="Add context: target audience, tone, features to emphasize, sections to include/exclude..."></textarea>
        <div class="prompt-model-selector">
          <label class="prompt-model-label">Model</label>
          <select class="prompt-model-select" id="promptModelSelect">
            <option value="gpt-4o" selected>GPT-4o (Default)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="llama-3-70b">Llama 3 70B</option>
          </select>
        </div>
      </div>
      <div class="prompt-popup-footer">
        <button class="btn ghost" id="promptCancelBtn">Cancel</button>
        <button class="btn primary" id="promptGenerateBtn">Generate</button>
      </div>
    </div>
  </div>

  <script>
    // === State ===
    let selectedTag = 'v0.1.5';
    let includeChecksum = true;
    let selectedFiles = [
      { name: 'apps/web/release-notes.md', size: 24 * 1024, date: '2026-12-24T14:23:45', sha: generateSHA(), content: '# Release Notes\\n\\n## v0.1.3\\n\\n### Features\\n- Added new authentication flow\\n- Improved user session management\\n\\n### Bug Fixes\\n- Fixed timeout issues\\n- Resolved memory leaks\\n\\n### Performance\\n- Optimized database queries\\n- Reduced bundle size by 15%' },
      { name: 'packages/ui/src/button.tsx', size: 12 * 1024, date: '2026-12-23T09:15:32', sha: generateSHA(), content: 'import React from "react";\\n\\nexport interface ButtonProps {\\n  variant?: "primary" | "secondary";\\n  size?: "sm" | "md" | "lg";\\n  children: React.ReactNode;\\n  onClick?: () => void;\\n}\\n\\nexport const Button: React.FC<ButtonProps> = ({\\n  variant = "primary",\\n  size = "md",\\n  children,\\n  onClick,\\n}) => {\\n  return (\\n    <button\\n      className={\`btn btn-\${variant} btn-\${size}\`}\\n      onClick={onClick}\\n    >\\n      {children}\\n    </button>\\n  );\\n};' },
      { name: 'dist/app-bundle.zip', size: 2048 * 1024, date: '2026-12-24T16:45:12', sha: generateSHA() },
      { name: 'apps/api/routes/auth.ts', size: 45 * 1024, date: '2026-12-23T11:30:28', sha: generateSHA(), content: 'import { Router } from "express";\\nimport { authenticateUser, createSession } from "../services/auth";\\n\\nconst router = Router();\\n\\nrouter.post("/login", async (req, res) => {\\n  const { email, password } = req.body;\\n  \\n  try {\\n    const user = await authenticateUser(email, password);\\n    const session = await createSession(user.id);\\n    \\n    res.json({\\n      success: true,\\n      token: session.token,\\n      user: {\\n        id: user.id,\\n        email: user.email,\\n        name: user.name,\\n      },\\n    });\\n  } catch (error) {\\n    res.status(401).json({\\n      success: false,\\n      error: "Invalid credentials",\\n    });\\n  }\\n});\\n\\nexport default router;' },
      { name: 'README.md', size: 2 * 1024, date: '2026-12-20T18:22:55', sha: generateSHA(), content: '# My Project\\n\\nA modern web application built with React and Node.js.\\n\\n## Features\\n\\n- Fast and responsive UI\\n- Secure authentication\\n- Real-time updates\\n\\n## Installation\\n\\n\`\`\`bash\\nnpm install\\nnpm run dev\\n\`\`\`\\n\\n## License\\n\\nMIT' },
      { name: 'turbo.json', size: 1 * 1024, date: '2026-12-18T08:45:33', sha: generateSHA(), content: '{\\n  "$schema": "https://turbo.build/schema.json",\\n  "pipeline": {\\n    "build": {\\n      "dependsOn": ["^build"],\\n      "outputs": ["dist/**", ".next/**"]\\n    },\\n    "dev": {\\n      "cache": false\\n    },\\n    "lint": {\\n      "outputs": []\\n    }\\n  }\\n}' }
    ];
    let currentSemver = { major: 0, minor: 1, patch: 5 };
    let selectedFileIndex = null;
    let selectedFileIndices = new Set();   // multi-select
    let selectionAnchorIndex = null;       // for Shift range selection
    let currentBump = 'minor';
    let currentRollover = 'standard';
    let currentShaFormat = 'short';

    // === Helpers ===
    function generateSHA() {
      return [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + 'b';
      if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + 'kb';
      return (bytes / (1024 * 1024)).toFixed(1) + 'mb';
    }

    function formatDateTime(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');
      return \`\${year}-\${month}-\${day} \${hour}:\${minute}:\${second}\`;
    }

    function getFileName(path) {
      const parts = path.split('/');
      return parts[parts.length - 1];
    }

    function updateFileStats() {
      const userFiles = selectedFiles.filter(f => !f.isGenerated);
      const totalSize = userFiles.reduce((sum, f) => sum + f.size, 0);
      const fileCount = selectedFiles.length;

      const fileStatsEl = document.getElementById('fileStats');
      if (selectedFiles.length === 0) {
        fileStatsEl.textContent = 'No files';
      } else {
        fileStatsEl.textContent = \`\${fileCount} file\${fileCount !== 1 ? 's' : ''} • \${formatSize(totalSize)}\`;
      }
    }

    async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isTextFile(filename) {
      const textExtensions = ['.md', '.txt', '.json', '.js', '.ts', '.tsx', '.jsx', '.css', '.html', '.xml', '.yml', '.yaml', '.toml', '.ini', '.conf', '.sh', '.bat'];
      return textExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }

    function generateChecksumFile() {
      const checksumContent = selectedFiles
        .filter(f => f.name !== 'checksum.txt')
        .map(f => \`\${f.sha}  \${f.name}\`)
        .join('\\n');

      return {
        name: 'checksum.txt',
        size: checksumContent.length,
        date: new Date().toISOString(),
        sha: generateSHA(),
        content: checksumContent,
        isGenerated: true
      };
    }

    function updateFileList() {
      selectedFiles = selectedFiles.filter(f => !f.isGenerated);
      if (includeChecksum) {
        selectedFiles.push(generateChecksumFile());
      }
      updateFileStats();
      renderFiles();
    }

    // === DOM Elements ===
    const topbar = document.getElementById('topbar');
    const tagPopover = document.getElementById('tagPopover');
    const btnEditTag = document.getElementById('btnEditTag');
    const overviewItem = document.getElementById('overviewItem');
    const overviewItemText = document.getElementById('overviewItemText');
    const checksumToggle = document.getElementById('checksumToggle');
    const checkbox = checksumToggle.querySelector('.checkbox');
    const btnGenerateText = document.getElementById('btnGenerateText');
    const btnCreateRelease = document.getElementById('btnCreateRelease');
    const createReleaseBtnGroup = document.getElementById('createReleaseBtnGroup');
    const btnCreateReleaseDropdown = document.getElementById('btnCreateReleaseDropdown');
    const createReleasePopover = document.getElementById('createReleasePopover');
    const optCreateRelease = document.getElementById('optCreateRelease');
    const optCreateReleaseDraft = document.getElementById('optCreateReleaseDraft');
    const btnPickFiles = document.getElementById('btnPickFiles');
    const filePicker = document.getElementById('filePicker');
    const fileList = document.getElementById('fileList');
    const releaseTitle = document.getElementById('releaseTitle');
    const releaseDesc = document.getElementById('releaseDesc');
    const generateOverlay = document.getElementById('generateOverlay');
    const createOverlay = document.getElementById('createOverlay');
    const createTitle = document.getElementById('createTitle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const semverTag = document.getElementById('semverTag');
    const commitPicker = document.getElementById('commitPicker');
    const hashverTag = document.getElementById('hashverTag');

    // --- File list context menu state ---
    const fileContextMenu = document.getElementById('fileContextMenu');
    const ctxRemoveItem = document.getElementById('ctxRemoveItem');
    const ctxRevealItem = document.getElementById('ctxRevealItem');

    let ctxFileIndex = null;

    // Segmented selectors
    const bumpSelector = document.getElementById('bumpSelector');
    const rolloverSelector = document.getElementById('rolloverSelector');
    const shaSelector = document.getElementById('shaSelector');

    // View elements
    const releaseDetailView = document.getElementById('releaseDetailView');
    const fileDetailView = document.getElementById('fileDetailView');
    const fileDetailName = document.getElementById('fileDetailName');
    const fileDetailMetaLine1 = document.getElementById('fileDetailMetaLine1');
    const fileDetailMetaLine2 = document.getElementById('fileDetailMetaLine2');
    const fileContentPreview = document.getElementById('fileContentPreview');
    const binaryFileView = document.getElementById('binaryFileView');
    const btnOpenIDETop = document.getElementById('btnOpenIDETop');
    const btnRevealFileTop = document.getElementById('btnRevealFileTop');

    // --- File list context menu functions ---
    function closeFileContextMenu() {
      fileContextMenu.classList.remove('show');
      fileContextMenu.setAttribute('aria-hidden', 'true');
      ctxFileIndex = null;
    }

    function openFileContextMenu(x, y, fileIndex) {
      ctxFileIndex = fileIndex;

      const f = selectedFiles[fileIndex];
      // Disable removing auto-generated items (e.g., checksum) since they'll be recreated
      ctxRemoveItem.disabled = !!(f && f.isGenerated);

      fileContextMenu.classList.add('show');
      fileContextMenu.setAttribute('aria-hidden', 'false');

      // Position + keep inside viewport
      const pad = 8;
      const rect = fileContextMenu.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - pad;
      const maxY = window.innerHeight - rect.height - pad;

      fileContextMenu.style.left = Math.max(pad, Math.min(x, maxX)) + 'px';
      fileContextMenu.style.top  = Math.max(pad, Math.min(y, maxY)) + 'px';
    }

    // --- Multi-select helper functions ---
    function isSelectableIndex(i) {
      const f = selectedFiles[i];
      return !!f && !f.isGenerated; // skip checksum.txt etc.
    }

    function syncFileSelectionUI() {
      fileList.querySelectorAll('.file-item').forEach((el) => {
        const idx = Number(el.dataset.index);
        el.dataset.selected = selectedFileIndices.has(idx) ? 'true' : 'false';
      });
    }

    function clearSelection() {
      selectedFileIndices.clear();
      selectionAnchorIndex = null;
      syncFileSelectionUI();
    }

    function setSingleSelection(i) {
      selectedFileIndices.clear();
      if (isSelectableIndex(i)) selectedFileIndices.add(i);
      selectionAnchorIndex = i;
      syncFileSelectionUI();
    }

    function selectRange(a, b) {
      selectedFileIndices.clear();
      const start = Math.min(a, b);
      const end = Math.max(a, b);
      for (let i = start; i <= end; i++) {
        if (isSelectableIndex(i)) selectedFileIndices.add(i);
      }
      syncFileSelectionUI();
    }

    function toggleSelection(i) {
      if (!isSelectableIndex(i)) return;
      if (selectedFileIndices.has(i)) selectedFileIndices.delete(i);
      else selectedFileIndices.add(i);
      selectionAnchorIndex = i;
      syncFileSelectionUI();
    }

    function selectAll() {
      selectedFileIndices.clear();
      for (let i = 0; i < selectedFiles.length; i++) {
        if (isSelectableIndex(i)) selectedFileIndices.add(i);
      }
      selectionAnchorIndex = selectedFileIndices.size ? Math.min(...selectedFileIndices) : null;
      syncFileSelectionUI();
    }

    function handleFileItemClick(e, index) {
      const isToggle = e.metaKey || e.ctrlKey; // Cmd on macOS, Ctrl on Windows/Linux
      const isRange = e.shiftKey;

      if (isRange && selectionAnchorIndex !== null) {
        selectRange(selectionAnchorIndex, index);
        // keep current detail view as-is (typical multi-select behavior)
      } else if (isToggle) {
        toggleSelection(index);
        if (selectedFileIndices.size === 0) showReleaseView();
      } else {
        setSingleSelection(index);
        showFileView(index); // plain click opens preview
      }
    }

    // Prompt Popup Elements
    const promptOverlay = document.getElementById('promptOverlay');
    const promptTextarea = document.getElementById('promptTextarea');
    const promptModelSelect = document.getElementById('promptModelSelect');
    const promptCancelBtn = document.getElementById('promptCancelBtn');
    const promptGenerateBtn = document.getElementById('promptGenerateBtn');

    // === View Switching ===
    function showReleaseView() {
      topbar.classList.remove('hidden');
      releaseDetailView.classList.remove('hidden');
      fileDetailView.classList.add('hidden');
      overviewItem.classList.add('selected');
      selectedFileIndex = null;

      clearSelection(); // <-- add this
    }

    function showFileView(fileIndex) {
      const file = selectedFiles[fileIndex];
      topbar.classList.add('hidden');
      releaseDetailView.classList.add('hidden');
      fileDetailView.classList.remove('hidden');
      overviewItem.classList.remove('selected');
      selectedFileIndex = fileIndex;

      const fileName = getFileName(file.name);
      fileDetailName.textContent = fileName;
      fileDetailMetaLine1.textContent = \`\${file.name} • \${formatDateTime(file.date)} • \${formatSize(file.size)}\`;
      fileDetailMetaLine2.textContent = \`SHA: \${file.sha}\`;

      if (isTextFile(file.name)) {
        fileContentPreview.classList.remove('hidden');
        binaryFileView.classList.add('hidden');
        fileContentPreview.textContent = file.content || 'No content available';
      } else {
        fileContentPreview.classList.add('hidden');
        binaryFileView.classList.remove('hidden');
      }
    }

    overviewItem.addEventListener('click', (e) => {
      if (e.target.closest('.btn')) return;
      showReleaseView();
    });

    btnOpenIDETop.addEventListener('click', () => {
      alert('This would open the file in your default IDE.');
    });

    btnRevealFileTop.addEventListener('click', () => {
      alert('This would open the system file browser to reveal the file.');
    });

    // === Popover Logic - WITH POSITIONING ===
    function positionPopover() {
      const btnRect = btnEditTag.getBoundingClientRect();
      tagPopover.style.left = btnRect.left + (btnRect.width / 2) - (tagPopover.offsetWidth / 2) + 'px';
      tagPopover.style.top = btnRect.bottom + 8 + 'px';
    }

    function openPopover() {
      tagPopover.classList.add('show');
      positionPopover();
    }

    function closePopover() {
      tagPopover.classList.remove('show');
    }

    btnEditTag.addEventListener('click', (e) => {
      e.stopPropagation();
      tagPopover.classList.contains('show') ? closePopover() : openPopover();
    });

    document.addEventListener('click', (e) => {
      if (!tagPopover.contains(e.target) && !btnEditTag.contains(e.target)) {
        closePopover();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'g' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        tagPopover.classList.contains('show') ? closePopover() : openPopover();
      }
      if (e.key === 'Escape') {
        closePopover();
        closePromptPopup();
        createReleasePopover.classList.remove('show');
      }
    });

    // Reposition on window resize
    window.addEventListener('resize', () => {
      if (tagPopover.classList.contains('show')) {
        positionPopover();
      }
    });

    // === Tab Switching ===
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        updateTag();
      });
    });

    // === Segmented Selector Logic ===
    function setupSegmentedSelector(selector, onChangeCallback) {
      const buttons = selector.querySelectorAll('.segment-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          onChangeCallback(btn.dataset.value);
        });
      });
    }

    setupSegmentedSelector(bumpSelector, (value) => {
      currentBump = value;
      updateSemverTag();
    });

    setupSegmentedSelector(rolloverSelector, (value) => {
      currentRollover = value;
    });

    setupSegmentedSelector(shaSelector, (value) => {
      currentShaFormat = value;
      updateHashverTag();
    });

    // === Semver Logic ===
    function updateSemverTag() {
      let { major, minor, patch } = { ...currentSemver };
      if (currentBump === 'major') { major++; minor = 0; patch = 0; }
      else if (currentBump === 'minor') { minor++; patch = 0; }
      else { patch++; }
      semverTag.value = \`v\${major}.\${minor}.\${patch}\`;
      updateTag();
    }

    // === Hashver Logic ===
    function updateHashverTag() {
      const commit = commitPicker.value;
      const prefix = 'my-project@';
      hashverTag.value = currentShaFormat === 'long' ? \`\${prefix}\${commit}\${commit}\${commit}\` : \`\${prefix}\${commit}\`;
      updateTag();
    }
    commitPicker.addEventListener('change', updateHashverTag);

    // === Update Tag (Auto-update) ===
    function updateTag() {
      const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
      selectedTag = activeTab === 'semver' ? semverTag.value : hashverTag.value;
      overviewItemText.textContent = 'Tag: ' + selectedTag;
      validateForm();
    }

    // Auto-update on manual input changes
    semverTag.addEventListener('input', updateTag);
    hashverTag.addEventListener('input', updateTag);

    // === Checksum Toggle ===
    checksumToggle.addEventListener('click', () => {
      includeChecksum = !includeChecksum;
      checkbox.dataset.checked = includeChecksum;
      updateFileList();
    });

    // === File Picker ===
    btnPickFiles.addEventListener('click', () => filePicker.click());
    filePicker.addEventListener('change', () => {
      const files = [...filePicker.files];
      files.forEach(f => {
        if (!selectedFiles.find(sf => sf.name === f.name)) {
          selectedFiles.push({
            name: f.name,
            size: f.size,
            date: new Date().toISOString(),
            sha: generateSHA(),
            content: ''
          });
        }
      });
      updateFileList();
      validateForm();
    });

    function renderFiles() {
      if (selectedFiles.length === 0) {
        fileList.innerHTML = '<div class="file-placeholder">No files selected</div>';
        return;
      }
      fileList.innerHTML = selectedFiles.map((f, i) => \`
        <div class="file-item" data-index="\${i}" data-selected="\${selectedFileIndices.has(i)}">
          <div class="file-item-row">
            <div class="file-name">\${getFileName(f.name)}</div>
            <div class="file-timestamp">\${formatDateTime(f.date)}</div>
          </div>
          <div class="file-item-row">
            <div class="file-path">\${f.name}</div>
            <div class="file-size">\${formatSize(f.size)}</div>
          </div>
        </div>
      \`).join('');

      fileList.querySelectorAll('.file-item').forEach((item) => {
        item.addEventListener('click', (e) => {
          const index = Number(item.dataset.index);
          handleFileItemClick(e, index);
        });
      });
    }

    // Right-click ONLY on the left file items (#fileList .file-item)
    fileList.addEventListener('contextmenu', (e) => {
      const item = e.target.closest('.file-item');
      if (!item || !fileList.contains(item)) return; // allow normal browser menu elsewhere

      e.preventDefault();
      e.stopPropagation();

      // Close other popovers if desired (optional)
      // genPopover.classList.remove('show');
      // tagPopover.classList.remove('show');
      // createReleasePopover.classList.remove('show');

      const index = Number(item.dataset.index);
      openFileContextMenu(e.clientX, e.clientY, index);
    });

    // Wire up new context menu actions
    ctxSelectAll.addEventListener('click', () => {
      selectAll();
      closeFileContextMenu();
    });

    ctxUnselectAll.addEventListener('click', () => {
      closeFileContextMenu();
      showReleaseView(); // clears selection too
    });

    ctxRemoveAll.addEventListener('click', () => {
      closeFileContextMenu();
      selectedFiles = [];
      showReleaseView();
      updateFileList();
      validateForm();
    });

    // Wire up new context menu actions
    ctxSelectAll.addEventListener('click', () => {
      selectAll();
      closeFileContextMenu();
    });

    ctxUnselectAll.addEventListener('click', () => {
      closeFileContextMenu();
      showReleaseView(); // clears selection too
    });

    ctxRemoveAll.addEventListener('click', () => {
      closeFileContextMenu();
      selectedFiles = [];
      showReleaseView();
      updateFileList();
      validateForm();
    });

    // Actions
    ctxRemoveItem.addEventListener('click', () => {
      if (ctxFileIndex == null) return;

      const f = selectedFiles[ctxFileIndex];
      if (f && f.isGenerated) return closeFileContextMenu();

      selectedFiles.splice(ctxFileIndex, 1);

      // If user removed the currently-opened file, return to release view
      if (selectedFileIndex === ctxFileIndex) {
        showReleaseView();
      }

      closeFileContextMenu();
      updateFileList();
      validateForm();
    });

    ctxRevealItem.addEventListener('click', () => {
      if (ctxFileIndex == null) return;

      const f = selectedFiles[ctxFileIndex];
      closeFileContextMenu();

      // Replace this with your real "reveal in file browser" integration if available
      alert(\`This would open the system file browser to reveal:\\n\${f?.name || '(unknown file)'}\`);
    });

    // Close on outside click / escape / scroll
    window.addEventListener('click', (e) => {
      if (!fileContextMenu.classList.contains('show')) return;
      if (!fileContextMenu.contains(e.target)) closeFileContextMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeFileContextMenu();
    });

    // If the file list scrolls, close it so it doesn't "float" incorrectly
    fileList.addEventListener('scroll', closeFileContextMenu);

    // === Form Validation ===
    function validateForm() {
      const hasTag = selectedTag !== null;
      const hasTitle = releaseTitle.value.trim() !== '';
      const hasDesc = releaseDesc.value.trim() !== '';
      const hasFiles = selectedFiles.filter(f => !f.isGenerated).length > 0;

      const isValid = hasTag && hasTitle && hasDesc && hasFiles;

      if (isValid) {
        createReleaseBtnGroup.classList.remove('disabled');
      } else {
        createReleaseBtnGroup.classList.add('disabled');
      }
    }
    releaseTitle.addEventListener('input', validateForm);
    releaseDesc.addEventListener('input', validateForm);

    // Helper for random delay within a range
    function randomDelay(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // === Progress Animation (from r2.html) ===
    const FLOWS = {
      generate: {
        title: 'Generating release',
        steps: [
          { label: 'Analyzing commits since last tag version', subs: ['queued', 'indexing commits', 'building diff map'] },
          { label: 'Analyzing merged PRs since last tag version', subs: ['queued', 'fetching PRs', 'grouping by scope'] },
          { label: 'Analyzing related issues', subs: ['queued', 'resolving refs', 'mapping labels'] },
          { label: 'Generating release change-log', subs: ['queued', 'drafting sections', 'formatting output'] }
        ]
      },
      create: {
        title: 'Creating release',
        steps: [
          { label: 'Generating final payload', subs: ['queued', 'serializing data', 'validating schema'] },
          { label: 'Checking Tag availability', subs: ['queued', 'querying remote'] },
          { label: 'Uploading artifacts', subs: ['queued', 'compressing files', 'streaming upload'] },
          { label: 'Finalizing release', subs: ['queued', 'writing metadata', 'publishing'] }
        ]
      },
      createDraft: {
        title: 'Creating release draft',
        steps: [
          { label: 'Generating draft payload', subs: ['queued', 'serializing data', 'validating schema'] },
          { label: 'Checking Tag availability', subs: ['queued', 'querying remote'] },
          { label: 'Uploading artifacts', subs: ['queued', 'compressing files', 'streaming upload'] },
          { label: 'Finalizing release draft', subs: ['queued', 'writing metadata', 'saving draft'] }
        ]
      }
    };

    function arcSvg() {
      return \`
        <div class="arcWrap" aria-hidden="true">
          <svg class="arc" viewBox="0 0 24 24">
            <circle class="track" cx="12" cy="12" r="9" pathLength="100" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"></circle>
            <circle class="bar" cx="12" cy="12" r="9" pathLength="100" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"></circle>
          </svg>
          <div class="arcDone">✓</div>
        </div>
      \`;
    }

    function showOverlay(flowKey) {
      const flow = FLOWS[flowKey];
      const overlay = flowKey === 'generate' ? generateOverlay : createOverlay;
      const listEl = flowKey === 'generate' ? document.getElementById('generateList') : document.getElementById('createList');
      const titleEl = flowKey === 'generate' ? document.getElementById('generateTitle') : document.getElementById('createTitle');

      // Update title for draft flow
      titleEl.textContent = flow.title;

      listEl.innerHTML = '';
      flow.steps.forEach((s, idx) => {
        const row = document.createElement('div');
        row.className = 'progItem';
        row.dataset.idx = String(idx);
        row.dataset.state = 'queued';
        row.innerHTML = \`
          \${arcSvg()}
          <div class="progLeft">\${s.label}</div>
          <div class="progRight">queued</div>
        \`;
        listEl.appendChild(row);
      });

      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
    }

    function hideOverlay(flowKey) {
      const overlay = flowKey === 'generate' ? generateOverlay : createOverlay;
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
    }

    async function runProgressFlow(flowKey) {
      const flow = FLOWS[flowKey]
      const useCreateOverlay = flowKey === 'create' || flowKey === 'createDraft'
      showOverlay(flowKey)

      const listEl = useCreateOverlay
        ? document.getElementById('createList')
        : document.getElementById('generateList')
      const rows = [...listEl.querySelectorAll('.progItem')]

      for (let i = 0; i < flow.steps.length; i++) {
        const step = flow.steps[i]
        const row = rows[i]
        const right = row.querySelector('.progRight')

        row.dataset.state = 'active'

        // Loop through sub-steps (skip index 0 which is 'queued')
        for (let s = 1; s < step.subs.length; s++) {
          right.textContent = step.subs[s] + '...'  // <-- Add ellipsis to show progress

          // WIDE variance: pick a random "type" for this sub-step
          const rand = Math.random()
          let delay
          if (rand < 0.25) {
            // 25% chance: very fast (80-180ms)
            delay = 80 + Math.floor(Math.random() * 100)
          } else if (rand < 0.55) {
            // 30% chance: medium (200-400ms)
            delay = 200 + Math.floor(Math.random() * 200)
          } else if (rand < 0.85) {
            // 30% chance: slow (400-700ms)
            delay = 400 + Math.floor(Math.random() * 300)
          } else {
            // 15% chance: very slow (700-1100ms)
            delay = 700 + Math.floor(Math.random() * 400)
          }

          await new Promise(r => setTimeout(r, delay))
        }

        // "done" stays without ellipsis
        right.textContent = 'done'
        await new Promise(r => setTimeout(r, 30))
        row.dataset.state = 'done'

        // Random pause before next step
        await new Promise(r => setTimeout(r, 60 + Math.floor(Math.random() * 140)))
      }

      // Final delay before closing
      await new Promise(r => setTimeout(r, 100 + Math.floor(Math.random() * 200)))
      hideOverlay(flowKey)
    }

    // === Generate Text Button ===
    btnGenerateText.addEventListener('click', async () => {
      await runProgressFlow('generate');
      releaseTitle.value = \`Release \${selectedTag}\`;
      releaseDesc.value = \`## What's Changed\\n\\n- Feature: Added new authentication flow\\n- Fix: Resolved session timeout issue\\n- Chore: Updated dependencies\\n\\n## Contributors\\n\\n@developer1, @developer2\\n\\n**Full Changelog**: https://github.com/org/repo/compare/v0.1.4...\${selectedTag}\`;
      validateForm();
    });

    // === Create Release Button (main button click) ===
    btnCreateRelease.addEventListener('click', async () => {
      if (createReleaseBtnGroup.classList.contains('disabled')) return;
      await runProgressFlow('create');
      alert('Release created successfully!');
    });

    // === Create Release Dropdown Button ===
    btnCreateReleaseDropdown.addEventListener('click', (e) => {
      if (createReleaseBtnGroup.classList.contains('disabled')) return;
      e.stopPropagation();
      const isVisible = createReleasePopover.classList.contains('show');
      // Close other popovers
      genPopover.classList.remove('show');
      tagPopover.classList.remove('show');

      if (isVisible) {
        createReleasePopover.classList.remove('show');
      } else {
        createReleasePopover.classList.add('show');
      }
    });

    // === Create Release Option Click ===
    optCreateRelease.addEventListener('click', async () => {
      createReleasePopover.classList.remove('show');
      await runProgressFlow('create');
      alert('Release created successfully!');
    });

    // === Create Release Draft Option Click ===
    optCreateReleaseDraft.addEventListener('click', async () => {
      createReleasePopover.classList.remove('show');
      await runProgressFlow('createDraft');
      alert('Release draft created successfully!');
    });

    // Close create release popover on outside click
    window.addEventListener('click', (e) => {
      if (!createReleasePopover.contains(e.target) && !btnCreateReleaseDropdown.contains(e.target)) {
        createReleasePopover.classList.remove('show');
      }
    });

    // === Cancel Button ===
    document.getElementById('btnCancel').addEventListener('click', () => {
      if (confirm('Are you sure you want to cancel?')) {
        selectedTag = 'v0.1.5';
        currentSemver = { major: 0, minor: 1, patch: 5 };
        overviewItemText.textContent = 'Tag: ' + selectedTag;
        releaseTitle.value = '';
        releaseDesc.value = '';
        showReleaseView();
        validateForm();
      }
    });

    // Initialize
    updateFileList();
    validateForm();

    // === Generate Options Logic ===
    const btnGenerateOptions = document.getElementById('btnGenerateOptions');
    const genPopover = document.getElementById('genPopover');
    const optGenStandard = document.getElementById('optGenStandard');
    const optGenOptions = document.getElementById('optGenOptions');

    // Toggle Popover
    btnGenerateOptions.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate close
      // Close other popovers if any (like tagPopover)
      document.querySelectorAll('.popover').forEach(p => p.classList.remove('show'));

      const isVisible = genPopover.classList.contains('show');
      if (isVisible) {
        genPopover.classList.remove('show');
      } else {
        genPopover.classList.add('show');
      }
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
      if (!genPopover.contains(e.target) && !btnGenerateOptions.contains(e.target)) {
        genPopover.classList.remove('show');
      }
    });

    // Option 1: Standard
    optGenStandard.addEventListener('click', () => {
      genPopover.classList.remove('show');
      // Trigger original action
      document.getElementById('btnGenerateText').click();
    });

    // Option 2: With Options - Opens Prompt Popup
    optGenOptions.addEventListener('click', () => {
      genPopover.classList.remove('show');
      openPromptPopup();
    });

    // === Prompt Popup Logic ===
    function openPromptPopup() {
      promptOverlay.classList.add('show');
      promptOverlay.setAttribute('aria-hidden', 'false');
      promptTextarea.value = '';
      // Focus the textarea automatically
      setTimeout(() => {
        promptTextarea.focus();
      }, 50);
    }

    function closePromptPopup() {
      promptOverlay.classList.remove('show');
      promptOverlay.setAttribute('aria-hidden', 'true');
    }

    // Cancel button closes popup
    promptCancelBtn.addEventListener('click', () => {
      closePromptPopup();
    });

    // Generate button triggers generation with prompt
    promptGenerateBtn.addEventListener('click', async () => {
      const userPrompt = promptTextarea.value.trim();
      const selectedModel = promptModelSelect.value;
      closePromptPopup();

      // Run the generation flow
      await runProgressFlow('generate');

      // Update title and description (simulated with prompt context)
      releaseTitle.value = \`Release \${selectedTag}\`;
      let descContent = \`## What's Changed\\n\\n- Feature: Added new authentication flow\\n- Fix: Resolved session timeout issue\\n- Chore: Updated dependencies\\n\\n## Contributors\\n\\n@developer1, @developer2\\n\\n**Full Changelog**: https://github.com/org/repo/compare/v0.1.4...\${selectedTag}\`;

      if (userPrompt) {
        descContent = \`## What's Changed\\n\\n*Generated with custom context: "\${userPrompt.substring(0, 50)}\${userPrompt.length > 50 ? '...' : ''}"*\\n*Model: \${selectedModel}*\\n\\n- Feature: Added new authentication flow\\n- Fix: Resolved session timeout issue\\n- Chore: Updated dependencies\\n\\n## Contributors\\n\\n@developer1, @developer2\\n\\n**Full Changelog**: https://github.com/org/repo/compare/v0.1.4...\${selectedTag}\`;
      }

      releaseDesc.value = descContent;
      validateForm();
    });

    // Close popup when clicking outside
    promptOverlay.addEventListener('click', (e) => {
      if (e.target === promptOverlay) {
        closePromptPopup();
      }
    });

    // Shortcuts
    document.addEventListener('keydown', (e) => {
      // CMD (Meta) or CTRL
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyG') {
        e.preventDefault();
        e.stopPropagation();

        if (e.shiftKey) {
          // Shift + Cmd + G - Opens prompt popup
          const btn = document.getElementById('optGenOptions');
          btn.style.background = 'var(--z-600)';
          setTimeout(() => btn.style.background = '', 200);
          openPromptPopup();
        } else {
          // Cmd + G
          const btn = document.getElementById('optGenStandard');
           // trigger 'Standard' visual feedback
          if(genPopover.classList.contains('show')) {
             btn.style.background = 'var(--z-600)';
             setTimeout(() => btn.style.background = '', 200);
             optGenStandard.click();
          } else {
             // Direct trigger if menu closed?
             // The user said "Shortcut for 'Generate release text' is CMD+G"
             // This usually implies global shortcut.
             document.getElementById('btnGenerateText').click();
          }
        }
      }

      // CMD + Enter for Create Release
      if ((e.metaKey || e.ctrlKey) && e.code === 'Enter') {
        if (createReleaseBtnGroup.classList.contains('disabled')) return;

        if (e.shiftKey) {
          // Shift + CMD + Enter - Create Release Draft
          e.preventDefault();
          e.stopPropagation();
          createReleasePopover.classList.remove('show');
          optCreateReleaseDraft.click();
        } else {
          // CMD + Enter - Create Release
          e.preventDefault();
          e.stopPropagation();
          createReleasePopover.classList.remove('show');
          optCreateRelease.click();
        }
      }
    });

  </script>
</body>
</html>
`;var c={pr:a,commit:i,release:n},p=document.querySelector("#viewFrame"),o=Array.from(document.querySelectorAll("[data-view]"));function m(e){for(let t of o)t.classList.toggle("active",t.dataset.view===e)}function r(e){m(e),p.srcdoc=c[e]}for(let e of o)e.addEventListener("click",()=>r(e.dataset.view));r("pr");
