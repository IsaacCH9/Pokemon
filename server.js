const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const Pokemon = require("./models/Pokemon"); // Importa el modelo

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Para servir el frontend en Render

// 🔹 Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// 🔹 Rutas del CRUD
app.get("/obtenerPokemones", async (req, res) => {
    try {
        const pokemones = await Pokemon.find();
        res.json(pokemones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener Pokémon" });
    }
});

app.get("/obtenerPokemon/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener Pokémon" });
    }
});

app.post("/agregarPokemon", async (req, res) => {
    try {
        const pokemon = new Pokemon(req.body);
        await pokemon.save();
        res.json({ success: true, message: "Pokémon registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar Pokémon" });
    }
});

app.put("/actualizarPokemon/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });
        res.json({ success: true, message: "Pokémon actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar Pokémon" });
    }
});

app.delete("/eliminarPokemon/:id", async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!pokemon) return res.status(404).json({ error: "Pokémon no encontrado" });
        res.json({ success: true, message: "Pokémon eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar Pokémon" });
    }
});

// 🔹 Servidor en Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
