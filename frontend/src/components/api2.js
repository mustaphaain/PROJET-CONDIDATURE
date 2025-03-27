const axios = require('axios');
console.log('Axios chargé :', axios); // Vérifie que cette ligne s'affiche sans erreur

const api = axios.create({
    baseURL: 'http://localhost:5000',
});
module.exports = api;

