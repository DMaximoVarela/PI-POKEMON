import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsDB } from "../../redux/actions/actions";
import style from "./Pokemons.module.css";
import Cards from "../../components/Cards/Cards";

const Pokemons = () => {
  const dispatch = useDispatch();
  const pokemonsDB = useSelector((state) => state.pokemonsDB);

  useEffect(() => {
    if (pokemonsDB.length === 0) {
      dispatch(getPokemonsDB());
    }
  }, []);

  return (
    <div className={style.container}>
      <h1>My Pokemons</h1>
      {pokemonsDB.length > 0 ? (
        <Cards pokemons={pokemonsDB} />
      ) : (
        <h2>No pokemons have been created yet</h2>
      )}
    </div>
  );
};

export default Pokemons;
