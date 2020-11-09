import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/jackets'>Jackets</Link>
        </li>
        <li>
          <Link to='/shirts'>Shirts</Link>
        </li>
        <li>
          <Link to='/accessories'>Accessories</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar