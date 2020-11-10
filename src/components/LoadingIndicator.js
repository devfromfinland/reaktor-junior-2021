import React from 'react'
import { ReactComponent as Indicator } from './three-dots.svg'

const LoadingIndicator = (props) => {
  return (
    <Indicator {...props} fill='#18447e'/>
  )
}

export default LoadingIndicator