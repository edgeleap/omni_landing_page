interface OverviewSectionProps {
  selectedTag: string
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
  onEditTagClick: (e: React.MouseEvent) => void
  editTagRef: React.RefObject<HTMLButtonElement>
}

export function OverviewSection({ selectedTag, isSelected, onClick, onEditTagClick, editTagRef }: OverviewSectionProps) {
  return (
    <div className="overview-section">
      <div className="overview-header">
        <div className="overview-title">Release overview</div>
      </div>
      <div className={`overview-item${isSelected ? ' selected' : ''}`} onClick={onClick}>
        <div className="overview-item-left">
          <div className="overview-item-text">Tag: {selectedTag}</div>
        </div>
        <button className="btn small" ref={editTagRef} onClick={onEditTagClick}>
          Edit tag
        </button>
      </div>
    </div>
  )
}
