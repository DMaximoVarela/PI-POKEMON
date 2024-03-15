const { Pokemon, Type } = require("../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, ps, atk, def, vel, height, weight, types } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "ID not found",
      });
    }

    const existingPokemon = await Pokemon.findOne({ where: { id: id } });

    if (!existingPokemon) {
      return res.status(404).json({
        error: "Pokémon not found",
      });
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name))
      return res.status(400).json({
        error: "The name can only contain letters",
      });

    if (name.length > 15)
      return res.status(400).json({
        error: "The name can only contain up to 15 characters",
      });

    const statsRegex = /^\d{1,3}$/;
    const invalidStat = [ps, atk, def, vel, height, weight].find(
      (stat) => !statsRegex.test(stat)
    );

    if (invalidStat)
      return res.status(400).json({
        error: `Invalid value in ${invalidStat}, only numbers up to 3 digits are allowed.`,
      });

    existingPokemon.name = name || existingPokemon.name;
    existingPokemon.image = image || existingPokemon.image;
    existingPokemon.ps = ps || existingPokemon.ps;
    existingPokemon.atk = atk || existingPokemon.atk;
    existingPokemon.def = def || existingPokemon.def;
    existingPokemon.vel = vel || existingPokemon.vel;
    existingPokemon.height = height || existingPokemon.height;
    existingPokemon.weight = weight || existingPokemon.weight;

    await existingPokemon.save();

    const typesDB = await Type.findAll();
    const availableTypes = typesDB.map((t) => t.name);

    if (types && types.length > 0) {
      const invalidTypes = types.filter(
        (type) => !availableTypes.includes(type)
      );

      if (invalidTypes.length > 0) {
        return res.status(400).json({
          error: `Invalid Pokémon type/s: ${invalidTypes.join(", ")}`,
        });
      }

      const selectedTypes = typesDB.filter((t) => types.includes(t.name));
      await existingPokemon.setTypes(selectedTypes);

      const updatedPokemon = {
        id: existingPokemon.id,
        name: existingPokemon.name,
        image: existingPokemon.image,
        ps: existingPokemon.ps,
        atk: existingPokemon.atk,
        def: existingPokemon.def,
        vel: existingPokemon.vel,
        height: existingPokemon.height,
        weight: existingPokemon.weight,
        types: selectedTypes.map((t) => t.name),
      };

      return res.status(200).json(updatedPokemon);
    } else {
      const existingTypes = await existingPokemon.getTypes();
      const existingTypeNames = existingTypes.map((t) => t.name);

      const updatedPokemon = {
        id: existingPokemon.id,
        name: existingPokemon.name,
        image: existingPokemon.image,
        ps: existingPokemon.ps,
        atk: existingPokemon.atk,
        def: existingPokemon.def,
        vel: existingPokemon.vel,
        height: existingPokemon.height,
        weight: existingPokemon.weight,
        types: existingTypeNames,
      };

      return res.status(200).json(updatedPokemon);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
