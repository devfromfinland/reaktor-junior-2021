import axios from 'axios'

export const CATEGORIES = ['gloves', 'facemasks', 'beanies']
export const MANUFACTURERS = ['ippal', 'abiplos', 'niksleh', 'laion', 'okkau', 'umpante']

const forcedError = false
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://bad-api-assignment.reaktor.com/v2'
  : 'http://localhost:4000'
const headerForcedError = forcedError
  ? { headers: { 'x-force-error-mode': 'all' } }
  : null

// temporarily used for learning React Suspense
// check out: https://codesandbox.io/s/frosty-hermann-bztrp
const wrapPromise = (promise) => {
  let status = 'pending'
  let result
  const suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    }
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
      return result
    }
  }
}

export const fetchNewData = () => {
  const result = {}
  CATEGORIES.forEach((category) => {
    result[category] = wrapPromise(axios.get(`${apiUrl}/products/${category}`, headerForcedError))
  })
  MANUFACTURERS.forEach((manufacturer) => {
    result[manufacturer] = wrapPromise(axios.get(`${apiUrl}/availability/${manufacturer}`, headerForcedError))
  })
  return result
}
