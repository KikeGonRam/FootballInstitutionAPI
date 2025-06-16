const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
     image: { type: String }, // URL de la bandera
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Country', countrySchema);