import { useState, useRef, useCallback, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_SLOT_PERCENT = 80  /* 1 card + peek of next */
const DESKTOP_SLOT_PERCENT = 50 /* 2 cards */

export function useCarouselScroll(totalItems) {
  const [index, setIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [trackWidthPercent, setTrackWidthPercent] = useState(MOBILE_SLOT_PERCENT)
  const viewportRef = useRef(null)
  const isProgrammaticScroll = useRef(false)
  const indexRef = useRef(index)
  indexRef.current = index

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => {
      const isDesktop = mql.matches
      setCardsPerView(isDesktop ? 2 : 1)
      setTrackWidthPercent(isDesktop ? DESKTOP_SLOT_PERCENT : MOBILE_SLOT_PERCENT)
    }
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  const totalPages = cardsPerView === 2 ? Math.ceil(totalItems / 2) : totalItems
  const activePage = cardsPerView === 2 ? Math.floor(index / 2) : index
  const maxIndex = totalItems - 1

  const scrollToIndex = useCallback((i) => {
    const vp = viewportRef.current
    if (!vp) return
    const slotWidthPx = (vp.clientWidth * (trackWidthPercent / 100))
    isProgrammaticScroll.current = true
    vp.scrollLeft = i * slotWidthPx
    setIndex(i)
    requestAnimationFrame(() => { isProgrammaticScroll.current = false })
  }, [trackWidthPercent])

  const goPrev = useCallback(() => {
    const next = Math.max(0, index - cardsPerView)
    scrollToIndex(next)
  }, [index, cardsPerView, scrollToIndex])

  const goNext = useCallback(() => {
    const next = Math.min(maxIndex, index + cardsPerView)
    scrollToIndex(next)
  }, [index, cardsPerView, maxIndex, scrollToIndex])

  const goToPage = useCallback((page) => {
    const i = cardsPerView === 2 ? page * 2 : page
    const clamped = Math.min(maxIndex, i)
    scrollToIndex(clamped)
  }, [cardsPerView, maxIndex, scrollToIndex])

  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const slotWidthPx = vp.clientWidth * (trackWidthPercent / 100)
    if (slotWidthPx <= 0) return
    const onScroll = () => {
      if (isProgrammaticScroll.current) return
      const i = Math.round(vp.scrollLeft / slotWidthPx)
      const clamped = Math.max(0, Math.min(maxIndex, i))
      setIndex(clamped)
    }
    vp.addEventListener('scroll', onScroll, { passive: true })
    return () => vp.removeEventListener('scroll', onScroll)
  }, [trackWidthPercent, maxIndex])

  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const slotWidthPx = vp.clientWidth * (trackWidthPercent / 100)
    if (slotWidthPx <= 0) return
    const i = indexRef.current
    isProgrammaticScroll.current = true
    vp.scrollLeft = i * slotWidthPx
    requestAnimationFrame(() => { isProgrammaticScroll.current = false })
  }, [trackWidthPercent])

  /* Ensure first card is visible on mount (viewport may not have size until after layout) */
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const sync = () => {
      if (vp.clientWidth <= 0) return
      const slotWidthPx = vp.clientWidth * (trackWidthPercent / 100)
      if (slotWidthPx <= 0) return
      isProgrammaticScroll.current = true
      vp.scrollLeft = indexRef.current * slotWidthPx
      requestAnimationFrame(() => { isProgrammaticScroll.current = false })
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(vp)
    return () => ro.disconnect()
  }, [])

  return {
    viewportRef,
    index,
    setIndex: scrollToIndex,
    goPrev,
    goNext,
    goToPage,
    cardsPerView,
    totalPages,
    activePage,
    trackWidthPercent,
    totalItems,
    maxIndex,
  }
}
