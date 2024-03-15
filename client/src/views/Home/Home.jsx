import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  filterByType,
  getPokemons,
  getTypes,
  orderByName,
  orderByAtk,
} from "../../redux/actions/actions";
import Cards from "../../components/Cards/Cards";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const types = useSelector((state) => state.types);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemons());
    }
  }, []);

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, []);

  const resetPokemons = () => {
    if (pokemons.length < 151) {
      dispatch(getPokemons());
    } else {
      alert("All the pokemons are already here!");
    }
  };

  const handleFilterByType = (event) => {
    dispatch(filterByType(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleOrderByName = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const handleOrderByAtk = (event) => {
    dispatch(orderByAtk(event.target.value));
  };

  return (
    <div className={style.container}>
      <div className={style.slctText}>
        <h2>FILTERS:</h2>
        <h2>SORTS:</h2>
      </div>
      <div className={style.slctContainer}>
        <div className={style.filters}>
          <h3>By Type:</h3>
          <select
            onChange={handleFilterByType}
            defaultValue={"All"}
            className={style.slct}
          >
            <option value="All">All</option>
            {types?.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <h3>By Origin:</h3>
          <select
            onChange={handleFilterByOrigin}
            defaultValue={"All"}
            className={style.slct}
          >
            <option value="All">All</option>
            <option value="API">Api</option>
            <option value="DATABASE">Database</option>
          </select>
        </div>
        <div className={style.sorts}>
          <h3>By Name:</h3>
          <select
            onChange={handleOrderByName}
            defaultValue={"disordered"}
            className={style.slct}
          >
            <option value="disordered" disabled="disabled">
              Disordered
            </option>
            <option value="ASC">Ascendent</option>
            <option value="DES">Descendent</option>
          </select>
          <h3>By ATK:</h3>
          <select
            onChange={handleOrderByAtk}
            defaultValue={"disordered"}
            className={style.slct}
          >
            <option value="disordered" disabled="disabled">
              Disordered
            </option>
            <option value="ASC">Ascendent</option>
            <option value="DES">Descendent</option>
          </select>
        </div>
      </div>

      <button onClick={resetPokemons} className={style.btn}>
        All Pokemons
      </button>
      <Cards pokemons={pokemons} />
    </div>
  );
};

export default Home;
