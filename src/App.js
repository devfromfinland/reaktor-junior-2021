import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import './App.css'

const App = () => {
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
          <Route path='/:category' component={CategoryPage} />
          <Route path='*' render={() => (<div>404</div>)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App