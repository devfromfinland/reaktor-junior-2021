import React from 'react'

const ColoredBox = ({ color }) => {
  return (
    <div style={{ 
      backgroundColor: color,
      height: '18px',
      width: '18px',
      marginRight: '2px',
      border: '1px solid black',
      float: 'left'
    }}></div>
  )
}

export default ColoredBox