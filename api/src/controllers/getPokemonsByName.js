const axios = require("axios");
const url = "http://localhost:3001/pokemons";

module.exports = async (req, res) => {
  try {
    const { Name } = req.query;

    const { data } = await axios(`${url}`);

    const pokemons = data.filter((pokemon) => {
      const pokemonName = pokemon.name;
      return pokemonName.toLowerCase() === Name.toLowerCase();
    });

    if (pokemons.length === 0) {
      res.status(404).json({
        error: "No se encontraron pokmenos con el nombre especificado",
      });
    } else {
      res.status(200).json(pokemons);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
