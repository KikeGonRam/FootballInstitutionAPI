const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    image: { type: String }, // URL de la foto
    license: { type: String, required: true }, // Licencia de entrenador
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Coach', coachSchema);