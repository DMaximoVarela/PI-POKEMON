const axios = require("axios");
const { Pokemon, Type } = require("../db");
const url = "http://localhost:3001/pokemons";
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { Name } = req.query;

    const { data } = await axios(`${url}`);

    const pokemonsApi = data.filter((pokemon) => {
      const pokemonName = pokemon.name;
      return pokemonName.toLowerCase() === Name.toLowerCase();
    });

    const pokemons = await Pokemon.findAll({
      where: { name: { [Op.iLike]: Name } },
      raw: true,
    });

    const idPokemons = pokemons.map((pokemon) => {
      return pokemon.id;
    });

    const types = await Type.findAll({
      where: { id: idPokemons },
      raw: true,
    });

    const dbPokemons = pokemons.map((pokemon) => {
      const relatedTypes = types
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

    const allPokemons = [...pokemonsApi, ...dbPokemons];

    if (allPokemons.length === 0) {
      res.status(404).json({
        error: "No se encontraron pokmenos con el nombre especificado",
      });
    } else {
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
