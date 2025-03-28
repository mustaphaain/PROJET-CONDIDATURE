import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import des composants
import AddCandidature from './components/AddCandidature';
import CandidatureList from './components/CandidatureList';
import EditCandidature from './components/EditCandidature';
import Relances from './components/Relance';
import Stats from './components/Stats';

const NavBar = () => {
    return (
        <nav style={{ marginBottom: '20px' }}>
            <Link style={{ margin: '0 10px' }} to="/">Liste des Candidatures</Link>
            <Link style={{ margin: '0 10px' }} to="/add">Ajouter une Candidature</Link>
            <Link style={{ margin: '0 10px' }} to="/relances">Relances</Link>
            <Link style={{ margin: '0 10px' }} to="/stats">Statistiques</Link>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Gestion des Candidatures</h1>

                <NavBar />

                {/* Définition des routes */}
                <Routes>
                    <Route path="/" element={<CandidatureList />} />
                    <Route path="/add" element={<AddCandidature />} />
                    <Route path="/edit/:id" element={<EditCandidature />} />
                    <Route path="/relances" element={<Relances />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

