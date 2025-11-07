import { useEffect, useState } from 'react'

export default function usePageReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function handleLoad() {
      setReady(true)
    }
    if (document.readyState === 'complete') handleLoad()
    else window.addEventListener('load', handleLoad)
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return ready
}


