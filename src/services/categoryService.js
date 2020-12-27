import axios from 'axios'
import { convertArrayToObject } from '../utils/helpers'

const forcedError = false
const apiUrl = 'https://bad-api-assignment.reaktor.com/v2'
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

// to add then in axios.get of manufacturers
export const fetchData = () => {
  const jacketsPromise = axios.get(`${apiUrl}/products/jackets`, headerForcedError)
  const shirtsPromise = axios.get(`${apiUrl}/products/shirts`, headerForcedError)
  const accessoriesPromise = axios.get(`${apiUrl}/products/accessories`, headerForcedError)
  const repsPromise = axios.get(`${apiUrl}/availability/reps`, headerForcedError)
  const abiplosPromise = axios.get(`${apiUrl}/availability/abiplos`, headerForcedError)
  const noukePromise = axios.get(`${apiUrl}/availability/nouke`, headerForcedError)
  const derpPromise = axios.get(`${apiUrl}/availability/derp`, headerForcedError)
  const xoonPromise = axios.get(`${apiUrl}/availability/xoon`, headerForcedError)

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

export const fetchNewData = () => {
  const glovesPromise = axios.get(`${apiUrl}/products/gloves`, headerForcedError)
  const facemasksPromise = axios.get(`${apiUrl}/products/facemasks`, headerForcedError)
  const beaniesPromise = axios.get(`${apiUrl}/products/beanies`, headerForcedError)
  const repsPromise = axios.get(`${apiUrl}/availability/reps`, headerForcedError)
  const abiplosPromise = axios.get(`${apiUrl}/availability/abiplos`, headerForcedError)
  const noukePromise = axios.get(`${apiUrl}/availability/nouke`, headerForcedError)
  const derpPromise = axios.get(`${apiUrl}/availability/derp`, headerForcedError)
  const xoonPromise = axios.get(`${apiUrl}/availability/xoon`, headerForcedError)

  return {
    gloves: wrapPromise(glovesPromise),
    facemasks: wrapPromise(facemasksPromise),
    beanies: wrapPromise(beaniesPromise),
    reps: wrapPromise(repsPromise),
    abiplos: wrapPromise(abiplosPromise),
    nouke: wrapPromise(noukePromise),
    derp: wrapPromise(derpPromise),
    xoon: wrapPromise(xoonPromise),
  }
}

export const fetchProducts = (categories) => {
  const result = {}
  categories.forEach((category) => {
    // console.log('category', category)
    result[category] = wrapPromise(axios.get(`${apiUrl}/products/${category}`, headerForcedError))
  })
  return result
}

export const fetchAvailabilities = (manufacturers) => {
  const result = {}
  manufacturers.forEach((manufacturer) => {
    result[manufacturer] = wrapPromise(axios.get(`${apiUrl}/availability/${manufacturer}`))
  })
  return result
}

export const fetchAvailability = (manufacturer) => {
  const promise = axios.get(`${apiUrl}/availability/${manufacturer}`)
  return wrapPromise(promise)
}

// not in used
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
    return 'error'
  }
}

// not in used
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
    return 'error'
  }
}
