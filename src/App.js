import Chart from './components/ui/Chart/index.js'
import Timeline from './components/ui/Timeline/index.js'
import { AppStyles } from './components/ui/styles/app.js'
import axios from 'axios'
import React from 'react'
import './index.css'
function App() {
  const [data,setData] = React.useState([])
  const [total,setTotal] = React.useState([])
  const [year,setYear] = React.useState(1950)
  const [loading, setLoading] = React.useState(true)
  const color = [
    { country: "China", color: "#f28b82" },
    { country: "India", color: "#fbbc04" },
    { country: "United States", color: "#aecbfa" },
    { country: "Russia", color: "#d7aefb" },
    { country: "Japan", color: "#e6ee9c" },
    { country: "Indonesia", color: "#a7ffeb" },
    { country: "Germany", color: "#d7ccc8" },
    { country: "Brazil", color: "#80cbc4" },
    { country: "United Kingdom", color: "#ffd54f" },
    { country: "Italy", color: "#aed581" },
    { country: "Bangladesh", color: "#ffab91" },
    { country: "France", color: "#90caf9" }
  ]
  
  const getData = () => {
    axios.get(`http://localhost:8080/api/population/get_date/${year}`)
      .then(res => {
        const colorMap = new Map(color.map(c => [c.country, c.color]))
        const newData = res.data.data.map(item => ({
          ...item,
          color: colorMap.get(item.country) || '#999'
        }))
        setData(newData)
      })
      .catch(err => {
        console.error('Failed to fetch data:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  React.useEffect(()=>{
      getData()
      const totalPopulation = data.reduce((sum, item) => {
        return sum + Number(item.population)
      }, 0)
      setTotal(totalPopulation)
  },[year])

  return (
    <AppStyles>
      <div className="App">
        <h2>Population growth per country, 1950 to 2021</h2>
        <p>Click on the legend below to  filter by continent 👇</p>
      <div className='region'>
        <div className='region-title'>Region</div>
        <div className='region-row'>
          {color.map((item, key) => (
            <div className='region-item' key={key}>
              <div className='color' style={{ backgroundColor: item.color }}></div>
              <div className='country'>{item.country}</div>
            </div>
          ))}
        </div>
      </div>
        {loading ? null : <Chart data={data} />}
        <div style={{width: '100%'}}>
          <div className='year'>{year}</div>
          <div className='total'>Total: {Number(total).toLocaleString('en-US')}</div>
        </div>
        <Timeline payload={{startYear: 1950 , endYear: 2021}}  onYearChange={setYear}/>
    </div> 
  </AppStyles>
  
  )
}

export default App;
