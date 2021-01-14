/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import linkedin from './linkedin.png'
import github from './github.png'
// import { ReactComponent as LinkedIn } from './linkedin.svg'

const HomePage = () => {
  return (
    <div aria-label="homepage">
      <h1>Warehouse portal</h1>
      <p>A simple web app for a clothing brand to use in their warehouses</p>

      <h3>Web app features:</h3>
      <ul>
        <li>Allow the clothing brand to use the two existing legacy APIs</li>
        <li>
          Implement work around for bad API
          (handled by back-end middle server/lambda function)
        </li>
        <li>
          Allow users to quickly check product availability
          information from a single UI with different filters
        </li>
        <li>Improve User Experience</li>
        <li>
          Quick page loading and reloading (scored ~99/100 on mobile and 100/100 on desktop)
          via <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fjunior-reaktor.ykitest.fi%2F&tab=mobile">PageSpeed Insights</a>
        </li>
        <li>
          Allow users to use web app when offline,
          data will be updated once user has internet connection again
        </li>
        <li>Acceptable display in mobile (I did not want to spend too much time on this)</li>
      </ul>

      <div style={{ marginTop: '40px', fontSize: '16px', color: 'rgb(24, 68, 126)' }}>
        Developed by
        {' '}
        <span style={{ fontWeight: 'bold' }}>Viet Phan</span>
        {' '}
        as part of the pre-assignment for junior developer position (
        <a href="https://www.reaktor.com/junior-dev-assignment/">the assignment</a>
        ).
        <div style={{ marginTop: '8px' }}>
          <a href="https://www.linkedin.com/in/phanviet/">
            <img src={linkedin} alt="linkedin" height="30px" />
          </a>
          {' '}
          <a href="https://github.com/devfromfinland/reaktor-junior-2021">
            <img src={github} alt="github" height="30px" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default HomePage
