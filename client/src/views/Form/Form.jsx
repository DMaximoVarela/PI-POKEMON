import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions/actions";
import { validation } from "./validation";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [pokemonCreated, setPokemonCreated] = useState({
    name: "",
    image: "",
    ps: 0,
    atk: 0,
    def: 0,
    vel: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, []);

  const createPokemon = async (pokemon) => {
    const URL = "http://localhost:3001/pokemons";

    try {
      const { data } = await axios.post(URL, pokemon);
      return data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleTypeChange = (evento) => {
    const selectedType = evento.target.value;
    const isSelected = pokemonCreated.types.includes(selectedType);

    if (isSelected) {
      // Si ya está seleccionado, lo eliminamos
      setPokemonCreated({
        ...pokemonCreated,
        types: pokemonCreated.types.filter((type) => type !== selectedType),
      });
    } else {
      // Verificar si ya hay dos tipos seleccionados
      if (pokemonCreated.types.length < 2) {
        // Si no hay dos tipos seleccionados, agregamos el nuevo tipo
        setPokemonCreated({
          ...pokemonCreated,
          types: [...pokemonCreated.types, selectedType],
        });
      }
    }

    // Validar los tipos y actualizar los errores
    setErrors(
      validation({
        ...pokemonCreated,
        [evento.target.name]: evento.target.value,
      })
    );
  };

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setPokemonCreated({
      ...pokemonCreated,
      [name]: value,
    });

    setErrors(
      validation({
        ...pokemonCreated,
        [evento.target.name]: evento.target.value,
      })
    );
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (Object.keys(errors).length === 0) {
      createPokemon(pokemonCreated);

      setPokemonCreated({
        name: "",
        image: "",
        ps: 0,
        atk: 0,
        def: 0,
        vel: 0,
        height: 0,
        weight: 0,
        types: [],
      });
    } else {
      console.log("Hay errores en el form");
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>Create Your Pokemon</h1>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
            <label>
              <h4 className={style.text}>Name:</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={pokemonCreated.name}
                placeholder="Ingrese el nombre..."
                onChange={handleChange}
                className={style.inputText}
              />
            </label>
            {errors.name && <span>{errors.name}</span>}
            <br />
            <label>
              <h4 className={style.text}>Image:</h4>
              <input
                type="text"
                id="image"
                name="image"
                value={pokemonCreated.image}
                placeholder="Ingrese la imagen..."
                onChange={handleChange}
                className={style.inputText}
              />
            </label>
            {errors.image && <span>{errors.image}</span>}
            <br />
            <label>
              <h4 className={style.text}>Life Points:</h4>
              <input
                type="number"
                id="ps"
                name="ps"
                value={pokemonCreated.ps}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.ps && <span>{errors.ps}</span>}
            <br />
            <label>
              <h4 className={style.text}>ATK Points:</h4>
              <input
                type="number"
                id="atk"
                name="atk"
                value={pokemonCreated.atk}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.atk && <span>{errors.atk}</span>}
            <br />
            <label>
              <h4 className={style.text}>DEF Points:</h4>
              <input
                type="number"
                id="def"
                name="def"
                value={pokemonCreated.def}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.def && <span>{errors.def}</span>}
            <br />
            <label>
              <h4 className={style.text}>VEL Points:</h4>
              <input
                type="number"
                id="vel"
                name="vel"
                value={pokemonCreated.vel}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.vel && <span>{errors.vel}</span>}
            <br />
            <label>
              <h4 className={style.text}>Height:</h4>
              <input
                type="number"
                id="height"
                name="height"
                value={pokemonCreated.height}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.height && <span>{errors.height}</span>}
            <br />
            <label>
              <h4 className={style.text}>Weight:</h4>
              <input
                type="number"
                id="weight"
                name="weight"
                value={pokemonCreated.weight}
                onChange={handleChange}
                className={style.inputNumber}
              />
            </label>
            {errors.weight && <span>{errors.weight}</span>}
            <br />
            <label>
              Types:
              {types.map((type) => (
                <div key={type.name} className={style.typesContainer}>
                  <input
                    type="checkbox"
                    id={type.name}
                    name="types"
                    value={type.name}
                    checked={pokemonCreated.types.includes(type.name)}
                    onChange={handleTypeChange}
                    className={style.inputType}
                  />
                  <label htmlFor={type.name} className={style.typeText}>
                    {type.name}
                  </label>
                </div>
              ))}
            </label>
            {errors.types && <span>{errors.types}</span>}
            <br />
            <button type="submit" className={style.btn}>
              {" "}
              Submit
            </button>
          </form>
        </div>
        <div className={style.cardContainer}>
          <h2 className={style.name}>{pokemonCreated.name}</h2>
          <img
            src={pokemonCreated.image}
            alt="pokemonIMG"
            className={style.img}
          />
          {pokemonCreated.types.map((type) => {
            return (
              <h3 key={type} className={style.type}>
                {type}
              </h3>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Form;
