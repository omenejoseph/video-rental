const express = require ('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Fawn = require('fawn');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const { Rental, validateData } = require('../models/rentals')

const router = express.Router();
Fawn.init(mongoose);

router.get('/',  async (req, res)=>{
    const rentals = await Rental.find().sort('name');
    res.send(rentals);
});
router.get('/:id',  async (req, res)=>{
    const rental = await Rental.findById(req.params.id).sort('-dateOut');
    if(!rental) return res.status(404).send('The Movie you requested was not found');
    res.send(rental);
});
router.post('/', auth,  async (req, res)=>{

    const { error } = validateData(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Customer cannot be found');

    const movie = await Movie.findById(req.body.movieId);
    console.log(movie);
    if(!movie) return res.status(404).send('Movie cannot be found');
    console.log('this is the movie: ', movie);
    if(movie.numberInStock === 0) return res.status(400).send('Movie Out of stock');

    let rental = new Rental({
        movie: {
            _id: movie.id,
            name: movie.name,
            dailyRentalRate: movie.dailyRentalRate,
            },
        customer: {
                _id: customer.id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
    });

        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: {
                numberInStock: -1
            }
        })
        .run();
        res.send(rental);
    
});
// router.put('/:id', async (req, res)=>{
//     const { error } = validateData(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
//     const genre = await Genre.findById(req.body.genreId);
//     if(!genre) return res.status(404).send('Genre cannot be found');
//     try{
//         const movie = await Movie.findByIdAndUpdate(req.params.id, {
//             name: req.body.name,
//             numberInStock: req.body.numberInStock,
//             dailyRentalRate: req.body.dailyRentalRate,
//             genre: {
//                 _id: genre.id,
//                 name: genre.name
//             }
//         }, { new: true });
//         if(!movie) return res.status(404).send('The Movie you requested was not found');
//         res.send(movie);
//     } catch(err){
//         res.status(404).send(err.message);
//     }
    
    
// });
// router.delete('/:id', async (req, res)=>{
//     try{
//         const movie = await Movie.findByIdAndRemove(req.params.id);
//         res.send(movie);
//     }catch(err){
//         res.status(404).send(err.message);
//     }
    
    
// });

module.exports = router;