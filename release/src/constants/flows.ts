import { Flow, FlowKey } from '../types'

export const FLOWS: Record<FlowKey, Flow> = {
  generate: {
    title: 'Generating release',
    steps: [
      { label: 'Analyzing commits since last tag version', subs: ['queued', 'indexing commits', 'building diff map'] },
      { label: 'Analyzing merged PRs since last tag version', subs: ['queued', 'fetching PRs', 'grouping by scope'] },
      { label: 'Analyzing related issues', subs: ['queued', 'resolving refs', 'mapping labels'] },
      { label: 'Generating release change-log', subs: ['queued', 'drafting sections', 'formatting output'] },
    ],
  },
  create: {
    title: 'Creating release',
    steps: [
      { label: 'Generating final payload', subs: ['queued', 'serializing data', 'validating schema'] },
      { label: 'Checking Tag availability', subs: ['queued', 'querying remote'] },
      { label: 'Uploading artifacts', subs: ['queued', 'compressing files', 'streaming upload'] },
      { label: 'Finalizing release', subs: ['queued', 'writing metadata', 'publishing'] },
    ],
  },
  createDraft: {
    title: 'Creating release draft',
    steps: [
      { label: 'Generating draft payload', subs: ['queued', 'serializing data', 'validating schema'] },
      { label: 'Checking Tag availability', subs: ['queued', 'querying remote'] },
      { label: 'Uploading artifacts', subs: ['queued', 'compressing files', 'streaming upload'] },
      { label: 'Finalizing release draft', subs: ['queued', 'writing metadata', 'saving draft'] },
    ],
  },
}
