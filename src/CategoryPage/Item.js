import React, { Suspense } from 'react'
import Availability from './Availability'
import LoadingIndicator from '../components/LoadingIndicator'

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
    <div style={style} className={(index % 2 === 0) ? 'odd' : 'even'}>
      <div className='item-content'>
        <div>{data[index].name}</div>
        <div>{data[index].manufacturer}</div>
        <div>{data[index].price}</div>
        <div>{data[index].color.toString()}</div>
        <Suspense fallback={<div><LoadingIndicator className='small-loading-indicator'/></div>}>
          <Availability manufacturer={data[index].manufacturer} id={data[index].id}/>
        </Suspense>
      </div>
    </div>
  )
}

export default Item