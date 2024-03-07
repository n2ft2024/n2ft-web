import { useState, useEffect } from 'react'
interface ScrollPosition {
  scrollBottom: number | undefined
}

function getScrollPosition(ref: any): ScrollPosition {
  const scrollBottom = ref?.scrollHeight - ref?.scrollTop - ref?.clientHeight
  return { scrollBottom: scrollBottom }
}

function getWindowScrollPosition(): ScrollPosition {
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  return { scrollBottom: scrollHeight - windowHeight - scrollTop }
}

const useDomScroll = (ref?: any) => {
  const [position, setPosition] = useState<ScrollPosition>({ scrollBottom: undefined })

  function handleSet() {
    setPosition(getScrollPosition(ref))
  }

  function handleWindowSet() {
    setPosition(getWindowScrollPosition())
  }

  useEffect(() => {
    if (ref === 'window') {
      window?.addEventListener('scroll', handleWindowSet)
      window?.addEventListener('resize', handleWindowSet)
      return () => {
        window?.removeEventListener('scroll', handleWindowSet)
        window?.removeEventListener('resize', handleWindowSet)
      }
    } else {
      if (!ref) return
      ref?.addEventListener('scroll', handleSet)
      ref?.addEventListener('resize', handleSet)
      setPosition(getScrollPosition(ref))
      return () => {
        ref?.removeEventListener('scroll', handleSet)
        ref?.removeEventListener('resize', handleSet)
      }
    }
  }, [ref])

  return position
}


export default useDomScroll