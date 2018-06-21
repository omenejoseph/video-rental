const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateData(data){

    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.number(),     
    }
    return Joi.validate(data, schema);
}

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validateData = validateData;