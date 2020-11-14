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
  beforeAll(async () => {
    render(<App />)
    
    // mock the window size for AutoSizer to render
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 500 })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 })

    fireEvent.click(screen.getByText('Accessories'))
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
})