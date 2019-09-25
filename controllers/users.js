const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User')

exports.getUsers = (req, res) => {
    User.find()
        .exec()
        .then(user => {
            res.status(200).json({
                message: 'users fetch successful',
                userCount: user.length,
                Users: user
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getUserByid = (req, res) => {
    const id = req.params.id
    User.findById({ _id: id })
        .exec()
        .then(user => {
            res.status(200).json({
                message: 'user fetch successful',
                user: user
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.deleteUserById = (req, res) => {
    const id = req.params.id
    User.findByIdAndRemove({ _id: id })
        .exec()
        .then(resp => {
            res.status(200).json({
                message: 'user deleted succefully',
                response: resp
            })
        })
        .catch(err => {
            status(500).json({
                error: err
            })
        })
}

exports.registerUser = (req, res) => {
    User.find({
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exist Login"
                })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            googleID: req.body.googleID,
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        });
                        user.save()
                            .then(resp => {
                                res.status(201).json({
                                    message: 'user created successfully',
                                    response: resp
                                })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err
                                        })
                                    })
                            })
                    });
                });
            }
        })
}