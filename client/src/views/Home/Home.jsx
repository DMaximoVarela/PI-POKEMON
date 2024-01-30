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
      alert("Ya estan todos los pokemons!");
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
      <div className={style.slctContainer}>
        <div className={style.filters}>
          <h3>FILTERS:</h3>
          <select
            onChange={handleFilterByType}
            defaultValue={"ByType"}
            className={style.slct}
          >
            <option value="ByType" disabled="disabled">
              By Type
            </option>
            <option value="All">All</option>
            {types?.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            onChange={handleFilterByOrigin}
            defaultValue={"ByOrigin"}
            className={style.slct}
          >
            <option value="ByOrigin" disabled="disabled">
              By Origin
            </option>
            <option value="All">All</option>
            <option value="API">Api</option>
            <option value="DATABASE">Database</option>
          </select>
        </div>
        <h3>SORTS:</h3>
        <div className={style.sorts}>
          <select
            onChange={handleOrderByName}
            defaultValue={"ByName"}
            className={style.slct}
          >
            <option value="ByName" disabled="disabled">
              By Name
            </option>
            <option value="ASC">Ascendente</option>
            <option value="DES">Descendiente</option>
          </select>
          <select
            onChange={handleOrderByAtk}
            defaultValue={"ByATK"}
            className={style.slct}
          >
            <option value="ByATK" disabled="disabled">
              By ATK
            </option>
            <option value="ASC">Ascendente</option>
            <option value="DES">Descendiente</option>
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
