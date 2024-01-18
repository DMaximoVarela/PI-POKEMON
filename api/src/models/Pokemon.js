const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Pokemon = sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        isUrl: true,
        allowNull: false,
      },
      ps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      def: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  Pokemon.beforeCreate(async (pokemon) => {
    try {
      const maxId = await Pokemon.max("id");

      //Se verifica si el conductor que se está a punto de crear tiene un ID asignado. Si no tiene un ID asignado, se asigna un nuevo ID. El nuevo ID se establece como el valor máximo actual más uno, o 509 si no hay registros en la tabla.

      if (!pokemon.id) {
        pokemon.id = maxId ? maxId + 1 : 152;
      }
    } catch (error) {
      console.error("Error al obtener el máximo id:", error);
      throw error;
    }
  });
};
