import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import { getProductsByCategory, getAvailabilityInfo } from './services/categoryService'
import NavigationBar from './components/NavigationBar'
import { AppContext } from '../services/contextService'
import './App.css'

// NOTE ON DATA

// jackets: 7686 items ~ 1.3 MB memory
// shirts: 6815 items ~ 1.2 MB memory
// accessories: 5381 items ~ 1 MB memory
// total mem size: 3.5 MB (not too bad for saving them all in memory)

// jackets has 5 manufacturers: "reps", "abiplos", "nouke", "derp", "xoon"
// shirts has 5 manufacturers: "derp", "abiplos", "nouke", "reps", "xoon"
// accessories has 5 manufacturers: "xoon", "reps", "nouke", "derp", "abiplos"
// total manufacturers: 5 ("reps", "abiplos", "nouke", "derp", "xoon")

// check availability (consume CPU power and network speed)
// 'reps': 8495 products (1 MB)
// 'abiplos': 8459 products (1 MB)
// 'nouke': 8593 products (1 MB)
// 'derp': 8642 products (1 MB)
// 'xoon': 8414 products (1 MB)

// const data = fetchDataFromAPI()

const App = () => {
  const [ jackets, setJackets ] = useState(null)
  const [ shirts, setShirts ] = useState(null)
  const [ accessories, setAccessories ] = useState(null)
  const [ availabilityData, setAvailabilityData ] = useState({})
  const [ context, setContext ] = useState({})

  useEffect(() => {
    fetchAllData()

    return () => {
      // cancel API query if necessary
    }
  }, [])

  const fetchAllData = async () => {
    // todo: change data fetching to lazyload, Relay or Suspense

    setJackets(await getProductsByCategory('jackets'))
    setShirts(await getProductsByCategory('shirts'))
    setAccessories(await getProductsByCategory('accessories'))

    // const reps = await getAvailabilityInfo('reps')
    // setAvailabilityData(availabilityData => ({
    //   ...availabilityData,
    //   reps
    // }))

    // const abiplos = await getAvailabilityInfo('abiplos')
    // setAvailabilityData(availabilityData => ({
    //   ...availabilityData,
    //   abiplos
    // }))

    // const nouke = await getAvailabilityInfo('nouke')
    // setAvailabilityData(availabilityData => ({
    //   ...availabilityData,
    //   nouke
    // }))

    // const derp = await getAvailabilityInfo('derp')
    // setAvailabilityData(availabilityData => ({
    //   ...availabilityData,
    //   derp
    // }))

    // const xoon = await getAvailabilityInfo('xoon')
    // setAvailabilityData(availabilityData => ({
    //   ...availabilityData,
    //   xoon
    // }))
  }

  return (
    <AppContext.Provider value={{ context, setContext }}>
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
    </AppContext.Provider>
  )
}

export default App