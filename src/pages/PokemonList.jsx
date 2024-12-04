import React, {useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_POKEMONS } from "../graphql/queries/pokemon";

const PokemonList = () => {
  const [search, setSearch] = useState("");

  // Query for fetching the full Pokémon list
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { take: 50 },
  });

  const handleSearch = (e) => setSearch(e.target.value);

  // Filter Pokémon based on the search input on the basis of species
  const filteredPokemon = data?.getAllPokemon?.filter((pokemon) =>
    pokemon.species.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p>Error loading Pokémon data: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl sm:text-[18px] lg:text-[45px] mt-12">
        Pokémon List
      </h1>
      <p className="mt-5">
        Below is the list of Pokémon. You can see their details by clicking on
        their card.
      </p>
      <div>
        <input
          type="search"
          placeholder="Search by species"
          className="p-2 w-full border border-black mt-4 rounded-lg outline-none"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-5 px-5 mt-5">
        {filteredPokemon && filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <Link
              key={pokemon.key}
              to={`/detail/${pokemon.key}`}
              className="flex flex-col items-center text-gray-800 no-underline border border-gray-300 rounded-lg p-3 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.species}
                className="w-24 h-24 object-contain"
              />
              <p className="font-semibold mt-2">{pokemon.species}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No Pokémon found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
