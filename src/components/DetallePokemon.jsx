import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unPokemonDetalleAccion } from "../redux/pokesDucks";

const DetallePokemon = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(unPokemonDetalleAccion());
    };
    fetchData();
  }, [dispatch]);
  const pokemon = useSelector((store) => store.pokemones.unPokemon);
  //console.log(pokemon);

  return pokemon ? (
    <div className="card mt-4 text-center">
      <h3 className="card-header">Detalle del Pokemon</h3>
      <div className="card-body">
        <img src={pokemon.imagen} alt={pokemon.nombre} className="img-fluid w-25" />
        <div className="card-title text-capitalize">
          <h2>{pokemon.nombre}</h2>
          <p className="card-text">
            Alto: {pokemon.alto} <br />
            Ancho: {pokemon.ancho} <br />
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default DetallePokemon;
