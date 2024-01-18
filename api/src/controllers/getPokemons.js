const axios = require("axios");
const { Pokemon, Type } = require("../db");

const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";

module.exports = async (req, res) => {
  try {
    const { data } = await axios(url);
    const results = data.results;

    const pokemonDataPromises = results.map(async (pokemon) => {
      const { data } = await axios(pokemon.url);
      const { id, name, sprites, stats, height, weight, types } = data;

      const allTypes = types.map((obj) => {
        return obj.type.name;
      });

      return {
        id,
        name,
        image: sprites.other["official-artwork"].front_default,
        ps: stats[0].base_stat,
        atk: stats[1].base_stat,
        def: stats[2].base_stat,
        vel: stats[5].base_stat,
        height,
        weight,
        types: allTypes,
      };
    });

    const pokemons = await Promise.all(pokemonDataPromises);

    const pokemonsDB = await Pokemon.findAll();

    const idPokemons = pokemonsDB.map((pokemon) => {
      return pokemon.id;
    });

    const typeDB = await Type.findAll({
      where: { id: idPokemons },
      raw: true,
    });

    const dbPokemons = pokemonsDB.map((pokemon) => {
      const relatedTypes = typeDB
        .filter((type) => type.id === type.id)
        .map((obj) => {
          return obj.type.name;
        });

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        ps: pokemon.ps,
        atk: pokemon.atk,
        def: pokemon.def,
        vel: pokemon.vel,
        height: pokemon.height,
        weight: pokemon.weight,
        types: relatedTypes,
      };
    });

    const allPokemons = [...pokemons, ...dbPokemons];

    res.status(200).json(allPokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
