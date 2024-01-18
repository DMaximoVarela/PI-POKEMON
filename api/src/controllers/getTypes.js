const axios = require("axios");
const { Type } = require("../db");

const url = "https://pokeapi.co/api/v2/type";

module.exports = async (req, res) => {
  try {
    const { data } = await axios(url);

    const results = data.results;

    const types = results.map((type) => ({ name: type.name }));

    const typesDB = await Type.findAll();

    if (typesDB.length == 0) {
      await Type.bulkCreate(types);
    }

    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
