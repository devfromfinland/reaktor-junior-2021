import React, { useState, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { fetchData } from './services/categoryService'
import NavigationBar from './components/NavigationBar'
import { AppContext } from './services/contextService'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './HomePage'
import './App.css'
import CategoryPage from './CategoryPage'

// use mock API for development
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   worker.start()
// }

const App = () => {
  const [ context, setContext ] = useState(() => fetchData())

  return (
    <AppContext.Provider value={{ context, setContext }}>
      <Router>
        <div aria-label='root-container' style={{ height: '100%' }}>
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