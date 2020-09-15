/**
 *  server.js intializes the entire application and hosts it on the specified port
 */

const config = require('config')
const {logger} = require('./debug/logging');
const app = require('./app.js');

// Define server port
const port = process.env.PORT || config.get('port');

// Start and return the server object
const server = app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `App listening on port ${port}`
  });
});


module.exports = server;