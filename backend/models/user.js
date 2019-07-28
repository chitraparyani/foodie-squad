'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for User object.
 */
let UserSchema = new Schema({
    /**
     * Name of the User
     */

    fname: {
        type: String,
        required: "Name is required"
    },
    lname:{
        type: String,
        required: "Last Name is required"
    },
    phone:{
        type: Number
    },
    password:{
        type: String,
        required: "Password Required"
    },
    email:{
        type: String,
        required: "Email is required"
    },
    /**
     * Contact Creation Date
     */
    created_date: {
        type: Date,
        default: Date.now
    },
    /**
     * Last Date Modified
     */
    modified_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);