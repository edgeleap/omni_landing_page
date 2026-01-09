import { SplitButton } from '../ui'

interface BottomBarProps {
  createEnabled: boolean
  onCancel: () => void
  onCreateRelease: () => void
  onDropdownClick: (e: React.MouseEvent) => void
  popoverContent: React.ReactNode
}

export function BottomBar({ createEnabled, onCancel, onCreateRelease, onDropdownClick, popoverContent }: BottomBarProps) {
  return (
    <div className="bottombar">
      <div className="bottombar-left">
        <span>Keyboard:</span>
        <span className="kbd">⌘</span><span className="kbd">G</span>
        <span>Toggle tag popover</span>
        <span className="kbd">⎋</span>
        <span>Cancel</span>
        <span className="kbd">⌘</span><span className="kbd">↵</span>
        <span>Create release</span>
      </div>
      <div className="bottombar-right">
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
        <SplitButton
          label="Create Release"
          disabled={!createEnabled}
          onClick={onCreateRelease}
          onDropdownClick={onDropdownClick}
        >
          {popoverContent}
        </SplitButton>
      </div>
    </div>
  )
}
