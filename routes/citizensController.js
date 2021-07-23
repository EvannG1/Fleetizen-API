const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const CitizensModel = require('../models/citizensModel');

// Récupération des données

router.get('/', (req, res) => {
    CitizensModel.find((error, docs) => {
        if(!error) res.send(docs);
        else return res.status(400).send({
            "error": error.message
        });
    });
});

// Insertion des données

router.post('/', (req, res) => {
    const newRecord = new CitizensModel({
        username: req.body.username,
        rsi_handle: req.body.rsi_handle
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
            username: req.body.username,
            rsi_handle: req.body.rsi_handle
        };

        CitizensModel.findByIdAndUpdate(
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
        CitizensModel.findByIdAndRemove(
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