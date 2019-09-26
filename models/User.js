const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    method: {
        type: String,
        enum: ['local', 'google'],
        required: true
    },
    local: {
        _id: mongoose.Schema.Types.ObjectId,
        email: {
            type: String,
            lowercase: true
        },
        name: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        name: {
            type: String
        }
    }

})

module.exports = mongoose.model('User', userSchema)