const axios = require("axios");
const { Pokemon, Type } = require("../db");

module.exports = async (req, res) => {
  try {
    const { name, image, ps, atk, def, vel, height, weight, types } = req.body;

    if (!name || !image || !ps || !atk || !def || !types)
      return res.status(400).json({
        error: "Mandatory fields are missing",
      });

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name))
      return res.status(400).json({
        error: "El nombre solo puede contener letras",
      });

    if (name.length > 15)
      return res.status(400).json({
        error: "The name can only contain letters",
      });

    const statsRegex = /^\d{1,3}$/;
    const invalidStat = [ps, atk, def, vel, height, weight].find(
      (stat) => !statsRegex.test(stat)
    );

    if (invalidStat)
      return res.status(400).json({
        error: `Invalid value in ${invalidStat}, only numbers up to 3 digits are allowed.`,
      });

    let typesDB = [];

    if (typesDB.length === 0) {
      await axios("http://localhost:3001/types");
    }

    typesDB = await Type.findAll();

    const availableTypes = typesDB.map((t) => t.name);

    const invalidTypes = types.filter((type) => !availableTypes.includes(type));

    if (invalidTypes.length > 0) {
      return res.status(400).json({
        error: `Invalid Pokémon type(s): ${invalidTypes.join(", ")}`,
      });
    }

    const selectedTypes = typesDB.filter((t) => types.includes(t.name));

    const [pokemon, created] = await Pokemon.findOrCreate({
      where: {
        name,
        image,
        ps,
        atk,
        def,
        vel,
        height,
        weight,
      },
    });

    if (created) {
      await pokemon.addTypes(selectedTypes);
    } else {
      return res.status(400).json({ error: "Pokemon already exists" });
    }

    const pokemon_types = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      ps: pokemon.ps,
      atk: pokemon.atk,
      def: pokemon.def,
      vel: pokemon.vel,
      height: pokemon.height,
      weight: pokemon.weight,
      types: selectedTypes.map((t) => {
        return t.name;
      }),
    };

    return res.status(200).json(pokemon_types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
