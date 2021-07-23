const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const randomstring = require('randomstring');
const ShipsModel = require('../models/shipsModel');

// Récupération des données

router.get('/', (req, res) => {
    ShipsModel.find((error, docs) => {
        if(!error) res.send(docs);
        else return res.status(400).send({
            "error": error.message
        });
    });
});

// Insertion des données

router.post('/', (req, res) => {
    const newRecord = new ShipsModel({
        _id: randomstring.generate({
            length: 24,
            charset: 'alphabetic'
        }),
        name: req.body.name,
        quantity: req.body.quantity,
        image: req.body.image,
        citizen_id: req.body.citizen_id
    });

    newRecord.save((error, docs) => {
        if(!error) res.send(docs);
        else return res.status(400).send({
            "error": error.message
        });
    });
});

// Modification des données

router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({
            "error": "Unknown ID : " + req.params.id
        });
    } else {
        const updateRecord = {
            name: req.body.name,
            quantity: req.body.quantity,
            image: req.body.image
        };

        ShipsModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateRecord },
            { new: true },
            (error, docs) => {
                if(!error) res.send(docs);
                else return res.status(400).send({
                    "error": error.message
                });
            }
        );
    }
});

// Suppression des données

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({
            "error": "Unknown ID : " + req.params.id
        });
    } else {
        ShipsModel.findByIdAndRemove(
            req.params.id,
            (error, docs) => {
                if(!error) res.send(docs);
                else return res.status(400).send({
                    "error": error.message
                });
            }
        );
    }
});

module.exports = router;