import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavigationBar = () => {
  const location = useLocation()

  const renderMenuItem = (pathname, name) => {
    return (
      <li aria-label={name} className={location.pathname === pathname ? 'active' : null}>
        <Link to={pathname}>
          {name}
        </Link>
      </li>
    )
  }

  return (
    <nav>
      <ul className="navigation">
        { renderMenuItem('/', 'Home') }
        { renderMenuItem('/category/jackets', 'Jackets') }
        { renderMenuItem('/category/shirts', 'Shirts') }
        { renderMenuItem('/category/accessories', 'Accessories') }
      </ul>
    </nav>
  )
}

export default NavigationBar
