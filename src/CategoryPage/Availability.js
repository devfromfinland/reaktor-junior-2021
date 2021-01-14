import React, { useState } from 'react'
import { useAppContext } from '../services/contextService'
import { findAvailability } from '../utils/helpers'
import LoadingIndicator from '../components/LoadingIndicator'

const Availability = ({ manufacturer, id }) => {
  const [isLoading] = useState(false)
  const { context } = useAppContext()
  // eslint-disable-next-line react/destructuring-assignment
  const promise = context[manufacturer] ? context[manufacturer].read() : null
  const availability = promise ? findAvailability(promise.data.response, id) : 'Fatal Error'

  const addStyle = (status) => {
    switch (status) {
      case 'INSTOCK':
        return <span className="instock">yes</span>
      case 'LESSTHAN10':
        return <span className="lessthan10">{'< 10'}</span>
      case 'OUTOFSTOCK':
        return <span className="outofstock">no</span>
      case 'Fatal Error':
        console.log('Error: Availability variable was not set up')
        return <span className="outofstock">Error!</span>
      default:
        return status
    }
  }

  return (
    <div>
      { isLoading
        ? <LoadingIndicator className="small-loading-indicator" />
        : addStyle(availability) }
    </div>
  )
}

export default Availability
