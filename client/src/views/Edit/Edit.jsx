import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validation } from "./validation";
import style from "./Edit.module.css";
import { getPokemons } from "../../redux/actions/actions";

const Edit = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [editedPokemon, setEditedPokemon] = useState({});
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      if (data.name) {
        setPokemon(data);
        setEditedPokemon(data);
      } else {
        window.alert("No hay pokemons con ese ID");
      }
    });

    axios("http://localhost:3001/types").then(({ data }) => {
      setTypes(data);
    });

    return () => {
      setPokemon({});
      setEditedPokemon({});
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditedPokemon({
      ...editedPokemon,
      [name]: value,
    });

    setErrors(
      validation({
        ...editedPokemon,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleType1Change = (event) => {
    setEditedPokemon({
      ...editedPokemon,
      types: [
        event.target.value,
        editedPokemon.types ? editedPokemon.types[1] : "",
      ],
    });

    setErrors(
      validation({
        ...editedPokemon,
        types: [
          event.target.value,
          editedPokemon.types ? editedPokemon.types[1] : "",
        ],
      })
    );
  };

  const handleType2Change = (event) => {
    setEditedPokemon({
      ...editedPokemon,
      types: [
        editedPokemon.types ? editedPokemon.types[0] : "",
        event.target.value,
      ],
    });

    setErrors(
      validation({
        ...editedPokemon,
        types: [
          editedPokemon.types ? editedPokemon.types[0] : "",
          event.target.value,
        ],
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasChanges = Object.keys(editedPokemon).some(
      (key) => editedPokemon[key] !== pokemon[key]
    );

    if (hasChanges && Object.keys(errors).length === 0) {
      axios
        .put(`http://localhost:3001/pokemons/${id}`, editedPokemon)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });

      dispatch(getPokemons());
    } else {
      alert("No hay cambios o hay errores en el formulario");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Edit Pokemon</h1>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>
            <h4 className={style.text}>Name:</h4>
            <input
              type="text"
              id="name"
              name="name"
              value={editedPokemon.name || ""}
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
              value={editedPokemon.image || ""}
              onChange={handleChange}
              className={style.inputText}
            />
          </label>
          {errors.image && <span>{errors.image}</span>}
          <br />
          <h4 className={style.text}>Image preview:</h4>
          <img
            src={editedPokemon.image}
            alt="Imagen de Pokemon"
            className={style.img}
          />
          <br />
          <label>
            <h4 className={style.text}>Life Points:</h4>
            <input
              type="number"
              id="ps"
              name="ps"
              value={editedPokemon.ps || 0}
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
              value={editedPokemon.atk || 0}
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
              value={editedPokemon.def || 0}
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
              value={editedPokemon.vel || 0}
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
              value={editedPokemon.height || 0}
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
              value={editedPokemon.weight || 0}
              onChange={handleChange}
              className={style.inputNumber}
            />
          </label>
          {errors.weight && <span>{errors.weight}</span>}
          <br />
          <label>
            <h4 className={style.text}>Types:</h4>
            <div className={style.typesContainer}>
              <select
                onChange={handleType1Change}
                value={editedPokemon.types ? editedPokemon.types[0] : ""}
                className={style.selectType}
              >
                {types.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>

              <select
                onChange={handleType2Change}
                value={editedPokemon.types ? editedPokemon.types[1] : ""}
                className={style.selectType}
              >
                {types.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          {errors.types && <span>{errors.types}</span>}
          <br />
          <button type="submit" className={style.btn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
