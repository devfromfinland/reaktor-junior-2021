import React from 'react'
import LoadingIndicator from '../components/LoadingIndicator'

const LoadingScreen = () => {
  return (
    <div className='loading-container' aria-label='loading-indicator'>
      <LoadingIndicator className='loading-indicator'/>
      <div className='loading-text'>
        Loading...
      </div>
    </div>
  )
}

export default LoadingScreen