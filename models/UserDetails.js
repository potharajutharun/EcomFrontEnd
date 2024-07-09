
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    email:{
        type: String,
        required: true

    },
    
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;
