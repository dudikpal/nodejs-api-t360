const express = require('express');
const data = require('./data');
const createError = require('http-errors');
const Person = require('../../models/person.model');
const logger = require('../../config/logger');

const controller = express.Router();

// GETall
controller.get('/', async (req, res) => {
    const people = await Person.find();    
    logger.debug(`Get all people returning ${people.length} item`);
    res.json(people);
});

// GETone
controller.get('/:id', async (req, res, next) => {
    const person = await Person.findById(req.params.id);
    if (!person) {
        return next(new createError.NotFound('Person not found'));
    }
    res.json(person);
});

// CREATE
controller.post('/', (req, res, next) => {
    const {last_name, first_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        return next(new createError.BadRequest('Missing properties'));
    }

    const newPerson = new Person({
        firstName: first_name,
        lastName: last_name,
        email: email
    });

    newPerson.save()
    .then(data => {
        res.status(201);
        res.json(data);
    });

});

// UPDATE
controller.put('/:id', async (req, res, next) => {
    const id = req.params.id;    
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return next(
            new createError.BadRequest('Missing properties')
        );
    }

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    const person = {};
    try {
        // new: true => ha nem letezik, letrehozza
        person = await Person.findByIdAndUpdate(id, update, {new: true});
    } catch (err) {
        return next(new createError.BadRequest(err));
    }

    return res.json(person);
});



controller.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const person = await Person.findByIdAndDelete(id);        
    } catch (err) {
        return next(new createError.NotFound('Person is not found'));
    }
    res.json({});
});





module.exports = controller;

/*
fetch('http://localhost:3000/person', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'},
body: JSON.stringify({first_name: 'From', last_name: 'cloud', email: 'emailcimn'})
})
.then(r => r.json())
.then(d => console.log(d));
*/