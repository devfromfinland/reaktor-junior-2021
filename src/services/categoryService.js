import axios from 'axios'
import { convertArrayToObject } from '../utils/helpers'

const apiUrl = 'https://bad-api-assignment.reaktor.com'
const forcedError = false

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