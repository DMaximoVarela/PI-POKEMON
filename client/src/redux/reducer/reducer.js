import {
  GET_POKEMONS,
  GET_POKEMONS_BY_NAME,
  FILTER_BY_TYPE,
  GET_TYPES,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATK,
} from "../actions/actions-types";
const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: payload,
        pokemons: payload,
      };
    case GET_POKEMONS_BY_NAME:
      return {
        ...state,
        allPokemons: payload,
        pokemons: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case FILTER_BY_TYPE:
      const filteredPokemonsByType = state.allPokemons.filter((pokemon) => {
        return pokemon.types.includes(payload);
      });
      return {
        ...state,
        pokemons:
          payload === "All" ? state.allPokemons : filteredPokemonsByType,
      };
    case FILTER_BY_ORIGIN:
      let filteredPokemonsByOrigin = [];
      if (payload === "API") {
        filteredPokemonsByOrigin = state.allPokemons.filter(
          (pokemon) => pokemon.id <= 151
        );
      } else if (payload === "DATABASE") {
        filteredPokemonsByOrigin = state.allPokemons.filter(
          (pokemon) => pokemon.id > 151
        );
      }
      return {
        ...state,
        pokemons:
          payload === "All" ? state.allPokemons : filteredPokemonsByOrigin,
      };
    case ORDER_BY_NAME:
      let orderedPokemonsByName = [...state.pokemons];
      if (payload === "ASC") {
        orderedPokemonsByName.sort((a, b) => a.name.localeCompare(b.name));
      } else if (payload === "DES") {
        orderedPokemonsByName.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        pokemons: orderedPokemonsByName,
      };
    case ORDER_BY_ATK:
      let orderedPokemonsByAtk = [...state.pokemons];
      if (payload === "ASC") {
        orderedPokemonsByAtk.sort((a, b) => a.atk - b.atk);
      } else if (payload === "DES") {
        orderedPokemonsByAtk.sort((a, b) => b.atk - a.atk);
      }
      return {
        ...state,
        pokemons: orderedPokemonsByAtk,
      };

    default:
      return state;
  }
}

export default reducer;
