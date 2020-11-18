import React, { useState } from 'react'
import { useAppContext } from '../services/contextService'
import { findAvailability } from '../utils/helpers'
import LoadingIndicator from '../components/LoadingIndicator'
import { fetchAvailability } from '../services/categoryService'

const Availability = ({ manufacturer, id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { context, setContext } = useAppContext()
  // eslint-disable-next-line react/destructuring-assignment
  const promise = context[manufacturer] ? context[manufacturer].read() : null
  const availability = promise ? findAvailability(promise.data.response, id) : 'Fatal Error'

  const refetchAvailability = () => {
    setIsLoading(true)

    // clear cache for that route
    if ('caches' in window && process.env.NODE_ENV === 'production') {
      caches.open('availability-request')
        .then((cache) => {
          cache.delete(`/availability/${manufacturer}`)
          // console.log(`cache for ${manufacturer} removed`)
        })
        .catch((err) => console.log('error while removing cache', err))
    }

    // fetch data
    const refetchedData = fetchAvailability(manufacturer)

    // update state
    setContext({
      ...context,
      [manufacturer]: refetchedData,
      reload: !context.reload // switch flag for reload component
    })

    setIsLoading(false)
  }

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
      case 'not found':
        return <button type="button" disabled={isLoading} onClick={refetchAvailability}>reload</button>
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
