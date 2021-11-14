const express = require('express');
const createError = require('http-errors');
const personService = require('./person.service');
const controller = express.Router();

// GETall
exports.findAll = (req, res, next) => {
    return personService.findAll()
        .then(people => {
            res.json(people);
        });
};

// GETone
exports.findOne = (req, res, next) => {
    return personService.findOne(req.params.id)
        .then(person => {
        if (!person) {
            return next(new createError.NotFound('Person is not found'));
        }
        return res.json(person);
        });
};

// CREATE
exports.create = (req, res, next) => {
    const {last_name, first_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        return next(new createError.BadRequest('Missing properties'));
    }

    const newPerson = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    return personService.create(newPerson)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

// UPDATE
exports.update = (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return next(
            new createError.BadRequest('Missing properties')
        );
    };

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    return personService.update(req.params.id, update)
        .then(person => {
            res.json(person);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));

};


exports.delete = (req, res, next) => {
    return personService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(new createError.InternalServerError(err.message)));
};



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