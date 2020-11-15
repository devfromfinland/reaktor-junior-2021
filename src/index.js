import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import * as swRegistration from './swRegistration'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

// opt-in experimental Concurrent Mode
ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(<App />)

// Register for the app to work offline and load faster.
// Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()