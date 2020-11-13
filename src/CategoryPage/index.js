import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useAppContext } from '../services/contextService'
import ListItems from './ListItems'

const CategoryPage = () => {
  const [ userFilters, setUserFilters ] = useState({
    manufacturer: '',
    name: '',
    minPrice: null,
    maxPrice: null,
    // availability: 'INSTOCK',
    // color: []
  })
  const [ filteredData, setFilteredData ] = useState(null)
  const { context } = useAppContext()
  const { category } = useParams()

  if (category !== 'jackets' && category !== 'shirts' && category !== 'accessories') {
    return <Redirect to='/' />
  }

  let data = context[category].read()

  const handleFilterData = (rawData, filters) => {
    if (!rawData) console.log('data is null')
    if (!filters) return rawData

    const filterKeys = Object.keys(filters)

    // shallow copy data
    // todo: switch to deep copy data
    let copiedData = [...rawData]

    copiedData = copiedData.filter(item => {
      for (let key of filterKeys) {
        switch (key) {
          case 'name':
            if (!filters[key] || filters[key] === '') break
            if (!item[key].toUpperCase().includes(filters[key].toUpperCase())) return false
            break
          case 'manufacturer':
            if (!filters[key] || filters[key] === '') break
            if (item[key] !== filters[key]) return false
            break
          case 'minPrice':
          case 'maxPrice':
            if (filters['minPrice'] && item['price'] < filters['minPrice']) return false
            if (filters['maxPrice'] && item['price'] > filters['maxPrice']) return false
            break
          case 'availability':
            // todo: filter by availability
            break
          case 'color':
            if (!filters[key] || (Array.isArray(filters[key]) && filters[key].length === 0)) break
            for (let colorItem of filters[key]) {
              if (item[key].includes(colorItem)) {
                return true
              }
            }
            return false
          default:
            return true
        }
      }
      return true
    })

    setFilteredData(copiedData)
  }

  const handleReset = () => {
    // default
    setUserFilters({
      manufacturer: '',
      name: '',
      minPrice: null,
      maxPrice: null,
      // availability: 'INSTOCK',
      // color: []
    })

    setFilteredData(null)
  }

  const renderListHeader = () => {
    return (
      <div className='row-header'>
        <div>Product name</div>
        <div>Manufaturer</div>
        <div>Price</div>
        <div>Colors</div>
        <div>Availability</div>
      </div>
    )
  }
  
  return (
    <div className='category-container'>
      <div className='filter-container'>
        <div>
          Filter by product name:
          <input
            type='text'
            value={userFilters.name}
            onChange={e => setUserFilters(userFilters => ({
              ...userFilters,
              name: e.target.value
            }))}
          />
        </div>

        <div>
          Filter by manufacturer:
          <input
            type='text'
            value={userFilters.manufacturer}
            onChange={e => setUserFilters(userFilters => ({
              ...userFilters,
              manufacturer: e.target.value
            }))}
          />
        </div>

        <div>
          {/* Note: not checking input yet (e.g. min < max) */}
          Filter by price: (min) 
          <input
            type='text'
            value={userFilters.minPrice}
            onChange={e => setUserFilters(userFilters => ({
              ...userFilters,
              minPrice: parseInt(e.target.value)
            }))}
          /> - (max)
          <input
            type='text'
            value={userFilters.maxPrice}
              onChange={e => setUserFilters(userFilters => ({
                ...userFilters,
                maxPrice: parseInt(e.target.value)
            }))}
          />
        </div>

        <div>
          <button onClick={() => handleFilterData(data, userFilters)}>
            filter
          </button>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>

      <div>
        <b># of products:</b> { filteredData ? filteredData.length : data.length }
      </div>

      { renderListHeader() }
      <ListItems itemData={data}/>
    </div>
  )
}

export default CategoryPage