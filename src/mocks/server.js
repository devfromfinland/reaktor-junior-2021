// setup Mock Service Worker for 'test', interaction on node
import { setupServer } from 'msw/node'
import handlers from './handlers'

const server = setupServer(...handlers)

export default server
