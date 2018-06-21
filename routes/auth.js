const express = require ('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const router = express.Router();

router.post('/', async (req, res)=>{

    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password');
    const token = jwt.sign({ _id: user._id }, 'jwtprivatekey');
    res.send(token);
      
});

function validateData(data){

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),     
    }
    return Joi.validate(data, schema);
}

module.exports = router;