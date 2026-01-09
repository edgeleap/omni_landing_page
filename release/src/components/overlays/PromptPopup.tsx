import { RefObject } from 'react'

interface PromptPopupProps {
  isOpen: boolean
  promptText: string
  onPromptChange: (value: string) => void
  promptModel: string
  onModelChange: (value: string) => void
  onCancel: () => void
  onGenerate: () => void
  textareaRef: RefObject<HTMLTextAreaElement>
}

export function PromptPopup({ isOpen, promptText, onPromptChange, promptModel, onModelChange, onCancel, onGenerate, textareaRef }: PromptPopupProps) {
  return (
    <div className={`prompt-overlay${isOpen ? ' show' : ''}`} aria-hidden={!isOpen} onClick={onCancel}>
      <div className="prompt-popup" role="dialog" aria-label="Generate release text with options" onClick={(e) => e.stopPropagation()}>
        <div className="prompt-popup-header">
          <h2 className="prompt-popup-title">Generate release text with options</h2>
          <p className="prompt-popup-subtitle">Provide additional context to generate more accurate release text</p>
        </div>
        <div className="prompt-popup-body">
          <textarea
            className="prompt-textarea"
            ref={textareaRef}
            placeholder="Add context (target audience, tone, features to emphasize, sections to include/exclude)..."
            value={promptText}
            onChange={(e) => onPromptChange(e.target.value)}
          />
          <div className="prompt-model-selector">
            <label className="prompt-model-label">Model</label>
            <select className="prompt-model-select" value={promptModel} onChange={(e) => onModelChange(e.target.value)}>
              <option value="gpt-4o">GPT-4o (Default)</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
            </select>
          </div>
        </div>
        <div className="prompt-popup-footer">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn primary" onClick={onGenerate}>Generate</button>
        </div>
      </div>
    </div>
  )
}
