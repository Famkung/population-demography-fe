import { useState, useEffect, useRef, Fragment } from 'react'
import { TimelineStyle } from './style.js'

const Timeline = ({ payload , onYearChange }) => {
  const [year, setYear] = useState(1950)
  const markerRef = useRef(null)
  const timelineRef = useRef(null)
  const isDragging = useRef(false)

  const startYear = payload.startYear
  const endYear = payload.endYear
  const totalYears = endYear - startYear

  useEffect(() => {
    const percent = ((year - startYear) / totalYears) * 100
    if (markerRef.current) {
      markerRef.current.style.left = `calc(${percent}% - 8px)`
    }
  }, [year])

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
          ) :    <div className="tick-short" style={{ left: `${percent}%` }} />}
        </Fragment>
      )
    }
  
    return ticks
  }
  
  

  const onMouseDown = (e) => {
    e.preventDefault()
    isDragging.current = true
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    if (!timelineRef.current) return
    const timelineRect = timelineRef.current.getBoundingClientRect()
    let relativeX = e.clientX - timelineRect.left
    relativeX = Math.max(0, Math.min(relativeX, timelineRect.width))
    const percent = relativeX / timelineRect.width
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
    const timelineRect = timelineRef.current.getBoundingClientRect()
    let relativeX = e.clientX - timelineRect.left
    relativeX = Math.max(0, Math.min(relativeX, timelineRect.width))
    const percent = relativeX / timelineRect.width
    const newYear = Math.round(startYear + percent * totalYears)
    setYear(newYear)
  }

  return (
    <TimelineStyle>
      <div className="timeline" ref={timelineRef} style={{ position: 'relative', userSelect: 'none' }}>
        <div
          className="timeline-line"
          style={{ position: 'relative' , cursor: 'pointer' }}
          onClick={onClickTimeline}
        >
          <div
            className="marker"
            ref={markerRef}
            onMouseDown={onMouseDown}
            style={{ cursor: 'pointer', position: 'absolute' }}
          />
          {renderTicks()}
        </div>
      </div>
    </TimelineStyle>
  )
}

export default Timeline
