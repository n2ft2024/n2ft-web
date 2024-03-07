import React,{useEffect} from "react"
const useClickAway = (fn: any, dom: any, eventName = 'click') => {
    useEffect(() => {
      const handler = (event: any) => {
        const doms = Array.isArray(dom) ? dom : [dom]
        if (doms.some((dom) => dom.current.contains(event.target))) {
          return
        }
        fn(event)
      }
      const eventNames = Array.isArray(eventName) ? eventName : [eventName]
      eventNames.forEach((eventName) =>
        window.addEventListener(eventName, handler)
      )
      return () =>
        eventNames.forEach((eventName) =>
          window.removeEventListener(eventName, handler)
        )
    }, [])
  }

export default useClickAway