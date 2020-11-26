// mock APIs for testing and development
// Docs: https://mswjs.io/docs/
import { rest } from 'msw'

const handlers = [
  rest.get('https://bad-api-assignment.reaktor.com/products/jackets', (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item01',
          type: 'jackets',
          name: 'Cool jacket',
          color: ['blue'],
          price: 50,
          manufacturer: 'reps'
        }
      ])
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/products/shirts', (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item02',
          type: 'shirts',
          name: 'Cool shirt',
          color: ['green'],
          price: 60,
          manufacturer: 'nouke'
        }
      ])
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/products/accessories', (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json([
        {
          id: 'item03',
          type: 'accessories',
          name: 'Cool accessory 1',
          color: ['yellow'],
          price: 30,
          manufacturer: 'nouke'
        },
        {
          id: 'item04',
          type: 'accessories',
          name: 'Cool accessory 2',
          color: ['yellow', 'blue'],
          price: 60,
          manufacturer: 'xoon'
        },
      ])
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/availability/reps', (req, res, ctx) => {
    return res(
      // ctx.delay(4000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json({
        code: 200,
        response: [
          {
            id: 'item01',
            DATAPAYLOAD: '<AVAILABILITY><INSTOCKVALUE>INSTOCK</INSTOCKVALUE></AVAILABILITY'
          }
        ]
      })
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/availability/nouke', (req, res, ctx) => {
    return res(
      // ctx.delay(4000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json({
        code: 200,
        response: [
          {
            id: 'item02',
            DATAPAYLOAD: '<AVAILABILITY><INSTOCKVALUE>LESSTHAN10</INSTOCKVALUE></AVAILABILITY'
          },
          {
            id: 'item03',
            DATAPAYLOAD: '<AVAILABILITY><INSTOCKVALUE>INSTOCK</INSTOCKVALUE></AVAILABILITY'
          }
        ]
      })
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/availability/xoon', (req, res, ctx) => {
    return res(
      // ctx.delay(4000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json({
        code: 200,
        response: [
          {
            id: 'item04',
            DATAPAYLOAD: '<AVAILABILITY><INSTOCKVALUE>OUTOFSTOCK</INSTOCKVALUE></AVAILABILITY'
          }
        ]
      })
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/availability/derp', (req, res, ctx) => {
    return res(
      // ctx.delay(4000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json({
        code: 200,
        response: []
      })
    )
  }),

  rest.get('https://bad-api-assignment.reaktor.com/availability/abiplos', (req, res, ctx) => {
    return res(
      // ctx.delay(4000),
      ctx.status(200),
      ctx.set('Access-Control-Allow-Origin', '*'),
      ctx.json({
        code: 200,
        response: []
      })
    )
  }),
]

export default handlers
