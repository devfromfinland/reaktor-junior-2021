import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <nav>
      <ul class='navigation'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/category/jackets'>Jackets</Link>
        </li>
        <li>
          <Link to='/category/shirts'>Shirts</Link>
        </li>
        <li>
          <Link to='/category/accessories'>Accessories</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar