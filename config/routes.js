/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // Views
  '/': { view: 'homepage' },
  '/manage': { view: 'manage' },
  '/statistics': { view: 'statistics' },

  //'get /signup': { view: 'user/signup' },
  //'/welcome': { view: 'user/welcome' },

  // Endpoints
  //'post /login': 'UserController.login',
  //'post /signup': 'UserController.signup',
  //'/logout': 'UserController.logout',
  '/': 'indexController.indexRender',
  '/manage': 'manageController.manageRender',
  '/webhook': 'apiController.webhook',
  '/access-token': 'apiController.accesstoken',
  '/statistics': 'statisticController.statisticRender',
  //'post /home/new': 'UserController.new',
  //'post /home/update': 'UserController.update'


};
