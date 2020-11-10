import React, { Suspense } from 'react'
import Availability from './Availability'

/* Item object
  id: String
  manufacturer: String
  name: String
  price: Int
  type: String ('jacket' | 'shirts' | 'accessories')
  color: Array of String
*/

const Item = ({ data, index, style }) => {
  return (
    <div style={style} className={(index % 2 === 0) ? 'item odd' : 'item'}>
      <div className='item-content'>
        <div>{data[index].name}</div>
        <div>{data[index].manufacturer}</div>
        <div>{data[index].price}</div>
        <div>{data[index].color.toString()}</div>
        <Suspense fallback={<div>checking...</div>}>
          <Availability manufacturer={data[index].manufacturer} id={data[index].id}/>
        </Suspense>
      </div>
    </div>
  )
}

export default Item