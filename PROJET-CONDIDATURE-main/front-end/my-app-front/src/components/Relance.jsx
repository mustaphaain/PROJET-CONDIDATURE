import React, { useState, useEffect } from 'react';
import axios from './api2';

const Relances = () => {
    const [candidatures, setCandidatures] = useState([]); // État pour les candidatures
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [error, setError] = useState(null); // État pour les erreurs

    useEffect(() => {
        const fetchRelances = async () => {
            setLoading(true); // Début du chargement
            try {
                const response = await axios.get('/api/candidatures');
                setCandidatures(response.data);
                setError(null); // Réinitialiser les erreurs
            } catch (error) {
                setError("Erreur lors de la récupération des relances."); // Message d'erreur
            } finally {
                setLoading(false); // Fin du chargement
            }
        };
        fetchRelances();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Candidatures à relancer</h2>

            {/* Affichage d'un indicateur de chargement */}
            {loading && <p>Chargement en cours...</p>}

            {/* Affichage des erreurs */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Affichage des candidatures */}
            {!loading && !error && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {candidatures.map((candidature) => (
                        <li
                            key={candidature._id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                padding: '10px',
                                marginBottom: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>
                                <strong>{candidature.entreprise}</strong> - {candidature.poste} (Dernier contact : {new Date(candidature.dernierContact).toLocaleDateString()})
                            </span>
                            <button
                                onClick={() => console.log('Relancer maintenant')}
                                style={{
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Relancer
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Aucun résultat trouvé */}
            {!loading && candidatures.length === 0 && <p>Aucune candidature à relancer.</p>}
        </div>
    );
};

export default Relances; 
