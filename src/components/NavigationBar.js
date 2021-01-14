import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavigationBar = () => {
  const location = useLocation()

  // const MenuItem = ({ pathname, name }) => {
  //   return (
  //     <li aria-label={name} className={location.pathname === pathname ? 'active' : null}>
  //       <Link to={pathname}>
  //         {name}
  //       </Link>
  //     </li>
  //   )
  // }

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
    <nav id="nav-bar">
      <ul className="navigation">
        {/* <MenuItem pathname="/" name="Home" />
        <MenuItem pathname="/category/gloves" name="Gloves" />
        <MenuItem pathname="/category/facemasks" name="Facemasks" />
        <MenuItem pathname="/category/beanies" name="Beanies" /> */}
        {/* { categories.map((item) => (
          <MenuItem
            pathname={`/category/${item}`}
            name={item}
            key={item}
          />
        ))} */}
        { renderMenuItem('/', 'Home') }
        { renderMenuItem('/category/gloves', 'Gloves') }
        { renderMenuItem('/category/facemasks', 'Facemasks') }
        { renderMenuItem('/category/beanies', 'Beanies') }
      </ul>
    </nav>
  )
}

export default NavigationBar
