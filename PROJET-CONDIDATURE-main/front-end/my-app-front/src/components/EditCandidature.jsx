import React, { useState, useEffect } from 'react';
import axios from './api2';
import { useParams, useNavigate } from 'react-router-dom';

const EditCandidature = () => {
    const { id } = useParams(); // Obtenir l'ID de la candidature
    const navigate = useNavigate(); // Pour rediriger après modification

    const [formData, setFormData] = useState({
        entreprise: '',
        poste: '',
        lienOffre: '',
        dateEnvoi: '',
        statut: 'Attente',
    });

    const [loading, setLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState(null); // Gestion des erreurs

    // Récupération des données de la candidature
    useEffect(() => {
        const fetchCandidature = async () => {
            setLoading(true); // Début du chargement
            console.log('ID:', id)
            
            try {
                const response = await axios.get(`http://localhost:5173/api/candidatures/${id}`);
                setFormData(response.data);
                setError(null); // Réinitialiser les erreurs
            } catch (error) {
                setError("Erreur lors de la récupération de la candidature.");
            } finally {
                setLoading(false); // Fin du chargement
            }
        };
        fetchCandidature();
    }, [id]);

    // Gestion des modifications du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envoi des modifications
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Début du chargement
        try {
            await axios.put(`/api/candidatures/${id}`, formData);
            alert("Candidature modifiée avec succès !");
            navigate('/'); // Rediriger vers la liste des candidatures
        } catch (error) {
            setError("Erreur lors de la modification !");
        } finally {
            setLoading(false); // Fin du chargement
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Modifier une candidature</h2>

            {/* Affichage des messages d'erreur */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Indicateur de chargement */}
            {loading && <p>Chargement en cours...</p>}

            {/* Formulaire */}
            {!loading && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
                        Modifier
                    </button>
                </form>
            )}
        </div>
    );
};

export default EditCandidature; 
