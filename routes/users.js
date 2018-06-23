const express = require ('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateData } = require('../models/users');
const router = express.Router();


router.get('/me', auth,  async (req, res, next)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/',  async (req, res)=>{

    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email}).select('-password');
    if(user) return res.status(400).send('User Already Exists');

    // Joi.validate(req.body.password, new PasswordComplexity(complexityOptions), (err, value) => {
        
    // })

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
  
});

module.exports = router;