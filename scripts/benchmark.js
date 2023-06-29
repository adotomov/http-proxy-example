const autocannon = require('autocannon');

autocannon({
  url: 'http://localhost:3002/articles/views?period=7',
  connections: 10,
  pipelining: 1,
  duration: 10,
  workers: 4
}, console.log)