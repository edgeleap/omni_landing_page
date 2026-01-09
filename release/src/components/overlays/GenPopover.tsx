interface GenPopoverProps {
  isOpen: boolean
  onGenerate: () => void
  onGenerateWithOptions: () => void
}

export function GenPopover({ isOpen, onGenerate, onGenerateWithOptions }: GenPopoverProps) {
  return (
    <div className={`gen-popover${isOpen ? ' show' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div className="gen-option" onClick={onGenerate}>
        <div className="gen-opt-info">
          <span className="gen-opt-title">Generate release text</span>
          <span className="gen-opt-sub">Generate release text based on the current files and commits since last release</span>
        </div>
        <div className="gen-opt-keys"><span className="kbd">⌘</span><span className="kbd">G</span></div>
      </div>
      <div className="gen-option" onClick={onGenerateWithOptions}>
        <div className="gen-opt-info">
          <span className="gen-opt-title">Generate release text with options</span>
          <span className="gen-opt-sub">Generate release text based on the current files, commits since last release and user prompt</span>
        </div>
        <div className="gen-opt-keys"><span className="kbd">⌘</span><span className="kbd">⇧</span><span className="kbd">G</span></div>
      </div>
    </div>
  )
}
