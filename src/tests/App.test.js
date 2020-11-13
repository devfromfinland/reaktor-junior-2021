import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('render main elements', () => {
  render(<App />)
  const mainDiv = screen.getByTestId('test001')
  const navBar = screen.getByTestId('test002')
  const homePage = screen.getByTestId('test003')
  console.log(navBar)
  expect(mainDiv).toBeInTheDocument()
  expect(navBar).toBeInTheDocument()
  expect(homePage).toBeInTheDocument()
})