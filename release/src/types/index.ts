export type FlowKey = 'generate' | 'create' | 'createDraft'

export type Flow = {
  title: string
  steps: { label: string; subs: string[] }[]
}

export type StepState = 'queued' | 'active' | 'done'

export type ProgressStep = {
  label: string
  subs: string[]
  state: StepState
  right: string
}

export type FileItem = {
  name: string
  size: number
  date: string
  sha: string
  content?: string
  isGenerated?: boolean
}
