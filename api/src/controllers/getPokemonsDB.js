const { Pokemon, Type } = require("../db");

module.exports = async (req, res) => {
  try {
    const pokemonsDB = await Pokemon.findAll({
      include: [
        {
          model: Type,
          through: { attributes: [] },
        },
      ],
    });

    const detailedPokemons = pokemonsDB.map((pokemon) => {
      const { Types, ...rest } = pokemon.get({ plain: true });
      return {
        ...rest,
        types: Types.map((type) => type.name),
      };
    });

    if (detailedPokemons.length === 0) {
      res
        .status(200)
        .json({ message: "You have not created any pokemon yet." });
    } else res.status(200).json(detailedPokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
