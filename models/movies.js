const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genre');

const movieSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 255
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    genre: {
        type: genreSchema,
        required: true
    }
});

const Movie = mongoose.model('Movies', movieSchema);

function validateData(data){

    const schema = {
        name: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    }
    return Joi.validate(data, schema);
}

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validateData = validateData;