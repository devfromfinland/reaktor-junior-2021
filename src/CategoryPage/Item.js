import React from 'react'

/* Item object
  id: String
  manufacturer: String
  name: String
  price: Int
  type: String ('jacket' | 'shirts' | 'accessories')
  color: Array of String
*/

const Item = ({ item }) => {
  // console.log('item', item)
  return (
    <li>{item.name}</li>
  )
}

export default Item