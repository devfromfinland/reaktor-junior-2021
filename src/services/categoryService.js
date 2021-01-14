import axios from 'axios'

export const CATEGORIES = ['gloves', 'facemasks', 'beanies']

const forcedError = false
const apiUrl = 'https://jyyfgl2f69.execute-api.eu-west-1.amazonaws.com/dev'
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
  return result
}
