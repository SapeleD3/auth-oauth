const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
    User.findById({ "local._id": id })
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
    User.findByIdAndRemove({ "local._id": id })
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
        "local.email": req.body.email
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
                            method: 'local',
                            local: {
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                name: req.body.name,
                                password: hash
                            }

                        });
                        user.save()
                            .then(resp => {
                                const token = jwt.sign({
                                    email: resp.email,
                                    userId: resp._id
                                },
                                    'Slugterra5',
                                    {
                                        expiresIn: new Date().setDate(new Date().getDate() + 1)
                                    }
                                );
                                res.status(201).json({
                                    message: 'user created successfully',
                                    response: resp,
                                    token
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

exports.loginUsers = (req, res) => {
    User.find({ "local.email": req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'User not available go and Register'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        'Slugterra5',
                        {
                            expiresIn: new Date().setDate(new Date().getDate() + 1)
                        }
                    );
                    return res.status(401).json({
                        message: 'Auth Successful',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.googleOauth = (req, res) => {
    const token = jwt.sign({
        email: req.user.google.email,
        userId: req.user.google.id
    },
        'Slugterra5',
        {
            expiresIn: new Date().setDate(new Date().getDate() + 1)
        }
    );
    res.status(200).json({
        token
    })
}