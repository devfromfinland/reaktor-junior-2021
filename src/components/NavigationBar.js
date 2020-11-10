import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavigationBar = () => {
  const location = useLocation()

  const renderMenuItem = (pathname, name) => {
    return (
      <li>
        <Link
          to={pathname}
          className={location.pathname === pathname ? 'active' : null}
        >
          {name}
        </Link>
      </li>
    )
  }

  return (
    <nav>
      <ul className='navigation'>
        { renderMenuItem('/', 'Home') }
        { renderMenuItem('/category/jackets', 'Jackets') }
        { renderMenuItem('/category/shirts', 'Shirts') }
        { renderMenuItem('/category/accessories', 'Accessories') }
      </ul>
    </nav>
  )
}

export default NavigationBar