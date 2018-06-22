const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const asyncMiddleware = require('../middleware/async');
const { Customer, validateData } = require('../models/customer');

router.get('/', asyncMiddleware(async (req, res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
}));
router.get('/:id', asyncMiddleware(async (req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('Customer you requested for cannot be found');
    res.send(customer);
}));
router.post('/', auth, asyncMiddleware( async (req, res)=>{
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: parseInt(req.body.phone)
    });

        customer = await customer.save(customer);
        res.send(customer);    
}));
router.put('/:id', auth, asyncMiddleware(async (req, res)=>{
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: parseInt(req.body.phone)
    }, { new: true });
    if(!customer) return res.status(404).send('Customer you requested cannot be found');
    res.send(customer);
}));
router.delete('/:id', auth, asyncMiddleware(async (req, res)=>{
    
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        const customer = await Customer.findByIdAndRemove(req.params.id);
        
        res.send(customer);
    }));

module.exports = router;