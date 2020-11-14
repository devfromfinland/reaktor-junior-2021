import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

it('render main elements in root', () => {
  render(<App />)
  expect(screen.queryByTestId('root-container')).toBeInTheDocument()
  expect(screen.queryByTestId('homepage')).toBeInTheDocument()
  expect(screen.queryByRole('navigation')).toBeInTheDocument()

  // check active navigation item is Home
  expect(screen.queryByRole('listitem', { name: 'Home' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).not.toHaveClass('active')
})

describe('navigating to category page', () => {
  beforeEach(() => {
    render(<App />)
    fireEvent.click(screen.getByText('Accessories'))
  })
  
  it('check loading indicator', () => {
    expect(screen.getByLabelText('loading-indicator')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('check navigation bar', () => {
    expect(screen.queryByRole('listitem', { name: 'Home' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Jackets' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
    expect(screen.queryByRole('listitem', { name: 'Accessories' })).toHaveClass('active')
  })
})

describe('on Category Page: Accessories', () => {
  beforeEach(async () => {
    render(<App />)
    
    // mock the window size for AutoSizer to render
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 1000 })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 1000 })

    fireEvent.click(screen.queryByText('Accessories'))
    await waitFor(() => screen.getByTestId('category-page'))
  })

  it('check main elements are rendered', () => {
    // filter
    expect(screen.queryByTestId('category-page')).toBeInTheDocument()
    expect(screen.queryByTestId('category-page')).toHaveTextContent('Filter by product name')
    expect(screen.queryByTestId('category-page')).toHaveTextContent('Filter by manufacturer')
    expect(screen.queryByTestId('category-page')).toHaveTextContent('Filter by price')

    // input
    expect(screen.queryByLabelText('input-product-name')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-manufacturer')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-min-price')).toBeInTheDocument()
    expect(screen.queryByLabelText('input-max-price')).toBeInTheDocument()

    // buttons
    expect(screen.queryByRole('button', { name: 'filter' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'reset' })).toBeInTheDocument()

    // summary, number of product
    expect(screen.queryByTestId('category-page')).toHaveTextContent('# of products')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')

    // list of items
    expect(screen.queryByLabelText('list-items-header')).toBeInTheDocument()
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
  })

  it('filter by product name: 1 product match', () => {
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

    // Reset filter
    fireEvent.click(resetButton)
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter by product name: 0 product match', () => {
    // None product matched
    fireEvent.change(screen.getByLabelText('input-product-name'), {
      target: { value: 'nothing' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    // Reset filter
    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter by manufacturer: 1 product match', () => {
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'xoon' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter by manufacturer: 0 product match', () => {
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'not in the list' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it ('filter by min-price: 1 product match', () => {
    fireEvent.change(screen.getByLabelText('input-min-price'), {
      target: { value: '40' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it ('filter by max-price: 1 product match', () => {
    fireEvent.change(screen.getByLabelText('input-max-price'), {
      target: { value: '40' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 1')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it ('filter by max-price: 0 product match', () => {
    fireEvent.change(screen.getByLabelText('input-max-price'), {
      target: { value: '20' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it ('filter by min-price: 0 product match', () => {
    fireEvent.change(screen.getByLabelText('input-min-price'), {
      target: { value: '70' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    expect(screen.queryByLabelText('no-product')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(2)
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('2')
  })

  it('filter combination product name, manufacturer, and min-price: 1 product match', () => {
    fireEvent.change(screen.getByLabelText('input-min-price'), {
      target: { value: '40' }
    })
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'xoon' }
    })
    fireEvent.change(screen.getByLabelText('input-product-name'), {
      target: { value: 'accessory 2' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    expect(screen.queryAllByLabelText('item-content').length).toBe(1)
    expect(screen.queryAllByLabelText('item-content')[0]).toHaveTextContent('accessory 2')
    expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('1')
  })

  it('filter combination product name, manufacturer, and min-price: 0 product match', async () => {
    fireEvent.change(screen.getByLabelText('input-min-price'), {
      target: { value: '20' }
    })
    fireEvent.change(screen.getByLabelText('input-manufacturer'), {
      target: { value: 'nouke' }
    })

    fireEvent.change(screen.getByLabelText('input-product-name'), {
      target: { value: 'accessory 2' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'filter' }))
    // expect(screen.queryAllByLabelText('item-content').length).toBe(0)
    // expect(screen.queryByLabelText('list-items-length')).toHaveTextContent('0')
    // expect(screen.queryByLabelText('no-product')).toBeInTheDocument()
  })
})