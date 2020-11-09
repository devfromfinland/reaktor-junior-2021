import axios from 'axios'
import { countManufacturers, convertArrayToObject, readAvailabilityData } from '../utils/helpers'

const apiUrl = 'https://bad-api-assignment.reaktor.com'

export const getProductsByCategory = async (category) => {
  try {
    const res = await axios.get(`${apiUrl}/products/${category}`, {
      headers: {
        'x-force-error-mode': 'all'
      }
    })

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
    const res = await axios.get(`${apiUrl}/availability/${manufacturer}`)
    // console.log(res)
    const result = convertArrayToObject(res.data.response, 'id')
    // console.log('result', result)
    return result
  } catch (err) {
    console.log('error', err)
  }
}