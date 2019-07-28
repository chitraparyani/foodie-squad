'use strict';
module.exports = function (app) {


// defining routes for restaurant
const restController = require('../controllers/restaurant-controller');

app.route('/restList')
.get(restController.findRestaurant);

app.route('/menu')
.get(restController.findRestaurantMenu);

app.route('/restaurant')
.get(restController.findRestaurantById);
}






