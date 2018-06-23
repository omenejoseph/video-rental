const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = ()=>{

    // if(!config.get('jwtPrivateKey')) {
    //     console.error("FATAL ERROR: jwtPrivateKey is not defined");
    //     process.exit(1);
    // }

    mongoose.connect(config.get('db'))
    .then(()=>winston.info('connected to MongoDB')); 
}