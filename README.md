# Simple http proxy that returns an array of the most viewed articles on NYTimes.com for specified period of time (1 day, 7 days, or 30 days).

## Installing the project

Run `npm install` in the root folder

## Local development

Run `npm run dev` to start the development server

## Making an API call

Once the application is started, you can use Postman/Insomnia/Chrome to perform a request

Example:
`GET http://localhost:3002/articles/views?period=7`

This will return most viewed articles on NYTimes for the past 7 days.

You can choose between `1`, `7` and `30` days periods

## Production & deployment

The project uses typescript. First you need to run `npm run build`. This will generate the `dist` folder from where the application will run. Then you can run `npm run start` (e.g. in a container) to run the application

## Limitations

The code uses a free open API from NYTimes. It has a variable rate limit, so it is possible for requests to fail with error code `429`.
