const mongoose = require('mongoose');

const executiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    image: { type: String }, // URL de la foto
    position: { type: String, required: true }, // Ejemplo: Presidente, gerente
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Executive', executiveSchema);