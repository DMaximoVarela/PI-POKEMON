import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMONS_BY_NAME,
  FILTER_BY_TYPE,
  GET_TYPES,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATK,
} from "./actions-types";

export const getPokemons = () => {
  const URL = "http://localhost:3001/pokemons";

  return async (dispatch) => {
    try {
      const { data } = await axios(URL);
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const getPokemonsByName = (pokemonName) => {
  const URL = "http://localhost:3001/pokemon";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}?Name=${pokemonName}`);
      return dispatch({
        type: GET_POKEMONS_BY_NAME,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const getTypes = () => {
  const URL = "http://localhost:3001/types";

  return async (dispatch) => {
    try {
      const { data } = await axios(URL);
      dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const filterByType = (payload) => ({
  type: FILTER_BY_TYPE,
  payload,
});

export const filterByOrigin = (payload) => ({
  type: FILTER_BY_ORIGIN,
  payload,
});

export const orderByName = (payload) => ({
  type: ORDER_BY_NAME,
  payload,
});

export const orderByAtk = (payload) => ({
  type: ORDER_BY_ATK,
  payload,
});
