import React, { useState } from 'react';
import axios from './api2';

const AddCandidature = () => {
    const [formData, setFormData] = useState({
        entreprise: '',
        poste: '',
        lienOffre: '',
        dateEnvoi: '',
        statut: 'Attente',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Gérer les modifications du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/candidatures', formData);
            alert('Candidature ajoutée avec succès !');
            setFormData({
                entreprise: '',
                poste: '',
                lienOffre: '',
                dateEnvoi: '',
                statut: 'Attente',
            });
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'Une erreur est survenue lors de l’ajout.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Ajouter une candidature</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Ajout en cours...</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
                <label>Entreprise :</label>
                <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />

                <label>Poste :</label>
                <input
                    type="text"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />

                <label>Lien vers l'offre :</label>
                <input
                    type="url"
                    name="lienOffre"
                    value={formData.lienOffre}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />

                <label>Date d'envoi :</label>
                <input
                    type="date"
                    name="dateEnvoi"
                    value={formData.dateEnvoi}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '10px' }}
                />

                <label>Statut :</label>
                <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    style={{ marginBottom: '20px' }}
                >
                    <option value="Attente">Attente</option>
                    <option value="Accepte">Acceptée</option>
                    <option value="Refusee">Refusée</option>
                </select>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddCandidature; 