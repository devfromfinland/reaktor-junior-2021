import React from 'react'

const HomePage = () => {
  return (
    <div aria-label='homepage'>
      <h1>Warehouse portal</h1>
      <p>A simple web app for a clothing brand to use in their warehouses</p>

      <h3>Web app features:</h3>
      <ul>
        <li>Using the existing two legacy APIs</li>
        <li>Quickly check product availability information from a single UI with filters</li>
        <li>Available offline, data will be updated once user has internet connection again</li>
        <li>Improved User Experience and Loading Speed</li>
        <li>Implement work around for bad HTTP Response (code 204, no body content)</li>
        <li>Viewable in mobile (I didn't want to spend too much time on this)</li>
      </ul>

      <h3>Features under development:</h3>
      <ul>
        <li>Filter product by colors</li>
        <li>Filter product by availability</li>
      </ul>
    </div>
  )
}

export default HomePage