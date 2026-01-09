// src/types.ts

export interface FileChange {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'renamed';
  insertions: number;
  deletions: number;
  content?: string;
}

export interface Commit {
  id: string;
  title: string;
  description: string;
  files: string[];
  selected?: boolean;
}

export interface Branch {
  name: string;
  current: boolean;
}
