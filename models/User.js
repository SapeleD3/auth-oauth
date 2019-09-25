const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    googleID: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema)