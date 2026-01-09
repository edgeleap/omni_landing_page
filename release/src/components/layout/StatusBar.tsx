export function StatusBar() {
  return (
    <div className="statusbar">
      <div className="traffic" aria-hidden="true">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
      </div>
      <div className="statusbar-title">Omni – Release</div>
    </div>
  )
}
