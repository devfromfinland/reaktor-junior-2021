import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useAppContext } from '../services/contextService'
import ListItems from './ListItems'
import FilterBox from './FilterBox'

const CategoryPage = () => {
  const [filteredData, setFilteredData] = useState(null)
  const { context } = useAppContext()
  const [topContentHeight, setTopContentHeight] = useState(null)
  const { category } = useParams()

  useEffect(() => {
    // get the height above the item list (to calculate suitable heigh for virtual window)
    const topContent = document.getElementById('category-contents')
    const navBar = document.getElementById('nav-bar')
    if (topContent && navBar) {
      setTopContentHeight(topContent.clientHeight + navBar.clientHeight)
    }
  })

  if (category !== 'jackets' && category !== 'shirts' && category !== 'accessories') {
    return <Redirect to="/" />
  }

  // eslint-disable-next-line react/destructuring-assignment
  const promiseData = context[category] ? context[category].read() : null

  if (!promiseData) {
    console.log('Category variable was not set up')
    return (
      <div>
        Error loading page. Please contact Technical Support and let us know this error!
      </div>
    )
  }

  const handleFilterData = ({
    name, manufacturer, minPrice, maxPrice
  }) => {
    if (!promiseData.data) {
      console.log('data is null')
      return
    }

    // shallow copy data
    // todo: switch to deep copy data
    let copiedData = [...promiseData.data]

    // assuming all input are logically corrected
    // todo: check input
    copiedData = copiedData.filter((item) => {
      if (name !== '') {
        if (!item.name.toUpperCase().includes(name.toUpperCase())) return false
      }

      if (manufacturer !== '') {
        if (!item.manufacturer.toUpperCase().includes(manufacturer.toUpperCase())) return false
      }

      if (minPrice !== '') {
        if (parseInt(minPrice, 10) > 0 && item.price < parseInt(minPrice, 10)) return false
      }

      if (maxPrice !== '') {
        if (parseInt(maxPrice, 10) > 0 && item.price > parseInt(maxPrice, 10)) return false
      }

      return true
    })

    setFilteredData(copiedData)
  }

  const renderListHeader = () => {
    return (
      <div className="row-header" aria-label="list-items-header">
        <div>Product name</div>
        <div>Manufaturer</div>
        <div>Price</div>
        <div>Colors</div>
        <div>Availability</div>
      </div>
    )
  }

  return (
    <div className="category-container" aria-label="category-page" id="category-contents">
      <FilterBox
        onFilterData={handleFilterData}
        onReset={() => setFilteredData(null)}
      />

      <div>
        <b># of products:</b>
        {' '}
        <span aria-label="list-items-length">
          { filteredData ? filteredData.length : promiseData.data.length }
        </span>
      </div>

      { renderListHeader() }

      <ListItems itemData={filteredData || promiseData.data} topHeight={topContentHeight} />

    </div>
  )
}

export default CategoryPage
