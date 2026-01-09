import { RefObject } from 'react'

interface TagPopoverProps {
  isOpen: boolean
  popoverRef: RefObject<HTMLDivElement>
  activeTab: 'semver' | 'hashver'
  onTabChange: (tab: 'semver' | 'hashver') => void
  semverTag: string
  onSemverTagChange: (value: string) => void
  hashverTag: string
  onHashverTagChange: (value: string) => void
  bump: 'patch' | 'minor' | 'major'
  onBumpChange: (value: 'patch' | 'minor' | 'major') => void
  rollover: 'standard' | 'progression'
  onRolloverChange: (value: 'standard' | 'progression') => void
  shaFormat: 'short' | 'long'
  onShaFormatChange: (value: 'short' | 'long') => void
  commit: string
  onCommitChange: (value: string) => void
}

export function TagPopover({
  isOpen, popoverRef, activeTab, onTabChange,
  semverTag, onSemverTagChange, hashverTag, onHashverTagChange,
  bump, onBumpChange, rollover, onRolloverChange,
  shaFormat, onShaFormatChange, commit, onCommitChange
}: TagPopoverProps) {
  return (
    <div className={`popover${isOpen ? ' show' : ''}`} ref={popoverRef} onClick={(e) => e.stopPropagation()} style={{ position: 'fixed' }}>
      <div className="popover-header">
        <div className="popover-title">Version Tag</div>
      </div>
      <div className="popover-body">
        <div className="tab-switcher">
          <button className={`tab-btn${activeTab === 'semver' ? ' active' : ''}`} onClick={() => onTabChange('semver')}>sem-ver</button>
          <button className={`tab-btn${activeTab === 'hashver' ? ' active' : ''}`} onClick={() => onTabChange('hashver')}>hash-ver</button>
        </div>
        <div className={`tab-content${activeTab === 'semver' ? ' active' : ''}`}>
          <div className="row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Bump</label>
              <div className="segmented-selector">
                <button className={`segment-btn${bump === 'patch' ? ' active' : ''}`} onClick={() => onBumpChange('patch')}>patch</button>
                <button className={`segment-btn${bump === 'minor' ? ' active' : ''}`} onClick={() => onBumpChange('minor')}>minor</button>
                <button className={`segment-btn${bump === 'major' ? ' active' : ''}`} onClick={() => onBumpChange('major')}>major</button>
              </div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Rollover</label>
              <div className="segmented-selector">
                <button className={`segment-btn${rollover === 'standard' ? ' active' : ''}`} onClick={() => onRolloverChange('standard')}>Standard</button>
                <button className={`segment-btn${rollover === 'progression' ? ' active' : ''}`} onClick={() => onRolloverChange('progression')}>Progression</button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tag</label>
            <input className="small-input" value={semverTag} onChange={(e) => onSemverTagChange(e.target.value)} />
          </div>
        </div>
        <div className={`tab-content${activeTab === 'hashver' ? ' active' : ''}`}>
          <div className="row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">SHA format</label>
              <div className="segmented-selector">
                <button className={`segment-btn${shaFormat === 'short' ? ' active' : ''}`} onClick={() => onShaFormatChange('short')}>short</button>
                <button className={`segment-btn${shaFormat === 'long' ? ' active' : ''}`} onClick={() => onShaFormatChange('long')}>long</button>
              </div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Commit</label>
              <select className="select" value={commit} onChange={(e) => onCommitChange(e.target.value)}>
                <option value="a3f9c21">a3f9c21 Latest commit (HEAD)</option>
                <option value="b7e4d82">b7e4d82 Fix auth session</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tag</label>
            <input className="small-input" value={hashverTag} onChange={(e) => onHashverTagChange(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}
