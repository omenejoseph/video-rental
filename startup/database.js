const mongoose = require('mongoose');
const winston = require('winston');

module.exports = ()=>{

    // if(!config.get('jwtPrivateKey')) {
    //     console.error("FATAL ERROR: jwtPrivateKey is not defined");
    //     process.exit(1);
    // }

    mongoose.connect('mongodb://localhost/vidly')
    .then(()=>winston.info('connected to MongoDB'));
}