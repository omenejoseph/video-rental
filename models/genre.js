const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateData(data){

    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(data, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateData = validateData;