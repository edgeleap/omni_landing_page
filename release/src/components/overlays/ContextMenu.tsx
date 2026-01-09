import { FileItem } from '../../types'

interface ContextMenuProps {
  isOpen: boolean
  position: { x: number; y: number } | null
  fileIndex: number | null
  files: FileItem[]
  onSelectAll: () => void
  onUnselectAll: () => void
  onRemoveAll: () => void
  onRemoveItem: () => void
  onRevealItem: () => void
}

export function ContextMenu({ isOpen, position, fileIndex, files, onSelectAll, onUnselectAll, onRemoveAll, onRemoveItem, onRevealItem }: ContextMenuProps) {
  const isGenerated = fileIndex !== null && files[fileIndex]?.isGenerated

  return (
    <div
      className={`ctx-menu${isOpen ? ' show' : ''}`}
      aria-hidden={!isOpen}
      style={{ left: position?.x ?? 0, top: position?.y ?? 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="ctx-item" type="button" onClick={onSelectAll}>Select all</button>
      <button className="ctx-item" type="button" onClick={onUnselectAll}>Unselect all</button>
      <button className="ctx-item" type="button" onClick={onRemoveAll}>Remove all</button>
      <hr style={{ margin: '6px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <button className="ctx-item" type="button" disabled={!!isGenerated} onClick={onRemoveItem}>Remove item</button>
      <button className="ctx-item" type="button" onClick={onRevealItem}>Reveal in file-browser</button>
    </div>
  )
}
