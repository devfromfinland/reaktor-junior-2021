// mock APIs for testing and development
// Docs: https://mswjs.io/docs/
import { rest } from 'msw'
import { apiUrl } from '../services/categoryService'

const handlers = [
  rest.get(`${apiUrl}/products/gloves`, (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item01',
          type: 'gloves',
          name: 'Cool jacket',
          color: ['blue'],
          price: 50,
          manufacturer: 'reps',
          availability: 'INSTOCK'
        }
      ])
    )
  }),

  rest.get(`${apiUrl}/products/facemasks`, (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item02',
          type: 'facemasks',
          name: 'Cool shirt',
          color: ['green'],
          price: 60,
          manufacturer: 'nouke',
          availability: 'INSTOCK'
        }
      ])
    )
  }),

  rest.get(`${apiUrl}/products/beanies`, (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item03',
          type: 'beanies',
          name: 'Cool accessory 1',
          color: ['yellow'],
          price: 30,
          manufacturer: 'nouke',
          availability: 'INSTOCK'
        },
        {
          id: 'item04',
          type: 'beanies',
          name: 'Cool accessory 2',
          color: ['yellow', 'blue'],
          price: 60,
          manufacturer: 'xoon',
          availability: 'INSTOCK'
        },
      ])
    )
  }),
]

export default handlers
