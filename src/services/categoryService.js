import axios from 'axios'
import { convertArrayToObject } from '../utils/helpers'

const forcedError = false
const apiUrl = 'https://bad-api-assignment.reaktor.com'
const headerForcedError = forcedError ? { headers: { 'x-force-error-mode': 'all' }} : null

export const getProductsByCategory = async (category) => {
  try {
    const res = forcedError
      ? await axios.get(`${apiUrl}/products/${category}`, {
        headers: {
          'x-force-error-mode': 'all'
        }
      })
      : await axios.get(`${apiUrl}/products/${category}`)

    // const { count, manufacturers } = countManufacturers(res.data)
    // console.log(`${category} has ${count} manufacturers`)
    // console.log('manufacturers:', manufacturers)

    return res.data
  } catch (err) {
    // todo: handle err
    console.log('error', err)
  }
}

export const getAvailabilityInfo = async (manufacturer) => {
  try {
    const res = forcedError
      ? await axios.get(`${apiUrl}/availability/${manufacturer}`, {
        headers: {
          'x-force-error-mode': 'all'
        }
      })
      : await axios.get(`${apiUrl}/availability/${manufacturer}`)
    
    // console.log(res)
    const result = convertArrayToObject(res.data.response, 'id')
    // console.log('result', result)
    return result
  } catch (err) {
    console.log('error', err)
  }
}

// temporarily used for learning React Suspend
// check out: https://codesandbox.io/s/frosty-hermann-bztrp
const wrapPromise = (promise) => {
  let status = 'pending'
  let result
  let suspender = promise.then(
    r => {
      status = 'success'
      result = r
    },
    e => {
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
    }
  }
}

// to add then in axios.get of manufacturers
export const fetchData = () => {
  let jacketsPromise = axios.get(`${apiUrl}/products/jackets`, headerForcedError).then(res => res.data)
  let shirtsPromise = axios.get(`${apiUrl}/products/shirts`, headerForcedError).then(res => res.data)
  let accessoriesPromise = axios.get(`${apiUrl}/products/accessories`, headerForcedError).then(res => res.data)
  let repsPromise = axios.get(`${apiUrl}/availability/reps`, headerForcedError)
  let abiplosPromise = axios.get(`${apiUrl}/availability/abiplos`, headerForcedError)
  let noukePromise = axios.get(`${apiUrl}/availability/nouke`, headerForcedError)
  let derpPromise = axios.get(`${apiUrl}/availability/derp`, headerForcedError)
  let xoonPromise = axios.get(`${apiUrl}/availability/xoon`,headerForcedError)

  return {
    jackets: wrapPromise(jacketsPromise),
    shirts: wrapPromise(shirtsPromise),
    accessories: wrapPromise(accessoriesPromise),
    reps: wrapPromise(repsPromise),
    abiplos: wrapPromise(abiplosPromise),
    nouke: wrapPromise(noukePromise),
    derp: wrapPromise(derpPromise),
    xoon: wrapPromise(xoonPromise),
  }
}