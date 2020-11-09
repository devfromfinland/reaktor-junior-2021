# Pre-assignment for Reaktor Junior 2021
This is the repo for Reaktor Junior 2021's pre-assignment. [assignment link](https://www.reaktor.com/junior-dev-assignment/)

In this assignment, I have built a simple web app for a clothing brand to use in their warehouses. The main purpose of this simple web app is to provide a tool to quickly check simple product and availability information from a single UI.

The web app is built based on their two legacy (bad) APIs which I need to work around any of their issues.

I have also taken advantage of this assignment to try our React's Suspense feature in Concurrent Mode (which is still in experimental) for efficient data fetching and rendering

## What have been used and applied in this app?
- [x] Quick and simple navigation with *react-router-dom*
- [x] Data fetching from legacy APIs with *axios*
- [x] Quick rendering a big list with *react-window*
- [x] Quick and efficient data fetching and rendering for better user experience with *React Suspense*
- [ ] Reduce number of API call with *React Context* and *Caching*
- [ ] Quick product searching and data filtering
- [ ] Responsive UI
- [ ] Unit tests
- [ ] CI/CD with Github Actions
- [ ] Deploy to Heroku (or AWS S3)

## To run this app:
Run `npm install` to install dependencies
Run `npm start` to start the app in development mode [http://localhost:3000](http://localhost:3000)