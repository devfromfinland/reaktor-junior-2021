import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavigationBar from '../components/NavigationBar'
import { MemoryRouter } from 'react-router-dom'

it('render all menu items', () => {
  render(
    <MemoryRouter>
      <NavigationBar />
    </MemoryRouter>
  )
  
  expect(screen.queryByRole('listitem', { name: 'Home' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).toBeInTheDocument()

  // check active navigation item is Home
  expect(screen.queryByRole('listitem', { name: 'Home' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).not.toHaveClass('active')

  fireEvent.click(screen.getByText('Jackets'))
  expect(screen.queryByRole('listitem', { name: 'Jackets' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Home' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).not.toHaveClass('active')

  fireEvent.click(screen.getByText('Shirts'))
  expect(screen.queryByRole('listitem', { name: 'Shirts' })).toHaveClass('active')

  fireEvent.click(screen.getByText('Accessories'))
  expect(screen.queryByRole('listitem', { name: 'Accessories' })).toHaveClass('active')
})