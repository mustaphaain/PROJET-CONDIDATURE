const express = require('express');
const router = express.Router();
const Candidature = require('../models/Candidature');

// Ajouter une candidature
router.post('/candidatures', async (req, res) => {
    try {
        const nouvelleCandidature = new Candidature(req.body);
        await nouvelleCandidature.save();
        res.status(201).json(nouvelleCandidature);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtenir toutes les candidatures avec filtres
router.get('/candidatures', async (req, res) => {
    const { entreprise, statut } = req.query;
    try {
        const query = {};
        if (entreprise) query.entreprise = entreprise;
        if (statut) query.statut = statut;
        const candidatures = await Candidature.find(query);
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modifier une candidature
router.put('/candidatures/:id', async (req, res) => {
    try {
        const candidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(candidature);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une candidature
router.delete('/candidatures/:id', async (req, res) => {
    try {
        await Candidature.findByIdAndDelete(req.params.id);
        res.json({ message: 'Candidature supprimée avec succès.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Statistiques
router.get('/stats', async (req, res) => {
    try {
        const total = await Candidature.countDocuments();
        const enAttente = await Candidature.countDocuments({ statut: 'En attente' });
        const acceptees = await Candidature.countDocuments({ statut: 'Acceptée' });
        const refusees = await Candidature.countDocuments({ statut: 'Refusée' });
        res.json({ total, enAttente, acceptees, refusees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;