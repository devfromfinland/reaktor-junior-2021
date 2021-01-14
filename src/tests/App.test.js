import React from 'react'
import {
  render, screen, fireEvent
} from '@testing-library/react'
import App from '../App'
import { fetchNewData } from '../services/categoryService'

it('render main elements in root', () => {
  render(<App />)
  expect(screen.getByLabelText('root-container')).toBeInTheDocument()
  expect(screen.getByLabelText('homepage')).toBeInTheDocument()
  expect(screen.queryByRole('navigation')).toBeInTheDocument()

  // check active navigation item is Home
  expect(screen.queryByRole('listitem', { name: 'Home' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).not.toHaveClass('active')
})

describe('navigating to category page', () => {
  beforeEach(() => {
    const testData = fetchNewData()
    render(
      <App testData={testData} />
    )
    fireEvent.click(screen.getByText('Accessories'))
  })

  it('render loading indicator', () => {
    expect(screen.getByLabelText('loading-indicator')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('update navigation bar', () => {
    expect(screen.queryByRole('listitem', { name: 'Home' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Jackets' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Accessories' })).toHaveClass('active')
  })
})

describe('on Category Page: Accessories', () => {
  beforeEach(async () => {
    const testData = fetchNewData()
    render(
      <App testData={testData} />
    )

    // mock the window size for AutoSizer to render
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 1000 })

    fireEvent.click(screen.queryByText('Accessories'))
    await screen.findByLabelText('category-page')
  })

  it('render main elements in Category', () => {
    // filter
    expect(screen.queryByLabelText('category-page')).toBeInTheDocument()
    expect(screen.queryByLabelText('category-page')).toHaveTextContent('Filter by product name')
    expect(screen.queryByLabelText('category-page')).toHaveTextContent('Filter by manufacturer')
    expect(screen.queryByLabelText('category-page')).toHaveTextContent('Filter by price')

    // input
    expect(screen.queryByLabelText('input-product-name')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-manufacturer')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-min-price')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-max-price')).toBeInTheDocument()

    // buttons
    expect(screen.queryByRole('button', { name: 'filter' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'reset' })).toBeInTheDocument()

    // summary, number of product
    expect(screen.queryByLabelText('category-page')).toHaveTextContent('# of products')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')

    // list of items
    expect(screen.queryByLabelText('list-items-header')).toBeInTheDocument()
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
  })

  it('filter by product name', () => {
    const formInput = screen.getByLabelText('input-product-name')
    const resetButton = screen.getByRole('button', { name: 'reset' })
    const filterButton = screen.getByRole('button', { name: 'filter' })

    // Only 1 product match
    fireEvent.change(formInput, {
      target: { value: 'accessory 2' }
    })
    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match
    fireEvent.change(formInput, {
      target: { value: 'nothing' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // Reset filter
    fireEvent.click(resetButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter by manufacturer', () => {
    const formInput = screen.getByLabelText('input-manufacturer')
    const resetButton = screen.getByRole('button', { name: 'reset' })
    const filterButton = screen.getByRole('button', { name: 'filter' })

    // Only 1 product match
    fireEvent.change(formInput, {
      target: { value: 'xoon' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match
    fireEvent.change(formInput, {
      target: { value: 'nothing' }
    })
    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // reset filter
    fireEvent.click(resetButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter by price', () => {
    const inputMinPrice = screen.getByLabelText('input-min-price')
    const inputMaxPrice = screen.getByLabelText('input-max-price')
    const resetButton = screen.getByRole('button', { name: 'reset' })
    const filterButton = screen.getByRole('button', { name: 'filter' })

    // One 1 product match min price
    fireEvent.change(inputMinPrice, {
      target: { value: '40' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match min price
    fireEvent.change(inputMinPrice, {
      target: { value: '70' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // reset filter
    fireEvent.click(resetButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')

    // One 1 product match max price
    fireEvent.change(inputMaxPrice, {
      target: { value: '40' }
    })
    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 1')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match max price
    fireEvent.change(inputMaxPrice, {
      target: { value: '20' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // One 1 product match both min and max price
    fireEvent.change(inputMinPrice, {
      target: { value: '20' }
    })
    fireEvent.change(inputMaxPrice, {
      target: { value: '40' }
    })
    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 1')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match both min and max price
    fireEvent.change(inputMinPrice, {
      target: { value: '10' }
    })
    fireEvent.change(inputMaxPrice, {
      target: { value: '25' }
    })
    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()
  })

  it('filter combination product name, manufacturer, and price', () => {
    const resetButton = screen.getByRole('button', { name: 'reset' })
    const filterButton = screen.getByRole('button', { name: 'filter' })

    // Only 1 product match
    fireEvent.change(screen.getByLabelText('input-min-price'), {
      target: { value: '40' }
    })
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'xoon' }
    })
    fireEvent.change(screen.getByLabelText('input-product-name'), {
      target: { value: 'accessory' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    // No product match
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'rouke' }
    })

    fireEvent.click(filterButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // reset filter
    fireEvent.click(resetButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })
})
