import React, { useState, useEffect } from 'react';
import axios from './api2';

const Stats = () => {
    const [stats, setStats] = useState({
        total: 0,
        attente: 0,
        acceptee: 0,
        refusee: 0,
    });

    const [loading, setLoading] = useState(false); // État de chargement
    const [error, setError] = useState(null); // Gestion des erreurs

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true); // Début du chargement
            try {
                const response = await axios.get('/api/stats');
                setStats(response.data);
                console.log(response.data)
                setError(null); // Réinitialiser les erreurs
            } catch (err) {
                setError("Erreur lors de la récupération des statistiques.");
            } finally {
                setLoading(false); // Fin du chargement
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h2>Statistiques</h2>

            {/* Indicateur de chargement */}
            {loading && <p>Chargement des statistiques...</p>}

            {/* Message d'erreur */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Affichage des statistiques */}
            {!loading && !error && (
                <div>
                    <p><strong>Total de candidatures :</strong> {stats.total}</p>
                    <p><strong>En attente :</strong> {stats.enAttente}</p>
                    <p><strong>Acceptées :</strong> {stats.acceptees}</p>
                    <p><strong>Refusées :</strong> {stats.refusees}</p>
                </div>
            )}

            {/* Aucun résultat trouvé */}
            {!loading && stats.total === 0 && <p>Aucune donnée statistique disponible.</p>}
        </div>
    );
};

export default Stats; 
