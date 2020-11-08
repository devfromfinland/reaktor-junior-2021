import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import axios from 'axios'
import './App.css'

const App = () => {
  const [ jackets, setJackets ] = useState(null)
  const [ shirts, setShirts ] = useState(null)
  const [ accessories, setAccessories ] = useState(null)
  const [ isLoaded, setIsLoaded ] = useState(false)

  useEffect(() => {
    fetchAllData()

    return () => {
      // cancel API query if necessary
    }
  }, [])

  const fetchAllData = async () => {
    const res1 = await axios.get('https://bad-api-assignment.reaktor.com/products/jackets')
    const res2 = await axios.get('https://bad-api-assignment.reaktor.com/products/shirts')
    const res3 = await axios.get('https://bad-api-assignment.reaktor.com/products/accessories')
    setIsLoaded(true)
    setJackets(res1.data)
    setShirts(res2.data)
    setAccessories(res3.data)
    // jackets: 7686 items ~ 1.3 MB memory
    // shirts: 6815 items ~ 1.2 MB memory
    // accessories: 5381 items ~ 1 MB memory
    // 3 MB is not too bad for saving in memory
  }

  if (!isLoaded) {
    return (
    <div>Page is loading...</div>
  )} else {
    return (
      <Router>
        <div>
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
          
          <Switch>
            <Route path='/' exact render={() => (<div>Hello world</div>)}/>
            <Route path='/:category' render={({ match }) => {
              switch (match.params.category) {
                case 'jackets':
                  return <CategoryPage data={jackets}/>
                case 'shirts':
                  return <CategoryPage data={shirts}/>
                case 'accessories':
                  return <CategoryPage data={accessories}/>
                default:
                  return <CategoryPage />
              }
            }}/>
            <Route path='*' render={() => (<div>404</div>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App