import { FileItem } from '../../types'
import { FileItemRow } from './FileItem'

interface FileListProps {
  files: FileItem[]
  selectedIndices: Set<number>
  onItemClick: (e: React.MouseEvent, index: number) => void
  onItemContextMenu: (e: React.MouseEvent, index: number) => void
  onScroll: () => void
}

export function FileList({ files, selectedIndices, onItemClick, onItemContextMenu, onScroll }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="file-list-container">
        <div className="file-placeholder">No files selected</div>
      </div>
    )
  }

  return (
    <div className="file-list-container" onScroll={onScroll}>
      {files.map((file, i) => (
        <FileItemRow
          key={file.name}
          file={file}
          index={i}
          isSelected={selectedIndices.has(i)}
          onClick={(e) => onItemClick(e, i)}
          onContextMenu={(e) => onItemContextMenu(e, i)}
        />
      ))}
    </div>
  )
}
