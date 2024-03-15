import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Nav = ({ onSearch }) => {
  const location = useLocation();
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    "https://www.wallpapertip.com/wmimgs/81-813280_pokemon-wallpaper-wallpaper-pokemon-wallpaper-4k.jpg",
    "https://wallpapercave.com/wp/8bqaVUh.jpg",
    "https://wallpapercave.com/wp/wp8155258.png",
    "https://i.pinimg.com/originals/36/d5/26/36d5266391e58b754f31ff2f81ed8c37.png",
    "https://c.wallhere.com/photos/85/19/1920x1080_px_background_pokemon_Raichu_Simple_yellow-1706971.jpg!d",
    "/src/assets/images/Background.gif",
  ];

  const handleBackground = () => {
    const nextIndex = (backgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url("${backgrounds[nextIndex]}")`;
    setBackgroundIndex(nextIndex);
  };

  return (
    <div>
      <header className={style.container}>
        <Link to={"/home"}>
          <button className={style.btn}>Home</button>
        </Link>
        <Link to={"/form"}>
          <button className={style.btn}>Create</button>
        </Link>
        <Link to={"/pokemons"}>
          <button className={style.btn}>My Pokemons</button>
        </Link>
        {location.pathname === "/home" && <SearchBar onSearch={onSearch} />}
        <button className={style.btn} onClick={handleBackground}>
          BG Switch
        </button>
      </header>
    </div>
  );
};

export default Nav;
