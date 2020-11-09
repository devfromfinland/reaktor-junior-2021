import React from 'react'
import { useAppContext } from '../services/contextService'
import { findAvailability } from '../utils/helpers'

const Availability = ({ manufacturer, id }) => {
  const { context } = useAppContext()
  const promise = context[manufacturer].read()
  const availability = findAvailability(promise.data.response, id)

  return (
    <div>
      { availability }
    </div>
  )
}

export default Availability