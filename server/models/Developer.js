const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    email: String,
    phone: String,
    github: String,
    linkedin: String,
    domain: String,
    techstack: [String],
},{ timestamps: true });

module.exports = mongoose.model('Developer', developerSchema);