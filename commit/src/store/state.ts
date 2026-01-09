// src/store/state.ts

import type { FileChange, Commit, Branch } from '../types';

// These are placeholder exports.
// Gradually move your global variables here.

export const branches: Branch[] = [];
export let currentBranch = 'main';
export const fileData: FileChange[] = [];
export const commitData: Commit[] = [];
export let commitsVisible = false;
