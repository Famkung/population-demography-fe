import styled from 'styled-components'
export const Styles = styled.div`
  width: 100%;
  .chart-content{
    padding: 20px;
  }
  .x-axis {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .start{
    margin-left: 110px; 
  }
  .y-axis {
    height: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
   }
  .title{
    font-size: 16px;
    width: 100px;
  }
.graph {
    height: 40px;
    transition: width 0.5s ease-in-out;
    border-radius: 4px;
}


`