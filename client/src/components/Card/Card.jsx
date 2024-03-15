import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Card.module.css";
import { deletePokemon, getPokemons } from "../../redux/actions/actions";

const Card = ({ pokemon }) => {
  const { id, name, image, types } = pokemon;

  const dispatch = useDispatch();

  const removePokemon = (id) => {
    dispatch(deletePokemon(id));
    dispatch(getPokemons());
  };

  const location = useLocation();

  return (
    <div className={style.container}>
      <h2 className={style.name}>{name}</h2>
      {location.pathname === "/home" && (
        <Link to={`/detail/${id}`}>
          <img src={image} alt="pokemonIMG" className={style.imgLink} />
        </Link>
      )}

      {location.pathname === "/pokemons" && (
        <img src={image} alt="pokemonIMG" className={style.img} />
      )}

      {types.map((type) => {
        return (
          <h3 key={type} className={style.type}>
            {type}
          </h3>
        );
      })}
      {location.pathname === "/pokemons" && (
        <Link to={`/edit/${id}`}>
          <button className={style.btn}>Edit</button>
        </Link>
      )}
      {location.pathname === "/pokemons" && (
        <button
          onClick={() => {
            removePokemon(id);
          }}
          className={style.btn}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Card;
