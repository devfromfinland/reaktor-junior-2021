import React, { useState, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import { fetchData } from './services/categoryService'
import NavigationBar from './components/NavigationBar'
import { AppContext } from './services/contextService'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingIndicator from './components/LoadingIndicator'
import HomePage from './HomePage'
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
// const data = fetchData()

const App = () => {
  const [ context, setContext ] = useState(() => fetchData())

  const LoadingScreen = () => {
    return (
      <div className='container'>
        <LoadingIndicator className='loading-indicator'/>
        <div className='loading-text'>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <Router>
        <div style={{ height: '100%' }} data-testid='test001'>
          <NavigationBar />
          
          <Switch>
            <Route path='/' exact render={() => (<HomePage />)}/>
            <Route path='/category/:category'>
              <ErrorBoundary fallback={<div>Error while fetching data...</div>}>
                <Suspense fallback={<LoadingScreen />}>
                  <CategoryPage />
                </Suspense>
              </ErrorBoundary>
            </Route>
            <Route path='*' render={() => (<div>404</div>)} />
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App