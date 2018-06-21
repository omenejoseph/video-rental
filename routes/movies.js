const express = require ('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validateData } = require('../models/movies');

router.get('/', async (req, res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});
router.get('/:id', async (req, res)=>{
    const movie = await Movie.findById(req.params.id).sort('name');
    if(!movie) return res.status(404).send('The Movie you requested was not found');
    res.send(movie);
});
router.post('/', async (req, res)=>{
    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genre cannot be found');
    let movie = new Movie({
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre.id,
            name: genre.name
        }
    });
    await movie.save(movie);
    res.send(movie);
});
router.put('/:id', async (req, res)=>{
    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genre cannot be found');
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre.id,
                name: genre.name
            }
        }, { new: true });
        if(!movie) return res.status(404).send('The Movie you requested was not found');
        res.send(movie);
    } catch(err){
        res.status(404).send(err.message);
    }
    
    
});
router.delete('/:id', async (req, res)=>{
    try{
        const movie = await Movie.findByIdAndRemove(req.params.id);
        res.send(movie);
    }catch(err){
        res.status(404).send(err.message);
    }
    
    
});

module.exports = router;