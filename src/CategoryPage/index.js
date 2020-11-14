import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useAppContext } from '../services/contextService'
import ListItems from './ListItems'

const CategoryPage = () => {
  const [ manufacturer, setManufacturer ] = useState('')
  const [ name, setName ] = useState('')
  const [ minPrice, setMinPrice ] = useState('')
  const [ maxPrice, setMaxPrice ] = useState('')
  const [ filteredData, setFilteredData ] = useState(null)
  const { context } = useAppContext()
  const { category } = useParams()

  if (category !== 'jackets' && category !== 'shirts' && category !== 'accessories') {
    return <Redirect to='/' />
  }

  let data = context[category].read()

  const handleFilterData = (rawData) => {
    if (!rawData) console.log('data is null')
    
    // shallow copy data
    // todo: switch to deep copy data
    let copiedData = [...rawData]

    copiedData = copiedData.filter(item => {
      if (name !== '') {
        if (!item['name'].toUpperCase().includes(name.toUpperCase())) return false
      }

      if (manufacturer !== '') {
        if (!item['manufacturer'].toUpperCase().includes(manufacturer.toUpperCase())) return false
      }

      if (minPrice !== '') {
        if (parseInt(minPrice) > 0 && item['price'] < parseInt(minPrice)) return false
      }

      if (maxPrice !== '') {
        if (parseInt(maxPrice) > 0 && item['price'] > parseInt(maxPrice)) return false
      }

      return true
    })

    setFilteredData(copiedData)
  }


  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
    setName('')
    setManufacturer('')

    setFilteredData(null)
  }

  const renderListHeader = () => {
    return (
      <div className='row-header' aria-label='list-items-header'>
        <div>Product name</div>
        <div>Manufaturer</div>
        <div>Price</div>
        <div>Colors</div>
        <div>Availability</div>
      </div>
    )
  }
  
  return (
    <div className='category-container' data-testid='category-page'>
      <div className='filter-container'>
        <div>
          Filter by product name:
          <input
            type='text'
            aria-label='input-product-name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          Filter by manufacturer:
          <input
            type='text'
            aria-label='input-manufacturer'
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}
          />
        </div>

        <div>
          {/* Note: not checking input yet (e.g. min < max) */}
          Filter by price: (min) 
          <input
            type='text'
            aria-label='input-min-price'
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          /> - (max)
          <input
            type='text'
            aria-label='input-max-price'
            value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
          />
        </div>

        <div>
          <button onClick={() => handleFilterData(data)} name='button-filter'>
            filter
          </button>
          <button onClick={handleReset} name='button-reset'>
            reset
          </button>
        </div>
      </div>

      <div>
        <b># of products:</b> <span aria-label='list-items-length'>{ filteredData ? filteredData.length : data.length }</span>
      </div>

      { renderListHeader() }

      <ListItems itemData={filteredData ? filteredData : data}/>

    </div>
  )
}

export default CategoryPage