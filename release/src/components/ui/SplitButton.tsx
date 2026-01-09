import { ReactNode } from 'react'

interface SplitButtonProps {
  label: string
  disabled?: boolean
  onClick: () => void
  onDropdownClick: (e: React.MouseEvent) => void
  children?: ReactNode
}

export function SplitButton({ label, disabled, onClick, onDropdownClick, children }: SplitButtonProps) {
  return (
    <div className="create-release-wrapper">
      <div className={`create-release-btn-group${disabled ? ' disabled' : ''}`}>
        <button className="btn-main" onClick={onClick}>{label}</button>
        <div className="btn-sep"></div>
        <button className="btn-dropdown" onClick={onDropdownClick} aria-label={`${label} menu`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      {children}
    </div>
  )
}
