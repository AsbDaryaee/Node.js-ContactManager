const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Username"],
        trim: true,
        maxlength: [50, 'Name Cannot be more than 50 Characters']
    },
    email: {
        type: String,
        required: [true, "Please Enter User Email"],
        unique: [true, "The User Already Exist"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)