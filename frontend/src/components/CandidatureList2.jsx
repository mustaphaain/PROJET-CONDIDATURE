const React = require('react');
const { useState, useEffect } = React;
const axios = require('./api2.js');

const CandidatureList = () => {
    const [candidatures, setCandidatures] = useState([]); // Liste des candidatures
    const [filters, setFilters] = useState({ statut: '', entreprise: '' }); // Filtres
    const [loading, setLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState(null); // Gestion des erreurs

    // Fonction pour récupérer les candidatures en fonction des filtres
    useEffect(() => {
        const fetchCandidatures = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/candidatures', { params: filters });
                setCandidatures(response.data);
                setError(null); // Réinitialiser les erreurs
            } catch (err) {
                setError("Erreur lors du chargement des candidatures."); // Message d'erreur
            } finally {
                setLoading(false);
            }
        };
        fetchCandidatures();
    }, [filters]);

    // Fonction pour gérer le changement de filtre
    const Change = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Fonction pour supprimer une candidature
    const Delete = async (id) => {
        try {
            await axios.delete(`/candidatures/${id}`);
            setCandidatures(candidatures.filter((candidature) => candidature._id !== id));
            alert('Candidature supprimée avec succès !');
        } catch (error) {
            alert('Erreur lors de la suppression.');
        }
    };

    // Fonction pour rediriger vers la page d'édition
    const Edit = (id) => {
        window.location.href = `/edit/${id}`;
    };

    return (
        <div>
            <h2>Liste des candidatures</h2>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>Filtrer par statut :</label>
                <select name="statut" onChange={Change}>
                    <option value="">Tous</option>
                    <option value="Attente">Attente</option>
                    <option value="Accepte">Acceptée</option>
                    <option value="Refusee">Refusée</option>
                </select>
                <label style={{ marginLeft: '20px', marginRight: '10px' }}>Filtrer par entreprise :</label>
                <input name="entreprise" type="text" onChange={Change} />
            </div>

            {/* Gestion du chargement */}
            {loading && <p>Chargement des candidatures...</p>}

            {/* Gestion des erreurs */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Affichage des candidatures */}
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
                            <strong>{candidature.entreprise}</strong> - {candidature.poste}
                        </span>
                        <span>
                            <button
                                onClick={() => Edit(candidature._id)}
                                style={{ marginRight: '10px', backgroundColor: '#00f', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => Delete(candidature._id)}
                                style={{ backgroundColor: '#f00', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                            >
                                Supprimer
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            {/* Message si aucune candidature trouvée */}
            {candidatures.length === 0 && !loading && <p>Aucune candidature trouvée.</p>}
        </div>
    );
};

module.exports = CandidatureList;