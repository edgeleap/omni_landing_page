export function StatusBar(): string {
  return `<div class="status-bar">
      <div class="traffic-lights" aria-hidden="true">
        <div class="traffic-light red"></div>
        <div class="traffic-light yellow"></div>
        <div class="traffic-light green"></div>
      </div>
      <div class="status-title">Omni — Commit</div>
      <div class="status-spacer"></div>
    </div>`;
}
