import React from 'react'
import indicator from './three-dots.svg'

const LoadingIndicator = ({ width, height, inlineText }) => {
  return (
    <div>
      <img src={indicator} alt='loading...' height={height}/> {inlineText ? inlineText : null}
    </div>
  )
}

export default LoadingIndicator