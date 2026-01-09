import { FileItem } from '../../types'
import { formatSize } from '../../utils/format'
import { OverviewSection } from './OverviewSection'
import { FileList } from './FileList'

interface SidebarProps {
  selectedTag: string
  isOverviewSelected: boolean
  files: FileItem[]
  selectedIndices: Set<number>
  totalUserSize: number
  onOverviewClick: (e: React.MouseEvent) => void
  onEditTagClick: (e: React.MouseEvent) => void
  onChooseFiles: () => void
  onFileClick: (e: React.MouseEvent, index: number) => void
  onFileContextMenu: (e: React.MouseEvent, index: number) => void
  onScroll: () => void
  editTagRef: React.RefObject<HTMLButtonElement>
}

export function Sidebar({
  selectedTag,
  isOverviewSelected,
  files,
  selectedIndices,
  totalUserSize,
  onOverviewClick,
  onEditTagClick,
  onChooseFiles,
  onFileClick,
  onFileContextMenu,
  onScroll,
  editTagRef,
}: SidebarProps) {
  const fileStats = files.length === 0 ? 'No files' : `${files.length} files • ${formatSize(totalUserSize)}`

  return (
    <div className="sidebar">
      <OverviewSection
        selectedTag={selectedTag}
        isSelected={isOverviewSelected}
        onClick={onOverviewClick}
        onEditTagClick={onEditTagClick}
        editTagRef={editTagRef}
      />
      <div className="files-section">
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <div className="sidebar-title">Release assets</div>
            <div className="sidebar-subtitle">{fileStats}</div>
          </div>
          <button className="btn small" onClick={onChooseFiles}>Choose files</button>
        </div>
        <FileList
          files={files}
          selectedIndices={selectedIndices}
          onItemClick={onFileClick}
          onItemContextMenu={onFileContextMenu}
          onScroll={onScroll}
        />
        <div className="sidebar-footer">Right click to show more options</div>
      </div>
    </div>
  )
}
