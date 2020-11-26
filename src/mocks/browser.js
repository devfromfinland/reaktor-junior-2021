// setup Mock Service Worker for 'development', interaction on browser
import { setupWorker } from 'msw'
import handlers from './handlers'

const worker = setupWorker(...handlers)

export default worker
