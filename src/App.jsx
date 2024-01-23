import { useState, useEffect } from "react";
import Logo from "./components/Logo/Logo";
import Pokecard from "./components/Pokecard/Pokecard";
import { toast } from "react-toastify";

export default function App() {
  // State
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //  recup 30 pokemon
  const fetchPokemons = async () => {
    setLoading(true);
    toast("chargement...");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pokemons.length}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      setError(true);
      setLoading(false);
      toast.error("Un erreur est survenue !");
      return;
    }

    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    });
    const pokemonDetails = await Promise.all(promises);
    setPokemons([...pokemons, ...pokemonDetails]);
    setLoading(false);
    toast("Pokemons attrapés !");
  };

  useEffect(() => {
    fetchPokemons();
  }, []);
  // recup leurs données

  return (
    <div className="min-h-screen px-8 border-t bg-blue-950 border-blue-950">
      <Logo />

      <div>
        {/* Pokemons */}
        <div className="grid grid-cols-1 gap-10 p-5 mx-auto mt-10 lg:grid-cols-3 md:grid-cols-2 max-w-7xl md:p-0">
          {pokemons.map((pokemon, index) => (
            <Pokecard key={index} pokemon={pokemon} />
          ))}
        </div>
        {/* loading */}
        {loading && (
          <div className="flex justify-center my-4 text-white">
            Chargement en cours...
          </div>
        )}
        {/* get more pokemons */}
        <div className="flex justify-center my-10">
          <button
            className="px-5 py-2 mb-40 font-semibold text-black transition duration-150 bg-white rounded-full shadow hover:bg-gray-100 hover:shadow-xl"
            onClick={() => fetchPokemons()}
          >
            More Pokemons ?
          </button>
        </div>
      </div>
    </div>
  );
}
