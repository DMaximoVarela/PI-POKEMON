const { Router } = require("express");

const router = Router();

const getPokemons = require("../controllers/getPokemons");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonsByName = require("../controllers/getPokemonsByName");
const postPokemons = require("../controllers/postPokemons");
const getTypes = require("../controllers/getTypes");
const putPokemon = require("../controllers/putPokemon");
const deletePokemon = require("../controllers/deletePokemon");
const getPokemonsDB = require("../controllers/getPokemonsDB");

router.get("/pokemons", getPokemons);

router.get("/pokemons/:id", getPokemonById);

router.get("/pokemon", getPokemonsByName);

router.post("/pokemons", postPokemons);

router.get("/types", getTypes);

router.put("/pokemons/:id", putPokemon);

router.delete("/pokemons/:id", deletePokemon);

router.get("/database", getPokemonsDB);

module.exports = router;
