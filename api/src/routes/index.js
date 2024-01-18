const { Router } = require("express");

const router = Router();

const getPokemons = require("../controllers/getPokemons");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonsByName = require("../controllers/getPokemonsByName");
const postPokemons = require("../controllers/postPokemons");
const getTypes = require("../controllers/getTypes");

router.get("/pokemons", getPokemons);

router.get("/pokemons/:id", getPokemonById);

router.get("/pokemon", getPokemonsByName);

router.post("/pokemons", postPokemons);

router.get("/types", getTypes);

module.exports = router;
