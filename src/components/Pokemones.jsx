import React from "react";
// hooks react redux
import { useDispatch, useSelector } from "react-redux";
import {
  anteriorPokemonesAccion,
  obtenerPokemonesAccion,
  siguientePokemonesAccion,
  unPokemonDetalleAccion,
} from "../redux/pokesDucks";
import DetallePokemon from "./DetallePokemon";

// importamos la acción

const Pokemones = () => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(obtenerPokemonesAccion());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Lista de Pokemones!</h2>
        <div className="d-flex justify-content-between">
          {pokemones.length === 0 && (
            <button
              className="btn btn-dark btn-sm float-right"
              onClick={() => dispatch(obtenerPokemonesAccion())}
            >
              Obtener
            </button>
          )}
          {next && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(siguientePokemonesAccion())}
            >
              Siguiente
            </button>
          )}
          {previous && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(anteriorPokemonesAccion())}
            >
              Anterior
            </button>
          )}
        </div>
        <ul className="list-group mt-3 text-capitalize">
          {pokemones.map((pokemon) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={pokemon.name}
            >
              {pokemon.name}

              <button
                className="btn btn-dark btn-sm float-right"
                onClick={() => dispatch(unPokemonDetalleAccion(pokemon.url))}
              >
                Info
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <DetallePokemon />
      </div>
    </div>
  );
};

export default Pokemones;
