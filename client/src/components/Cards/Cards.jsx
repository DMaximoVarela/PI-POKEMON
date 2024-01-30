import { useState } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import style from "./Cards.module.css";

const Cards = ({ pokemons }) => {
  const cardsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPokemons = pokemons?.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={style.container}>
        {currentPokemons?.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={pokemons?.length || 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Cards;
