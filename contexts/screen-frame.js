import {createContext, useMemo, useCallback, useEffect, useState} from 'react'

const ScreenFrameContext = createContext()

export const ScreenFrameContextProvider = props => {
  const [isFrame, setIsFrame] = useState(false)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    if (window.location === window.parent.location) {
      setIsFrame(false)
    } else {
      setIsFrame(true)
    }
  }, [])

  const handleResize = useCallback(() => {
    setScreenSize(window.innerWidth)
  }, [])

  useEffect(() => {
    if (isFrame) {
      window.addEventListener('resize', handleResize)

      handleResize()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize, isFrame])

  const value = useMemo(() => ({
    isFrame,
    screenSize
  }), [isFrame, screenSize])

  return (
    <ScreenFrameContext.Provider
      value={value}
      {...props}
    />
  )
}

export default ScreenFrameContext
