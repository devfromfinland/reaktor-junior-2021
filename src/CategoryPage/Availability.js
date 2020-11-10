import React from 'react'
import { useAppContext } from '../services/contextService'
import { findAvailability } from '../utils/helpers'

const Availability = ({ manufacturer, id }) => {
  const { context } = useAppContext()
  const promise = context[manufacturer].read()
  const availability = findAvailability(promise.data.response, id)

  const addStyle = (status) => {
    switch (status) {
      case 'INSTOCK':
        return <span className='instock'>available</span>
      case 'LESSTHAN10':
        return <span className='lessthan10'>less than 10</span>
      case 'OUTOFSTOCK':
        return <span className='outofstock'>out of stock</span>
      default:
        return status
    }
  }

  return (
    <div>
      { addStyle(availability) }
    </div>
  )
}

export default Availability