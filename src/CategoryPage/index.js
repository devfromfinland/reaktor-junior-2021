import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Item from './Item'
// import { checkMemSize } from '../utils/helpers'

const CategoryPage = () => {
  const [ data, setData ] = useState(null)
  const { category } = useParams()

  useEffect(() => {
    axios.get(`https://bad-api-assignment.reaktor.com/products/${category}`, {
      headers: {
        'x-force-error-mode': 'all' // force the failure to reproduce
      }
    })
      .then(response => {
        // let memSize = checkMemSize(response.data)
        // console.log(`mem size: ${memSize} bytes`)
        setData(response.data)
      })
  }, [category])

  // jackets: 7686 items ~ 1.3 MB memory
  // shirts: 6815 items ~ 1.2 MB memory
  // accessories: 5381 items ~ 1 MB memory

  return (
    <div>
      Category: { category }
      { data
        ? <ul>
          {/* quite a long list to render */}
          <Item item={data[0]} />
          {/* { data.map(item => <Item key={item.id} item={item}/>)} */}
        </ul>
        : 'Loading data...'}
    </div>
  )
}

export default CategoryPage