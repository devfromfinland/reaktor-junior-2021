import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import { getProductsByCategory } from './services/categoryService'
import NavigationBar from './components/NavigationBar'
import './App.css'

const App = () => {
  const [ jackets, setJackets ] = useState(null)
  const [ shirts, setShirts ] = useState(null)
  const [ accessories, setAccessories ] = useState(null)

  useEffect(() => {
    fetchAllData()

    return () => {
      // cancel API query if necessary
    }
  }, [])

  const fetchAllData = async () => {
    setJackets(await getProductsByCategory('jackets'))
    setShirts(await getProductsByCategory('shirts'))
    setAccessories(await getProductsByCategory('accessories'))
  
    // jackets: 7686 items ~ 1.3 MB memory
    // shirts: 6815 items ~ 1.2 MB memory
    // accessories: 5381 items ~ 1 MB memory
    // 3 MB is not too bad for saving them all in memory
  }

  return (
    <Router>
      <div style={{ height: '100%' }}>
        <NavigationBar />
        
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
                return <div>404 page</div>
            }
          }}/>
          {/* <Route path='*' render={() => (<div>404</div>)} /> */}
        </Switch>
      </div>
    </Router>
  )
}

export default App