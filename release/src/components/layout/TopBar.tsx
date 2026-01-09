import { Checkbox } from '../ui'

interface TopBarProps {
  hidden: boolean
  includeChecksum: boolean
  onChecksumChange: () => void
  onGenerateClick: () => void
  onGenerateOptionsClick: (e: React.MouseEvent) => void
  popoverContent: React.ReactNode
}

export function TopBar({ hidden, includeChecksum, onChecksumChange, onGenerateClick, onGenerateOptionsClick, popoverContent }: TopBarProps) {
  return (
    <div className={`topbar${hidden ? ' hidden' : ''}`}>
      <div className="topbar-left">
        <Checkbox checked={includeChecksum} onChange={onChecksumChange} label="Include checksum" />
      </div>
      <div className="topbar-right">
        <div className="btn-group-wrapper">
          <div className="btn-group">
            <button className="btn" onClick={onGenerateClick}>Generate release text</button>
            <div className="btn-group-sep"></div>
            <button className="btn" onClick={onGenerateOptionsClick} aria-label="Generate menu">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          {popoverContent}
        </div>
      </div>
    </div>
  )
}
