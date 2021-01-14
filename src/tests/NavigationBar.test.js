import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

it('render all menu items', () => {
  render(
    <MemoryRouter>
      <NavigationBar />
    </MemoryRouter>
  )

  expect(screen.queryByRole('listitem', { name: 'Home' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Gloves' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Facemasks' })).toBeInTheDocument()
  expect(screen.queryByRole('listitem', { name: 'Beanies' })).toBeInTheDocument()

  // check active navigation item is Home
  expect(screen.queryByRole('listitem', { name: 'Home' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Gloves' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Facemasks' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Beanies' })).not.toHaveClass('active')

  fireEvent.click(screen.getByText('Gloves'))
  expect(screen.queryByRole('listitem', { name: 'Gloves' })).toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Home' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Facemasks' })).not.toHaveClass('active')
  expect(screen.queryByRole('listitem', { name: 'Beanies' })).not.toHaveClass('active')

  fireEvent.click(screen.getByText('Facemasks'))
  expect(screen.queryByRole('listitem', { name: 'Facemasks' })).toHaveClass('active')

  fireEvent.click(screen.getByText('Beanies'))
  expect(screen.queryByRole('listitem', { name: 'Beanies' })).toHaveClass('active')
})
