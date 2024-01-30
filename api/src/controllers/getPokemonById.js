const axios = require("axios");
const { Pokemon, Type } = require("../db");

const url = "https://pokeapi.co/api/v2/pokemon/";

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id < 152) {
      const { data } = await axios(`${url}${id}`);

      const { name, sprites, stats, height, weight, types } = data;

      const allTypes = types.map((obj) => {
        return obj.type.name;
      });

      const pokemon = {
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

      console.log(pokemon);

      res.status(200).json(pokemon);
    } else if (id > 151) {
      const pokemon = await Pokemon.findOne({
        where: { id: id },
        include: [
          {
            model: Type,
            through: { attributes: [] },
          },
        ],
      });

      if (pokemon.name) {
        const { Types, ...rest } = pokemon.get({ plain: true });

        const detailedPokemon = {
          ...rest,
          types: Types.map((type) => type.name),
        };

        res.status(200).json(detailedPokemon);
      } else {
        res.status(404).json({ error: "Pokemon not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
