import { useRef, useState, useEffect } from 'react'

const SPOTLIGHT_RADIUS = 140

export function useSectionSpotlight(mouseX, mouseY) {
  const ref = useRef(null)
  const [rect, setRect] = useState(null)

  useEffect(() => {
    const update = () => {
      if (ref.current) setRect(ref.current.getBoundingClientRect())
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [])

  const inside =
    rect &&
    mouseX >= rect.left &&
    mouseX <= rect.right &&
    mouseY >= rect.top &&
    mouseY <= rect.bottom
  const spotlightStyle =
    inside && rect
      ? {
          clipPath: `circle(${SPOTLIGHT_RADIUS}px at ${mouseX - rect.left}px ${mouseY - rect.top}px)`,
        }
      : null

  return [ref, spotlightStyle]
}
