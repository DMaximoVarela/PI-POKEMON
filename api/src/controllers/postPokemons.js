const axios = require("axios");
const { Pokemon, Type } = require("../db");

module.exports = async (req, res) => {
  try {
    const { name, image, ps, atk, def, vel, height, weight, type } = req.body;

    if (!name || !image || !ps || !atk || !def || !type)
      return res
        .status(400)
        .json({ error: "Por favor llenar los datos obligatorios" });

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name))
      return res.status(400).json({
        error: "El nombre solo puede contener letras",
      });

    if (name.length > 15)
      return res.status(400).json({
        error: "El nombre solo puede contener hasta 15 caracteres",
      });

    const statsRegex = /^\d{1,3}$/;
    const invalidStat = [ps, atk, def, vel, height, weight].find(
      (stat) => !statsRegex.test(stat)
    );

    if (invalidStat)
      return res.status(400).json({
        error: `Valor invalido en ${invalidStat}, solo se permiten números hasta 3 digitos`,
      });

    let typesDB = [];

    if (typesDB.length == 0) {
      await axios("http://localhost:3001/types");
    }

    typesDB = await Type.findAll();

    const types = typesDB.filter((t) => {
      const typeName = t.name;

      return type === typeName;
    });

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
      await pokemon.addType(types);
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
      types: types.map((t) => {
        return t.name;
      }),
    };

    return res.status(200).json(pokemon_types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
