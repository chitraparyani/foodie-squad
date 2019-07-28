'use strict';
module.exports = function (app) {
    const userController = require('../controllers/user-controller');
    // User Routes for search and create.
    app.route('/api/users')
        .get(userController.getUsers)
        .post(userController.registeruser);

    app.route('/api/login')
        .post(userController.checkUser)

    app.route('/api/users/:userId')
        .get(userController.getUserById)


};
