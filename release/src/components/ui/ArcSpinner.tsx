export function ArcSpinner() {
  return (
    <div className="arcWrap" aria-hidden="true">
      <svg className="arc" viewBox="0 0 24 24">
        <circle className="track" cx="12" cy="12" r="9" pathLength="100" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle className="bar" cx="12" cy="12" r="9" pathLength="100" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="arcDone">✓</div>
    </div>
  )
}
