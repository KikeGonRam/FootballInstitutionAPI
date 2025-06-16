const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
     image: { type: String }, // URL del escudo
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team', teamSchema);