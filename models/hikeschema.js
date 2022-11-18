const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hikeSchema = new Schema({
    name: { type: String },
    location: { type: String },
    miles: { type: Number },
    description: { type: String },
    rating: {
        type: String, easy: true,
        moderate: false,
        difficult: false,
    },
    completed: { type: Boolean }
})

const Hike = mongoose.model('hike', hikeSchema);
module.exports = Hike;