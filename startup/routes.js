/**
 *  Routes.js establishes the following:
 *    1. Sets up all middleware which requests will travel up to the final api destination
 *    2. Initializes the api destinations
 * 
 *  Note: express-session code has been commented out, we may want to use user sessions in the future
 */


const error = require('../middleware/error');
const comments = require('../routes/comments');

module.exports = function (app) {
  // Initialize routes
  app.use('/api/comments', comments);


  // Error handling middleware
  app.use(error);
}