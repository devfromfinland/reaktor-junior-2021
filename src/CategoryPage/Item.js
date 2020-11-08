import React from 'react'

/* Item object
  id: String
  manufacturer: String
  name: String
  price: Int
  type: String ('jacket' | 'shirts' | 'accessories')
  color: Array of String
*/

const Item = ({ data, index, style }) => {
  // console.log('item', data[index])
  return (
    <div style={style}>
      {data[index].name}
    </div>
  )
}

export default Item