import { useEffect, useMemo, useRef, useState } from 'react'
import { FileItem, FlowKey } from './types'
import { getInitialFiles, createChecksumFile } from './data/files'
import { useFileSelection } from './hooks/useFileSelection'
import { useProgressFlow } from './hooks/useProgressFlow'
import { StatusBar, BottomBar, TopBar } from './components/layout'
import { Sidebar } from './components/sidebar'
import { ReleaseDetailView, FileDetailView } from './components/views'
import { ProgressOverlay, TagPopover, GenPopover, CreatePopover, PromptPopup, ContextMenu } from './components/overlays'

export default function App() {
  // Core state
  const [selectedTag, setSelectedTag] = useState('v0.1.5')
  const [includeChecksum, setIncludeChecksum] = useState(true)
  const [releaseTitle, setReleaseTitle] = useState('')
  const [releaseDesc, setReleaseDesc] = useState('')
  const [promptText, setPromptText] = useState('')
  const [promptModel, setPromptModel] = useState('gpt-4o')

  // Files
  const baseFiles = useMemo<FileItem[]>(() => getInitialFiles(), [])
  const checksumFile = useMemo(() => createChecksumFile(baseFiles), [baseFiles])
  const selectedFiles = useMemo(() => {
    const files = [...baseFiles]
    if (includeChecksum) files.push(checksumFile)
    return files
  }, [baseFiles, checksumFile, includeChecksum])

  // Popover states
  const [genPopoverOpen, setGenPopoverOpen] = useState(false)
  const [createPopoverOpen, setCreatePopoverOpen] = useState(false)
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false)
  const [promptPopupOpen, setPromptPopupOpen] = useState(false)

  // Context menu
  const [ctxMenuOpen, setCtxMenuOpen] = useState(false)
  const [ctxPos, setCtxPos] = useState<{ x: number; y: number } | null>(null)
  const [ctxFileIndex, setCtxFileIndex] = useState<number | null>(null)

  // Tag popover state
  const [activeTab, setActiveTab] = useState<'semver' | 'hashver'>('semver')
  const [bump, setBump] = useState<'patch' | 'minor' | 'major'>('patch')
  const [rollover, setRollover] = useState<'standard' | 'progression'>('standard')
  const [shaFormat, setShaFormat] = useState<'short' | 'long'>('short')
  const [commit, setCommit] = useState('a3f9c21')
  const [semverTag, setSemverTag] = useState('v0.1.5')
  const [hashverTag, setHashverTag] = useState('my-project-a3f9c21')

  // Refs
  const btnEditTagRef = useRef<HTMLButtonElement>(null)
  const tagPopoverRef = useRef<HTMLDivElement>(null)
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Custom hooks
  const fileSelection = useFileSelection(selectedFiles)
  const progressFlow = useProgressFlow()

  // Computed
  const topbarHidden = fileSelection.selectedFileIndex !== null
  const userFilesCount = selectedFiles.filter((f) => !f.isGenerated).length
  const totalUserSize = selectedFiles.filter((f) => !f.isGenerated).reduce((sum, f) => sum + f.size, 0)
  const createEnabled = Boolean(selectedTag.trim()) && Boolean(releaseTitle.trim()) && Boolean(releaseDesc.trim()) && userFilesCount > 0
  const fileDetail = fileSelection.selectedFileIndex !== null ? selectedFiles[fileSelection.selectedFileIndex] : null

  // Close all popovers
  const closeAllPopovers = () => {
    setGenPopoverOpen(false)
    setCreatePopoverOpen(false)
    setTagPopoverOpen(false)
    setCtxMenuOpen(false)
  }

  // Position tag popover
  const positionTagPopover = () => {
    const btn = btnEditTagRef.current
    const pop = tagPopoverRef.current
    if (!btn || !pop) return
    const rect = btn.getBoundingClientRect()
    pop.style.left = `${rect.left + rect.width / 2 - pop.offsetWidth / 2}px`
    pop.style.top = `${rect.bottom + 8}px`
  }

  useEffect(() => {
    if (tagPopoverOpen) positionTagPopover()
  }, [tagPopoverOpen])

  useEffect(() => {
    const onResize = () => { if (tagPopoverOpen) positionTagPopover() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [tagPopoverOpen])

  // Click outside handler
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (tagPopoverOpen && tagPopoverRef.current && btnEditTagRef.current) {
        if (!tagPopoverRef.current.contains(target) && !btnEditTagRef.current.contains(target)) {
          setTagPopoverOpen(false)
        }
      }
      if (genPopoverOpen && !target?.closest('#genPopover') && !target?.closest('#btnGenerateOptions')) {
        setGenPopoverOpen(false)
      }
      if (createPopoverOpen && !target?.closest('#createReleasePopover') && !target?.closest('#btnCreateReleaseDropdown')) {
        setCreatePopoverOpen(false)
      }
      if (ctxMenuOpen && !target?.closest('.ctx-menu')) {
        setCtxMenuOpen(false)
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [tagPopoverOpen, genPopoverOpen, createPopoverOpen, ctxMenuOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllPopovers()
        setPromptPopupOpen(false)
        progressFlow.closeOverlay()
      }
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyG') {
        e.preventDefault()
        if (e.shiftKey) {
          setPromptPopupOpen(true)
          setTimeout(() => promptTextareaRef.current?.focus(), 50)
        } else {
          handleGenerate()
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.code === 'Enter') {
        e.preventDefault()
        if (!createEnabled) return
        e.shiftKey ? handleCreateDraft() : handleCreateRelease()
      }
      if (e.key.toLowerCase() === 'g') {
        const el = document.activeElement
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')) return
        e.preventDefault()
        setTagPopoverOpen((v) => !v)
        setGenPopoverOpen(false)
        setCreatePopoverOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [createEnabled])

  // Tag sync
  useEffect(() => {
    if (activeTab === 'semver') setSelectedTag(semverTag)
  }, [semverTag, activeTab])

  useEffect(() => {
    const prefix = 'my-project-'
    const newTag = shaFormat === 'long' ? `${prefix}${commit}${commit}` : `${prefix}${commit}`
    setHashverTag(newTag)
    if (activeTab === 'hashver') setSelectedTag(newTag)
  }, [shaFormat, commit, activeTab])

  // Handlers
  const handleGenerate = async () => {
    closeAllPopovers()
    setPromptPopupOpen(false)
    await progressFlow.runProgressFlow('generate')
    setReleaseTitle(`Release ${selectedTag}`)
    const baseDesc = `What's Changed\n- Feature: Added new authentication flow\n- Fix: Resolved session timeout issue\n- Chore: Updated dependencies\n\nContributors: @developer1, @developer2`
    if (promptText) {
      setReleaseDesc(`${baseDesc}\n\nGenerated with custom context: "${promptText.substring(0, 50)}${promptText.length > 50 ? '...' : ''}"\nModel: ${promptModel}`)
    } else {
      setReleaseDesc(`${baseDesc}\nChangelog: https://github.com/org/repo/compare/v0.1.4...${selectedTag}`)
    }
  }

  const handleCreateRelease = async () => {
    closeAllPopovers()
    await progressFlow.runProgressFlow('create')
    alert('Release created successfully!')
  }

  const handleCreateDraft = async () => {
    closeAllPopovers()
    await progressFlow.runProgressFlow('createDraft')
    alert('Release draft created successfully!')
  }

  const handleFileClick = (e: React.MouseEvent, index: number) => {
    const isToggle = e.metaKey || e.ctrlKey
    const isRange = e.shiftKey
    if (isRange && fileSelection.selectionAnchorIndex !== null) {
      fileSelection.selectRange(fileSelection.selectionAnchorIndex, index)
      fileSelection.showReleaseView()
      return
    }
    if (isToggle) {
      fileSelection.toggleSelection(index)
      return
    }
    fileSelection.setSingleSelection(index)
    fileSelection.showFileView(index)
  }

  const handleFileContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    closeAllPopovers()
    setCtxFileIndex(index)
    const pad = 8, width = 220, height = 200
    const maxX = window.innerWidth - width - pad
    const maxY = window.innerHeight - height - pad
    setCtxPos({ x: Math.max(pad, Math.min(e.clientX, maxX)), y: Math.max(pad, Math.min(e.clientY, maxY)) })
    setCtxMenuOpen(true)
  }

  return (
    <>
      <div className="window" role="application" aria-label="Release window">
        <StatusBar />
        <div className="main-body">
          <Sidebar
            selectedTag={selectedTag}
            isOverviewSelected={fileSelection.selectedFileIndex === null}
            files={selectedFiles}
            selectedIndices={fileSelection.selectedFileIndices}
            totalUserSize={totalUserSize}
            onOverviewClick={(e) => { if (!(e.target as HTMLElement).closest('.btn')) fileSelection.showReleaseView() }}
            onEditTagClick={(e) => { e.stopPropagation(); setTagPopoverOpen((v) => !v); setGenPopoverOpen(false); setCreatePopoverOpen(false) }}
            onChooseFiles={() => alert('Choose files UI not wired in this React port yet.')}
            onFileClick={handleFileClick}
            onFileContextMenu={handleFileContextMenu}
            onScroll={() => setCtxMenuOpen(false)}
            editTagRef={btnEditTagRef}
          />
          <div className="detail-view">
            <TopBar
              hidden={topbarHidden}
              includeChecksum={includeChecksum}
              onChecksumChange={() => setIncludeChecksum((v) => !v)}
              onGenerateClick={handleGenerate}
              onGenerateOptionsClick={(e) => { e.stopPropagation(); setTagPopoverOpen(false); setCreatePopoverOpen(false); setGenPopoverOpen((v) => !v) }}
              popoverContent={
                <GenPopover
                  isOpen={genPopoverOpen}
                  onGenerate={handleGenerate}
                  onGenerateWithOptions={() => { setGenPopoverOpen(false); setPromptPopupOpen(true); setTimeout(() => promptTextareaRef.current?.focus(), 50) }}
                />
              }
            />
            <div className="detail-content">
              <ReleaseDetailView
                hidden={topbarHidden}
                title={releaseTitle}
                description={releaseDesc}
                onTitleChange={setReleaseTitle}
                onDescriptionChange={setReleaseDesc}
              />
              <FileDetailView hidden={!topbarHidden} file={fileDetail} />
            </div>
          </div>
        </div>
        <BottomBar
          createEnabled={createEnabled}
          onCancel={() => { if (confirm('Are you sure you want to cancel?')) fileSelection.showReleaseView() }}
          onCreateRelease={handleCreateRelease}
          onDropdownClick={(e) => { e.stopPropagation(); if (!createEnabled) return; setGenPopoverOpen(false); setTagPopoverOpen(false); setCreatePopoverOpen((v) => !v) }}
          popoverContent={
            <CreatePopover
              isOpen={createPopoverOpen}
              onCreateRelease={handleCreateRelease}
              onCreateDraft={handleCreateDraft}
            />
          }
        />
      </div>

      <ProgressOverlay flowKey={progressFlow.overlayFlow} title={progressFlow.progressTitle} steps={progressFlow.progressSteps} variant="generate" />
      <ProgressOverlay flowKey={progressFlow.overlayFlow} title={progressFlow.progressTitle} steps={progressFlow.progressSteps} variant="create" />

      <TagPopover
        isOpen={tagPopoverOpen}
        popoverRef={tagPopoverRef}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        semverTag={semverTag}
        onSemverTagChange={setSemverTag}
        hashverTag={hashverTag}
        onHashverTagChange={setHashverTag}
        bump={bump}
        onBumpChange={setBump}
        rollover={rollover}
        onRolloverChange={setRollover}
        shaFormat={shaFormat}
        onShaFormatChange={setShaFormat}
        commit={commit}
        onCommitChange={setCommit}
      />

      <PromptPopup
        isOpen={promptPopupOpen}
        promptText={promptText}
        onPromptChange={setPromptText}
        promptModel={promptModel}
        onModelChange={setPromptModel}
        onCancel={() => setPromptPopupOpen(false)}
        onGenerate={handleGenerate}
        textareaRef={promptTextareaRef}
      />

      <ContextMenu
        isOpen={ctxMenuOpen}
        position={ctxPos}
        fileIndex={ctxFileIndex}
        files={selectedFiles}
        onSelectAll={() => { fileSelection.selectAll(); setCtxMenuOpen(false); fileSelection.showReleaseView() }}
        onUnselectAll={() => { fileSelection.clearSelection(); setCtxMenuOpen(false); fileSelection.showReleaseView() }}
        onRemoveAll={() => { alert('Remove all not implemented in this port.'); setCtxMenuOpen(false) }}
        onRemoveItem={() => { alert('Remove item not implemented in this port.'); setCtxMenuOpen(false) }}
        onRevealItem={() => { alert('This would open the system file browser to reveal the file.'); setCtxMenuOpen(false) }}
      />
    </>
  )
}
