
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rePassword:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('CustomerLogin', customerSchema);

module.exports = Customer;
