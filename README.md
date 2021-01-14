# Pre-assignment for Reaktor Junior 2021
This is the repo for Reaktor Junior 2021's pre-assignment ([assignment link](https://www.reaktor.com/junior-dev-assignment/))

In this assignment, I have built a simple web app for a clothing brand to use in their warehouses. **The main purpose of this simple web app is to provide a tool to quickly check simple product and availability information from a single UI.**

The web app is built based on their two legacy (bad) APIs needed to implement work around any of their issues. I have also taken advantage of this assignment to try our React's Suspense feature in Concurrent Mode (which is still in experimental) for efficient data fetching and rendering

## Implementations:

### Back-end: SERVERLESS option
- [x] Implemented a lambda function in the middle to serve clients' requests
- [x] Implemented a lambda function to fetch updated data from legacy APIs (included: handle errors & merge availability data & update new data to DynamoDB)
- [ ] Scheduled the lambda function to trigger every 5 minutes to fetch updated data

### Back-end: NODE EXPRESS server option
- [x] Implemented a middle server to serve clients' requests as well as to fetch updated data from legacy APIs every  5minutes
- [x] Handle errors
- [x] Merge availability data
- [x] Update new data to MongoDB

### Front-end
- [x] Quick and simple navigation with *react-router-dom*
- [x] Data fetching from new API endpoint (lambda function) with *axios*
- [x] Quick rendering a big list with *react-window*
- [x] Quick and efficient data fetching and rendering for better user experience with *React Suspense*
- [x] State management with *React Context*
- [x] Quick product searching and data filtering
- [x] Deploy website to *AWS S3* with [custom domain](https://junior-reaktor.ykitest.fi) (using Cloudfront, Certificate Manager and Route 53)
- [x] CI/CD with *Github Actions*
- [x] Unit tests with *react-scripts* ([link](https://testing-library.com/docs/react-testing-library/intro))
- [x] Caching with *ServiceWorker* ([link](https://developer.mozilla.org/en-US/docs/Web/API/Cache)) and *Progressive Web App* ([link](https://create-react-app.dev/docs/making-a-progressive-web-app))
- [x] Improve performance and loading speed, measuring with *web-vitals* ?? ([link](https://web.dev/vitals/))
- [x] Responsive UI (viewable in small mobile screen)
- [ ] Filter product by availability
- [ ] Filter product by colors


## Demo
Available at: [https://junior-reaktor.ykitest.fi/](https://junior-reaktor.ykitest.fi/)












## To run this app:
Run `npm install` to install dependencies

Run `npm start` to start the app in development mode [http://localhost:3000](http://localhost:3000)

Run `npm test` to run unit tests
