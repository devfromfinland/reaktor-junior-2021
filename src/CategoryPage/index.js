import React, { useState, useEffect, useRef } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useAppContext } from '../services/contextService'
import { filterData, getColors } from '../utils/helpers'
import { CATEGORIES, fetchNewData } from '../services/categoryService'
import ListItems from './ListItems'
import FilterBox from './FilterBox'

const CategoryPage = () => {
  const [filteredData, setFilteredData] = useState(null)
  const { context, setContext } = useAppContext()
  const [topContentHeight, setTopContentHeight] = useState(null)
  const { category } = useParams()

  const filterRef = useRef()

  // eslint-disable-next-line react/destructuring-assignment
  const promiseData = context[category] ? context[category].read() : null

  useEffect(() => {
    // get the height above the item list (to calculate suitable heigh for virtual window)
    const topContent = document.getElementById('category-contents')
    const navBar = document.getElementById('nav-bar')
    if (topContent && navBar) {
      setTopContentHeight(topContent.clientHeight + navBar.clientHeight)
    }

    // reset filter and dilferedData when switching category
    setFilteredData(null)
    filterRef.current.handleReset()
  }, [promiseData])

  if (!CATEGORIES.includes(category)) {
    return <Redirect to="/" />
  }

  if (!promiseData) {
    console.log('Category variable was not set up')
    return (
      <div>
        Error loading page. Please contact Technical Support and let us know this error!
      </div>
    )
  }

  const handleFilterData = (filters) => {
    if (!promiseData.data) {
      console.log('data is null')
      // todo: show notification
      return
    }

    const result = filterData(filters, promiseData.data)

    setFilteredData(result)
  }

  const refetchData = () => {
    // todo: clear cache (if necessary to get the latest cache version)

    // fetch new data
    const newData = fetchNewData()
    setContext(newData)
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
    <div className="category-container" aria-label="category-page" id="category-contents" data-testid="filter-data">
      <FilterBox
        onFilterData={handleFilterData}
        onReset={() => setFilteredData(null)}
        colors={getColors(filteredData || promiseData.data)}
        refetchData={refetchData}
        ref={filterRef}
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
