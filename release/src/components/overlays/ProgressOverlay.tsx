import { FlowKey, ProgressStep } from '../../types'
import { ArcSpinner } from '../ui'

interface ProgressOverlayProps {
  flowKey: FlowKey | null
  title: string
  steps: ProgressStep[]
  variant: 'generate' | 'create'
}

export function ProgressOverlay({ flowKey, title, steps, variant }: ProgressOverlayProps) {
  const isVisible = variant === 'generate' ? flowKey === 'generate' : flowKey !== null && flowKey !== 'generate'

  return (
    <div className={`overlay${isVisible ? ' show' : ''}`} aria-hidden={!isVisible}>
      <div className="overlayCard" role="dialog" aria-label="Progress indicator">
        <div className="overlayTitle">{title || (variant === 'generate' ? 'Generating release' : 'Creating release')}</div>
        <div className="progPanel">
          <div className="progList">
            {steps.map((s, idx) => (
              <div key={idx} className="progItem" data-state={s.state}>
                <ArcSpinner />
                <div className="progLeft">{s.label}</div>
                <div className="progRight">{s.right}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
