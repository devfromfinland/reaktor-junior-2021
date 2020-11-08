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
    <div style={style} className={(index % 2 === 0) ? 'item odd' : 'item'}>
      <div className='item-content'>
        <div>{data[index].name}</div>
        <div>{data[index].manufacturer}</div>
        <div>{data[index].price}</div>
        <div>{data[index].color.toString()}</div>
        <div>availability?</div>
      </div>
    </div>
  )
}

export default Item