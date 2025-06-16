const mongoose = require('mongoose');

const refereeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }, // URL de la foto
    certification: { type: String, required: true }, // Certificación de árbitro
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Referee', refereeSchema);