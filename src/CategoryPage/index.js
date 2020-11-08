import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Item from './Item'

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
        console.log('response', response)
        setData(response.data)
      })
  }, [category])

  // jackets: 7686 items
  // shirts: 6815 items
  // accessories: 5381 items

  return (
    <div>
      Category: { category }
      { data
        ? <ul>
          {/* quite a long list to render */}
          { data.map(item => <Item key={item.id} item={item}/>)}
        </ul>
        : 'Loading data...'}
    </div>
  )
}

export default CategoryPage