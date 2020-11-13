import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

test('render main elements in root', () => {
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

test('navigate to Jackets category', () => {
  render(<App />)
  fireEvent.click(screen.getByText('Jackets'))

  // check navigation active status changed from Home to Jackets
  expect(screen.queryByRole('listitem', { name: 'Home' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).not.toHaveClass('active')

  // check main elements are rendered
  // filter

  // summary, number of product 1


  // check loading data indicator


  // list table
})