import { useState, useCallback } from 'react'
import { FileItem } from '../types'

export function useFileSelection(selectedFiles: FileItem[]) {
  const [selectedFileIndices, setSelectedFileIndices] = useState<Set<number>>(new Set())
  const [selectionAnchorIndex, setSelectionAnchorIndex] = useState<number | null>(null)
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null)

  const isSelectableIndex = useCallback((i: number) => {
    const f = selectedFiles[i]
    return Boolean(f && !f.isGenerated)
  }, [selectedFiles])

  const clearSelection = useCallback(() => {
    setSelectedFileIndices(new Set())
    setSelectionAnchorIndex(null)
  }, [])

  const setSingleSelection = useCallback((i: number) => {
    if (!isSelectableIndex(i)) return
    setSelectedFileIndices(new Set([i]))
    setSelectionAnchorIndex(i)
  }, [isSelectableIndex])

  const toggleSelection = useCallback((i: number) => {
    if (!isSelectableIndex(i)) return
    setSelectedFileIndices((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
    setSelectionAnchorIndex(i)
  }, [isSelectableIndex])

  const selectRange = useCallback((a: number, b: number) => {
    const start = Math.min(a, b)
    const end = Math.max(a, b)
    const next = new Set<number>()
    for (let i = start; i <= end; i++) {
      if (isSelectableIndex(i)) next.add(i)
    }
    setSelectedFileIndices(next)
  }, [isSelectableIndex])

  const selectAll = useCallback(() => {
    const next = new Set<number>()
    for (let i = 0; i < selectedFiles.length; i++) {
      if (isSelectableIndex(i)) next.add(i)
    }
    setSelectedFileIndices(next)
  }, [selectedFiles.length, isSelectableIndex])

  const showReleaseView = useCallback(() => {
    setSelectedFileIndex(null)
    clearSelection()
  }, [clearSelection])

  const showFileView = useCallback((i: number) => {
    setSelectedFileIndex(i)
  }, [])

  return {
    selectedFileIndices,
    selectionAnchorIndex,
    selectedFileIndex,
    isSelectableIndex,
    clearSelection,
    setSingleSelection,
    toggleSelection,
    selectRange,
    selectAll,
    showReleaseView,
    showFileView,
  }
}
