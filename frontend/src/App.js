const React = require('react');
const ReactRouterDom = require('react-router-dom');
const Router = ReactRouterDom.BrowserRouter;
const Routes = ReactRouterDom.Routes;
const Route = ReactRouterDom.Route;

// Import des composants
const AddCandidature = require('./components/AddCandidature2');
const CandidatureList = require('./components/CandidatureList2');
const EditCandidature = require('./components/EditCandidature2');
const Relances = require('./components/Relances2');
const Stats = require('./components/Stats2');

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Gestion des Candidatures</h1>

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

module.exports = App;