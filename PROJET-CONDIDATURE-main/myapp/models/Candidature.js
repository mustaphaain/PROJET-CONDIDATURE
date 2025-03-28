const mongoose = require('mongoose');

const CandidatureSchema = new mongoose.Schema({
    entreprise: { type: String, required: true },
    poste: { type: String, required: true },
    lienOffre: { type: String, required: false },
    dateEnvoi: { type: Date, required: true },
    statut: { type: String, enum: ['Attente', 'Acceptée', 'Refusée'], default: 'Attente' },
}, { timestamps: true });

const Candidature = mongoose.model('Candidature', CandidatureSchema);

module.exports = Candidature;