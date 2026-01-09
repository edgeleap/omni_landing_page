import { FileItem } from '../../types'
import { formatDateTime, formatSize, getFileName } from '../../utils/format'

interface FileItemRowProps {
  file: FileItem
  index: number
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
  onContextMenu: (e: React.MouseEvent) => void
}

export function FileItemRow({ file, index, isSelected, onClick, onContextMenu }: FileItemRowProps) {
  return (
    <div
      className="file-item"
      data-index={index}
      data-selected={isSelected ? 'true' : 'false'}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <div className="file-item-row">
        <div className="file-name">{getFileName(file.name)}</div>
        <div className="file-timestamp">{formatDateTime(file.date)}</div>
      </div>
      <div className="file-item-row">
        <div className="file-path">{file.name}</div>
        <div className="file-size">{formatSize(file.size)}</div>
      </div>
    </div>
  )
}
