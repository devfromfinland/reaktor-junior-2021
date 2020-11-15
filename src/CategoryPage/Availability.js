import React from 'react'
import { useAppContext } from '../services/contextService'
import { findAvailability } from '../utils/helpers'

const Availability = ({ manufacturer, id }) => {
  const { context } = useAppContext()
  const promise = context[manufacturer]? context[manufacturer].read() : null
  const availability = promise ? findAvailability(promise.data.response, id) : 'Fatal Error'

  const addStyle = (status) => {
    switch (status) {
      case 'INSTOCK':
        return <span className='instock'>in stock</span>
      case 'LESSTHAN10':
        return <span className='lessthan10'>less than 10</span>
      case 'OUTOFSTOCK':
        return <span className='outofstock'>out of stock</span>
      case 'Fatal Error':
        console.log('Error: Availability variable was not set up')
        return <span className='outofstock'>Error!</span>
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