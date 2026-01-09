import { useState, useCallback, useEffect, useRef, RefObject } from 'react'

interface UsePopoverOptions {
  onClose?: () => void
}

export function usePopover(options: UsePopoverOptions = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    options.onClose?.()
  }, [options])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  return { isOpen, open, close, toggle, popoverRef, triggerRef }
}

export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  isOpen: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const isInside = refs.some((ref) => ref.current?.contains(target))
      if (!isInside) onClose()
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [isOpen, refs, onClose])
}
