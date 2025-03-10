const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    nombre: String,
    especie: String,
    tipo: String,
    nivel: Number,
    habilidad: String,
    entrenador: String,
    edad: Number,
    region: String
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;