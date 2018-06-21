const mongoose = require('mongoose');
const Joi = require('joi');


const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
           name: { 
               type: String,
               required: true,
               min: 5,
               max: 255
           },
           dailyRentalRate:{
               type: Number,
               required: true,
               min: 0,
               max: 255
           } 
        }),
        required: true,
    },

    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },

    dateReturned: {
        type: Date,
        
    },

    rentaFee:{
        type: Number,
        min:0,

    },

    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 50,
                max: 255
            },
            phone:{
                type: String,
                required: true,
                min: 6,
                max: 12
            },
            isGold: {
                type: Boolean,
                required: true
            }
        }),
        required: true
    },

    isReturned:{
        type: Boolean,
        default: false
    }     
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateData(data){

    const schema = {
        customerId: Joi.objectId().min(1).max(255).required(),
        movieId: Joi.objectId().min(1).max(255).required(),
    }
    return Joi.validate(data, schema);
}

exports.Rental = Rental;
exports.validateData = validateData;