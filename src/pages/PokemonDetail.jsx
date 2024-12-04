import React from "react";
import { GET_POKEMON_DETAIL } from "../graphql/queries/pokemon";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { name } = useParams();
  const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      name,
      offsetFlavorTexts: 0,
      takeFlavorTexts: 10,
      reverseFlavorTexts: true,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const pokemon = data.getPokemon;

  return (
    <div>
      <h1 className="text-2xl sm:text-[18px] lg:text-[35px] mt-12  ">
        Pokemon Detail
      </h1>
      <div className="flex mt-5 mx-auto w-full max-w-[1400px] flex-wrap sm:flex-nowrap">
        <div className="w-full md:w-[50%] flex justify-center items-start">
          <img
            src={pokemon.sprite}
            className="w-full max-w-[250px] h-auto"
            alt="pokemon-sprite"
          />
        </div>
        <div className="w-full sm:w-[55%]">
          <h1 className="sm:text-[18px] lg:text-[30px]">{pokemon.species}</h1>
          <p>
            <span className="font-bold">Height:</span>{" "}
            <span>{pokemon.height} meters</span>
          </p>
          <p>
            <span className="font-bold">Weight:</span>{" "}
            <span>{pokemon.weight} kg</span>
          </p>
          <p>
            <span className="font-bold">Color:</span>{" "}
            <span>{pokemon.color}</span>
          </p>
          <p>
            <span className="font-bold">Gender:</span>
            <span className="font-bold"> Male:</span> {pokemon.gender.male}
            <span className="font-bold"> Female:</span> {pokemon.gender.female}
          </p>
          <p>
            <span className="font-bold"> Base Specie:</span>{" "}
            <span> {pokemon.baseSpecies ? pokemon.baseSpecies : "None"}</span>
          </p>

          <p className="font-bold mt-2 text-2xl">Types:</p>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Effective Types
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Resisted Types
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Normal Types
                </th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.types?.map((type) => (
                <tr key={type.name} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">
                    {type.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">
                    {type.matchup.attacking.effectiveTypes.join(", ") || "None"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">
                    {type.matchup.attacking.resistedTypes.join(", ") || "None"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">
                    {type.matchup.attacking.normalTypes.join(", ") || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="font-bold mt-2 text-2xl">Abilities:</p>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(pokemon?.abilities || {})
                .filter((ability) => ability && ability.name)
                .map((ability, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">
                      {ability.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      {ability.desc || "No description available"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      <div className="flex flex-col space-y-2">
                        {ability.bulbapediaPage && (
                          <a
                            href={ability.bulbapediaPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline"
                          >
                            Bulbapedia
                          </a>
                        )}
                        {ability.serebiiPage && (
                          <a
                            href={ability.serebiiPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline"
                          >
                            Serebii
                          </a>
                        )}
                        {ability.smogonPage && (
                          <a
                            href={ability.smogonPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline"
                          >
                            Smogon
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div class="spacer"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
