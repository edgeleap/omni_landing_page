import { FileItem } from '../../types'
import { formatDateTime, formatSize, getFileName, isTextFile } from '../../utils/format'

interface FileDetailViewProps {
  hidden: boolean
  file: FileItem | null
}

export function FileDetailView({ hidden, file }: FileDetailViewProps) {
  const showTextPreview = file ? isTextFile(file.name) : false

  return (
    <div className={`file-detail-view${hidden ? ' hidden' : ''}`}>
      <div className="file-detail-header">
        <div className="file-detail-header-top">
          <div className="file-detail-name">{file ? getFileName(file.name) : 'filename.txt'}</div>
          <div className="file-detail-actions">
            <button className="btn small" onClick={() => alert('This would open the file in your default IDE.')}>Open in IDE</button>
            <button className="btn small" onClick={() => alert('This would reveal the file in your system file browser.')}>Reveal in file-browser</button>
          </div>
        </div>
        <div className="file-detail-meta">
          <div>{file ? `${file.name} • ${formatDateTime(file.date)} • ${formatSize(file.size)}` : ''}</div>
          <div>{file ? `SHA: ${file.sha}` : ''}</div>
        </div>
      </div>
      <div className={`file-content-preview${showTextPreview ? '' : ' hidden'}`}>
        {file?.content || 'No content available'}
      </div>
      <div className={`binary-file-view${!showTextPreview ? '' : ' hidden'}`}>
        <div className="binary-file-message">This is a binary file and cannot be previewed</div>
      </div>
    </div>
  )
}
