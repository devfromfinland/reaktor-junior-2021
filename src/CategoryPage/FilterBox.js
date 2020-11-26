import React, { useState } from 'react'

const FilterBox = ({ onFilterData, onReset }) => {
  const [manufacturer, setManufacturer] = useState('')
  const [name, setName] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleReset = () => {
    setManufacturer('')
    setName('')
    setMinPrice('')
    setMaxPrice('')
    onReset()
  }

  return (
    <div className="filter-container">
      <div>
        Filter by product name:
        {' '}
        <input
          type="text"
          aria-label="input-product-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        Filter by manufacturer:
        {' '}
        <input
          type="text"
          aria-label="input-manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        />
      </div>

      <div>
        {/* Note: not checking input yet (e.g. min < max) */}
        Filter by price: (min)
        {' '}
        <input
          type="text"
          style={{ width: '50px ' }}
          aria-label="input-min-price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        {' - '}
        (max)
        {' '}
        <input
          type="text"
          style={{ width: '50px ' }}
          aria-label="input-max-price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => onFilterData({
            manufacturer, name, minPrice, maxPrice
          })}
          name="button-filter"
          className="main-button"
        >
          filter
        </button>
        <button type="button" onClick={handleReset} name="button-reset" className="main-button">
          reset
        </button>
      </div>
    </div>
  )
}

export default FilterBox
