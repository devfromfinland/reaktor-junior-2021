import axios from 'axios'

const apiUrl = 'https://bad-api-assignment.reaktor.com'

export const getProductsByCategory = async (category) => {
  try {
    const res = await axios.get(`${apiUrl}/products/${category}`, {
      headers: {
        'x-force-error-mode': 'all'
      }
    })

    return res.data
  } catch (err) {
    // todo: handle err
    console.log('error', err)
  }
}