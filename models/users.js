const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required: true,
    },
    isAdmin:{
        type:Boolean
    }
});
userSchema.methods.generateAuthToken = function (){
    return token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'jwtPrivatekey');
}
const User = mongoose.model('User', userSchema);

function validateData(data){

    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),     
    }
    return Joi.validate(data, schema);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateData = validateData;