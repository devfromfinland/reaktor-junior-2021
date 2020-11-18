import React from 'react'
import LoadingIndicator from './LoadingIndicator'

const LoadingScreen = () => {
  return (
    <div className="loading-container" aria-label="loading-indicator">
      <LoadingIndicator className="loading-indicator" />
      <div className="loading-text">
        Loading...
      </div>
    </div>
  )
}

export default LoadingScreen
