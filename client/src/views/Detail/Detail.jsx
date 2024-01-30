import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      if (data.name) {
        setPokemon(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setPokemon({});
  }, [id]);

  return (
    <>
      <div className={style.container}>
        <Link to={"/home"}>
          <button className={style.btn}>BACK</button>
        </Link>
        {pokemon.name ? (
          <div className={style.infoContainer}>
            <h3 className={style.id}>ID: {pokemon.id}</h3>
            <h2 className={style.name}>Name: {pokemon.name}</h2>
            <img
              src={pokemon?.image}
              alt="pokemonImage"
              className={style.img}
            />
            <h2 className={style.types}>
              {" "}
              Types:
              {pokemon.types.map((t) => {
                return ` ${t}`;
              })}
            </h2>
            <div className={style.stats}>
              <h3 className={style.stat}>PS: {pokemon.ps}</h3>
              <h3 className={style.stat}>ATK: {pokemon.atk}</h3>
              <h3 className={style.stat}>DEF: {pokemon.def}</h3>
            </div>
            <div className={style.statsN}>
              {pokemon.vel ? (
                <h3 className={style.stat}>VEL: {pokemon.vel}</h3>
              ) : (
                ""
              )}
              {pokemon.height ? (
                <h3 className={style.stat}>HEIGHT: {pokemon.height}</h3>
              ) : (
                ""
              )}
              {pokemon.weight ? (
                <h3 className={style.stat}>WEIGHT: {pokemon.weight}</h3>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Detail;
