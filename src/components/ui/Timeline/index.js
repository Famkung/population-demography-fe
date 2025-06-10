import { useState, useEffect, useRef, Fragment } from 'react'
import { TimelineStyle } from './style.js'

const Timeline = ({ payload, onYearChange }) => {
  const [year, setYear] = useState(1950)
  const [autoPlay, setAutoPlay] = useState(true)
  const isDragging = useRef(false)
  const markerRef = useRef(null)
  const timelineRef = useRef(null)

  const startYear = payload.startYear
  const endYear = payload.endYear
  const totalYears = endYear - startYear


  useEffect(() => {
    const percent = ((year - startYear) / totalYears) * 100
    if (markerRef.current) {
      markerRef.current.style.left = `calc(${percent}% - 8px)`
    }
  }, [year, startYear, totalYears])

  useEffect(() => {
    if (onYearChange) {
      onYearChange(year)
    }
  }, [year, onYearChange])

  const renderTicks = () => {
    const ticks = []
    for (let i = 0; i <= totalYears; i++) {
      const y = startYear + i
      const percent = (i / totalYears) * 100

      ticks.push(
        <Fragment key={y}>
          {i % 4 === 0 ? (
            <>
              <div className="tick" style={{ left: `${percent}%` }} />
              <div className="tick-label" style={{ left: `${percent}%` }}>{y}</div>
            </>
          ) : <div className="tick-short" style={{ left: `${percent}%` }} />}
        </Fragment>
      )
    }
    return ticks
  }

  const onMouseDown = (e) => {
    e.preventDefault()
    isDragging.current = true
    setAutoPlay(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    if (!isDragging.current || !timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    let x = e.clientX - rect.left
    x = Math.max(0, Math.min(x, rect.width))
    const percent = x / rect.width
    const newYear = Math.round(startYear + percent * totalYears)
    setYear(newYear)
  }

  const onMouseUp = () => {
    isDragging.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const onClickTimeline = (e) => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    let x = e.clientX - rect.left
    x = Math.max(0, Math.min(x, rect.width))
    const percent = x / rect.width
    const newYear = Math.round(startYear + percent * totalYears)
    setAutoPlay(false)
    setYear(newYear)
  }

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setYear(prev => {
        if (prev < endYear) return prev + 1
        setAutoPlay(false)
        clearInterval(interval)
        return startYear
      })
    }, 500)
    return () => clearInterval(interval)
  }, [autoPlay, endYear])

  return (
    <TimelineStyle>
      <div className="timeline" ref={timelineRef} style={{ userSelect: 'none' }}>
        <div className="timeline-line" onClick={onClickTimeline}>
          <div className="marker" ref={markerRef} onMouseDown={onMouseDown} />
          {renderTicks()}
        </div>
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? 'Pause' : 'Play'}
        </button>
      </div>
    </TimelineStyle>
  )
}

export default Timeline
