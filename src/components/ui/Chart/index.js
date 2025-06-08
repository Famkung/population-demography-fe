import { Styles } from './style.js'
// import { data } from '../../utils/index.js'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import aixos from 'axios'
const Chart = (data) => {
    const [max,setMax] = useState(0)
    const sortedData = data.data.sort((a, b) => {
        return Number(b.population) - Number(a.population);
      })
      
      const roundUpToHigherScale = (num) => {
        if (num <= 0) return 1
        const digits = Math.floor(Math.log10(num))
        const base = Math.pow(10, digits)
        return Math.ceil(num / base + 1) * base
      }
      

    useEffect(()=> {
        setMax(roundUpToHigherScale(sortedData[0].population))
    },[data])
      
    
    return (
        <Styles>
            <div className='chart-content'>
                <div className='x-axis'>
                    <div className='start'>0</div>
                    <div className='end'>{Number(max).toLocaleString('en-US')}</div>
                </div>
                {sortedData.map((item, key) => (
                    <motion.div
                        className='y-axis'
                        key={item.country}
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <div className='title'>{item.country}</div>
                            <div
                            className='graph'
                            style={{ width: `${Math.ceil(item.population / max * 100)}%` , backgroundColor: item.color}}
                            ></div>
                        <div>{Number(item.population).toLocaleString('en-US')}</div>
                    </motion.div>
                ))}

            </div>
        </Styles>
    )
}

export default Chart