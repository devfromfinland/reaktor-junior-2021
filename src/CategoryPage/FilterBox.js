import React, { useState } from 'react'

const FilterBox = ({
  onFilterData, onReset, colors, refetchData
}) => {
  const [manufacturer, setManufacturer] = useState('')
  const [name, setName] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [showInStock, setShowInStock] = useState(true)
  const [showLowStock, setShowLowStock] = useState(true)
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [color, setColor] = useState('')

  const handleReset = () => {
    setManufacturer('')
    setName('')
    setMinPrice('')
    setMaxPrice('')
    setShowInStock(true)
    setShowLowStock(true)
    setShowOutOfStock(true)
    setColor('')
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
        {/* Note: not checking input yet (e.g. min < max) */}
        Filter by availability:
        {' '}
        available
        <input
          name="showInStock"
          type="checkbox"
          checked={showInStock}
          onChange={() => setShowInStock((currentStatus) => !currentStatus)}
        />

        {' '}
        out of stock
        <input
          name="showOutOfStock"
          type="checkbox"
          checked={showOutOfStock}
          onChange={() => setShowOutOfStock((currentStatus) => !currentStatus)}
        />

        {' '}
        low stock
        <input
          name="showLowStock"
          type="checkbox"
          checked={showLowStock}
          onChange={() => setShowLowStock((currentStatus) => !currentStatus)}
        />
      </div>

      <div>
        Filter by color:
        {' '}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="" disabled>Select color</option>
          { colors.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </div>

      <div>
        <button
          type="button"
          onClick={() => onFilterData({
            manufacturer, name, minPrice, maxPrice, showInStock, showLowStock, showOutOfStock, color
          })}
          name="button-filter"
          className="main-button"
        >
          filter
        </button>
        <button type="button" onClick={handleReset} name="button-reset" className="main-button">
          reset
        </button>
        <button type="button" onClick={refetchData} name="button-refetch" className="main-button">
          refresh
        </button>
      </div>
    </div>
  )
}

export default FilterBox
