import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ pokemon }) => {
  const { id, name, image, types } = pokemon;

  return (
    <div className={style.container}>
      <h2 className={style.name}>{name}</h2>
      <Link to={`/detail/${id}`}>
        <img src={image} alt="pokemonIMG" className={style.img} />
      </Link>
      {types.map((type) => {
        return (
          <h3 key={type} className={style.type}>
            {type}
          </h3>
        );
      })}
    </div>
  );
};

export default Card;
