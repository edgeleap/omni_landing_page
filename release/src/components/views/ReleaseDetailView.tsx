interface ReleaseDetailViewProps {
  hidden: boolean
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export function ReleaseDetailView({ hidden, title, description, onTitleChange, onDescriptionChange }: ReleaseDetailViewProps) {
  return (
    <div className={`release-detail-view${hidden ? ' hidden' : ''}`}>
      <div className="form-group">
        <label className="form-label">Release Title</label>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="(Generate to fill) e.g., Authentication Hotfix..."
        />
      </div>
      <div className="form-group flex-fill">
        <label className="form-label">Release Description</label>
        <textarea
          className="input"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="(Generate to fill) e.g., What's new + Fixes + Known issues (if any)..."
        />
      </div>
    </div>
  )
}
