interface CreatePopoverProps {
  isOpen: boolean
  onCreateRelease: () => void
  onCreateDraft: () => void
}

export function CreatePopover({ isOpen, onCreateRelease, onCreateDraft }: CreatePopoverProps) {
  return (
    <div className={`create-release-popover${isOpen ? ' show' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div className="gen-option" onClick={onCreateRelease}>
        <div className="gen-opt-info">
          <span className="gen-opt-title">Create release</span>
          <span className="gen-opt-sub">Create release and upload to GitHub</span>
        </div>
        <div className="gen-opt-keys"><span className="kbd">⌘</span><span className="kbd">↵</span></div>
      </div>
      <div className="gen-option" onClick={onCreateDraft}>
        <div className="gen-opt-info">
          <span className="gen-opt-title">Create release draft</span>
          <span className="gen-opt-sub">Create release draft and upload to GitHub</span>
        </div>
        <div className="gen-opt-keys"><span className="kbd">⌘</span><span className="kbd">⇧</span><span className="kbd">↵</span></div>
      </div>
    </div>
  )
}
