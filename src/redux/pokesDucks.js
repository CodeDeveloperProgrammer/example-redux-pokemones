import axios from "axios";

// constantes //valores obtenidos de la data de la API
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

//types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const ANTERIOR_POKEMONES_EXITO = "ANTERIOR_POKEMONES_EXITO";
const DETALLE_POKEMON_EXITO = "DETALLE_POKEMON_EXITO";

//reducer
export default function pokesReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case ANTERIOR_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case DETALLE_POKEMON_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
}

//action creators
// ,getState
export const unPokemonDetalleAccion = (url) => async (dispatch) => {
  if (url === undefined) {
    url = "https://pokeapi.co/api/v2/pokemon/1/";
  }
  if (localStorage.getItem(url)) {
    const data = JSON.parse(localStorage.getItem(url));
    dispatch({
      type: DETALLE_POKEMON_EXITO,
      payload: data,
    });
    return;
  }
  try {
    const { data } = await axios.get(url);
    console.log(data);
    dispatch({
      type: DETALLE_POKEMON_EXITO,
      payload: {
        nombre: data.name,
        alto: data.height,
        ancho: data.weight,
        imagen: data.sprites.front_default,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// ,getState
export const obtenerPokemonesAccion = () => async (dispatch) => {
  if (localStorage.getItem("pokemones")) {
    console.log("datos guardados");
    const data = JSON.parse(localStorage.getItem("pokemones"));
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: data,
    });
    return;
  }
  try {
    console.log("datos desde la API");
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=7`
    );
    console.log(data);
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: data,
    });
    localStorage.setItem("pokemones", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const siguientePokemonesAccion = () => async (dispatch, getState) => {
  const next = getState().pokemones.next;
  if (localStorage.getItem(next)) {
    const data = JSON.parse(localStorage.getItem(next));
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: data,
    });
    return;
  }
  console.log(next);
  try {
    const res = await axios.get(next);
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const anteriorPokemonesAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;
  if (localStorage.getItem(previous)) {
    const data = JSON.parse(localStorage.getItem(previous));
    dispatch({
      type: ANTERIOR_POKEMONES_EXITO,
      payload: data,
    });
    return;
  }
  console.log(previous);
  try {
    const res = await axios.get(previous);
    dispatch({
      type: ANTERIOR_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(previous, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};
