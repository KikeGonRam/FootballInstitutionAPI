const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    image: { type: String }, // URL de la foto
    role: { type: String, required: true }, // Ejemplo: Preparador físico, asistente técnico
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assistant', assistantSchema);