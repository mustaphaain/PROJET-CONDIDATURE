const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const candidatureRoutes = require('./routes/candidatures');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/candidaturesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur de connexion :", err));

// Routes
app.use('/api', candidatureRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur en cours sur le port ${PORT}`));