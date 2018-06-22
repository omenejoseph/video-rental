const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { Genre, validateData } = require('../models/genre');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');


router.get( '/', asyncMiddleware (async (req, res)=>{
    const genres = await Genre.find().sort('name');
    console.log(genres);
    res.send(genres);
}));
router.get( '/:id', asyncMiddleware( async (req, res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('The genre you requested cannot be found');
    console.log(genre);
    res.send(genre);
}));
router.put('/:id', auth, asyncMiddleware(async (req, res)=>{

    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if(!genre) return res.status(404).send('The genre you requested cannot be found');  
    console.log(genre);
    res.send(genre);
}));
router.post('/', auth, asyncMiddleware(async (req, res)=>{
    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save(genre);
    console.log(genre);
    res.send(genre);
}));
router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The genre you requested cannot be found');
    console.log(genre);
    res.send(genre);
}));


module.exports = router;