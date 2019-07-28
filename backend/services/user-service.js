'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getUsers = function (params) {
    const promise = User.find(params).exec()
    return promise;
};


exports.save = function (user, callback) {
    let newUser = new User(user);
    const promise= newUser.save();
    return promise;
};

exports.checkByEmailAndPassword = function (email,password, callback) {
    const promise= User.findOne({email:email,password:password})
    return promise;
};

exports.getUserById = function(userId, callback){
    const promise= User.findById(userId);
    return promise;
}

