import styled from 'styled-components'

export const TimelineStyle = styled.div`
  padding: 30px;
  .range-label {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .slider {
    width: 100%;
    margin-bottom: 30px;
  }
  .timeline {
    position: relative;
  }
  .timeline-line {
    position: relative;
    height: 40px;
    border-top: 2px solid #aaa;
  }
  .tick {
    position: absolute;
    top: -6px;
    width: 1px;
    height: 12px;
    background-color: #333;
  }
  .tick-label {
    position: absolute;
    top: 10px;
    transform: translateX(-50%);
    font-size: 12px;
    white-space: nowrap;
    color: #555;
  }
  .marker {
    position: absolute;
    top: -12px; 
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid black;
    transition: left 0.2s ease-out;
  }
`
