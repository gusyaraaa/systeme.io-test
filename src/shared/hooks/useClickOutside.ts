import React, { useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: (event: Event) => void,
) {
  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      const el = ref.current
      if (el && !el.contains(e.target as Node)) {
        onClickOutside(e)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    document.addEventListener('touchstart', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
      document.removeEventListener('touchstart', checkIfClickedOutside)
    }
  }, [ref])
}
