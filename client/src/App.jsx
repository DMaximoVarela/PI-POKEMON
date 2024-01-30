import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import Nav from "./components/Nav/Nav";
import { getPokemonsByName } from "./redux/actions/actions";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  const onSearch = async (pokemonName) => {
    if (!pokemonName) {
      alert("Please, enter a pokemon name");
      return;
    }

    dispatch(getPokemonsByName(pokemonName));
  };

  return (
    <>
      <div></div>

      {location.pathname !== "/" && <Nav onSearch={onSearch} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
