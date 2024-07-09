const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const File = mongoose.model('fileStorage', FileSchema);

module.exports = File;
