'use strict';
module.exports = function (app) {

    const emailController = require('../controllers/email-controller');

    app.route('/api/sendMail')
    .post(emailController.sendMail)
}
