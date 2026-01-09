import { useState, useCallback } from 'react'
import { FlowKey, ProgressStep, StepState } from '../types'
import { FLOWS } from '../constants/flows'
import { randomDelay } from '../utils/format'

export function useProgressFlow() {
  const [overlayFlow, setOverlayFlow] = useState<FlowKey | null>(null)
  const [progressTitle, setProgressTitle] = useState('')
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([])

  const runProgressFlow = useCallback(async (flowKey: FlowKey): Promise<void> => {
    const flow = FLOWS[flowKey]
    setOverlayFlow(flowKey)
    setProgressTitle(flow.title)
    setProgressSteps(
      flow.steps.map((s) => ({
        label: s.label,
        subs: s.subs,
        state: 'queued' as StepState,
        right: 'queued',
      })),
    )

    await new Promise((r) => setTimeout(r, 50))

    for (let i = 0; i < flow.steps.length; i++) {
      setProgressSteps((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, state: 'active', right: p.subs[0] } : p)),
      )
      for (let s = 1; s < flow.steps[i].subs.length; s++) {
        const sub = flow.steps[i].subs[s]
        setProgressSteps((prev) => prev.map((p, idx) => (idx === i ? { ...p, right: `${sub}...` } : p)))
        const rand = Math.random()
        let delay = 200
        if (rand < 0.25) delay = randomDelay(80, 180)
        else if (rand < 0.55) delay = randomDelay(200, 400)
        else if (rand < 0.85) delay = randomDelay(400, 700)
        else delay = randomDelay(700, 1100)
        await new Promise((r) => setTimeout(r, delay))
      }
      setProgressSteps((prev) => prev.map((p, idx) => (idx === i ? { ...p, right: 'done', state: 'done' } : p)))
      await new Promise((r) => setTimeout(r, randomDelay(60, 200)))
    }
    await new Promise((r) => setTimeout(r, randomDelay(100, 300)))
    setOverlayFlow(null)
  }, [])

  const closeOverlay = useCallback(() => {
    setOverlayFlow(null)
  }, [])

  return {
    overlayFlow,
    progressTitle,
    progressSteps,
    runProgressFlow,
    closeOverlay,
  }
}
