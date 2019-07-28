'use strict';
const userService = require('../services/user-service');

exports.getUsers=function(req,res){
    const resolve=(users) =>{
        res.status(200);
        res.json(users);
    }
    // user search service
    userService.getUsers({})
        .then(resolve)
        .catch(renderErrorResponse(res));
}

exports.registeruser=function(req,res){
    const newUser= Object.assign({},req.body);
    console.log(newUser);
    const resolve= (user)=>{
        res.status(200);
        res.json(user);
    };
    userService.save(newUser)
        .then(resolve)
        .catch(renderErrorResponse)
}

exports.checkUser=function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const resolve= (user)=>{
        res.status(200);
        res.json(user);
    };
    userService.checkByEmailAndPassword(email,password)
        .then(resolve)
        .catch(renderErrorResponse)
}

exports.getUserById=function(req,res){
    const userId=req.params.userId

    const resolve= (user)=>{
        res.status(200);
        res.json(user);
    };
    userService.getUserById(userId)
        .then(resolve)
        .catch(renderErrorResponse)
}

// if any error occurs render it through a promise and send it back to user
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};
