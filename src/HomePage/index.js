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
      </ul>

      <h3>New features under development:</h3>
      <ul>
        <li>Responsive User Interface, available for mobile users</li>
        <li>Filter product by colors</li>
        <li>Filter product by availability</li>
        <li>Handle error: not found product availability</li>
      </ul>
    </div>
  )
}

export default HomePage