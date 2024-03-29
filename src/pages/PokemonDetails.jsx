import { useEffect, useRef, useState } from "react";
import { upperFirst } from "../utils/upperFirst";
import { translateName } from "../utils/translateName";
import Pokecard from "../components/Pokecard/Pokecard";
import { createPortal } from "react-dom";
import MakeForm from "../components/MakeForm/MakeForm";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function PokemonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // récupère l'id dans l'url

  // Refs
  const name = useRef("");
  const height = useRef("");
  const weight = useRef("");
  const hp = useRef("");
  const attack = useRef("");
  const defense = useRef("");
  const specialAttack = useRef("");
  const specialDefense = useRef("");
  const speed = useRef("");
  const image = useRef("");
  const types = useRef([]);

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePokemon, setUpdatePokemon] = useState(false);

  // fetch le pokemon

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Modale
  useEffect(() => {
    if (updatePokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [updatePokemon]);

  //    fonctions

  async function fetchPokemon() {
    if (loading) return;
    setLoading(true);

    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // si l'id est un nombre, on fetch le pokemon par son id
    // sinon on fetch le pokemon par son nom firebase
    if (isNaN(id)) {
      url = `https://pokerocket-90ef4-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // // si je crée un pokemon, on lui ajoute un id
      if (isNaN(id)) {
        data.id = id;
      }

      setPokemon(data);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Un erreur est survenue !");
    }
  }

  const onUpdatePokemonHandler = async () => {
    const updatedPokemon = {
      // General
      id,
      // équivaut à id :id
      name: name.current.value,
      height: height.current.value / 10, // cm to decimeter
      weight: weight.current.value * 10, // kg to hectogram
      sprites: {
        other: {
          home: {
            front_default: image.current.value,
          },
        },
      },
      // Stats
      stats: [
        {
          base_stat: hp.current.value,
          stat: {
            name: "hp",
          },
        },
        {
          base_stat: attack.current.value,
          stat: {
            name: "attack",
          },
        },
        {
          base_stat: defense.current.value,
          stat: {
            name: "defense",
          },
        },
        {
          base_stat: specialAttack.current.value,
          stat: {
            name: "special-attack",
          },
        },
        {
          base_stat: specialDefense.current.value,
          stat: {
            name: "special-defense",
          },
        },
        {
          base_stat: speed.current.value,
          stat: {
            name: "speed",
          },
        },
      ],
      // Types
      types: [],
    };

    // Loop on types to add them to pokemon if checked
    const typesKeys = Object.keys(types.current);
    typesKeys.forEach((type) => {
      if (types.current[type].checked) {
        updatedPokemon.types.push({
          type: {
            name: type,
          },
        });
      }
    });

    // 3eme phase
    // on crée une copie du pokemon pour remettre à jour si pb alors que pas connexion
    const pokemonBefore = {};
    Object.assign(pokemonBefore, pokemon);
    // mieux que :
    // for (let key in pokemon) {
    //   pokemonBefore[key]=pokemon[key]
    // }

    // 2eme phase
    // En mettant à jour avant envoi à DB, on a un rendu optimiste
    //  on part du principe que tout se passera bien !
    //  même mauvaise connexion : navigation fluide !
    setPokemon(updatedPokemon); // with optimistic rendering
    setUpdatePokemon(false); // with optimistic rendering
    setLoading(false); // with optimistic rendering

    // MAJ dans firebase

    const response = await fetch(
      `https://pokerocket-90ef4-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPokemon),
      }
    );
    // error ?
    if (!response.ok) {
      toast.error("Un erreur est survenue !");
      // return; // pas utile dans un optimistic rendering
      // suite phase 3
      setPokemon(pokemonBefore); // with optimistic rendering... au cas où...
    }
    // fermeture modale
    //  attention, méthode lente et pas optimisée si connexion lente
    //  on peut utiliser l'optimistic rendering
    // on met à jour le pokemon avant même l'envoi à firebase !
    // avant le fectch !

    // 1ere phase
    // setUpdatePokemon(false);  // without optimistic rendering
    // setLoading(false);  // without optimistic rendering
    // setPokemon(updatedPokemon);  // without optimistic rendering
  };

  const onDeletePokemonHandler = async () => {
    // Delete
    if (window.confirm("Voulez-vous vraiment supprimer ce pokémon ?")) {
      setLoading(true);
      // delete de la DB

      const response = await fetch(
        `https://pokerocket-90ef4-default-rtdb.europe-west1.firebasedatabase.app/pokemons/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(updatedPokemon),
        }
      );
      // error ?
      if (!response.ok) {
        toast.error("Un erreur est survenue !");
        return;
      }
      toast.success("Pokemon supprimé !");
        navigate("/")
      
    }
  };

  if (loading) return <div className="text-center">Chargement...</div>;

  if (!pokemon || !pokemon.name)
    return <div className="text-center">Pokemon non trouvé</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <Pokecard pokemon={pokemon} details />

      <Toaster position="bottom-center" richColors expand={true} />
      {isNaN(id) && (
        <div className="flex justify-end gap-4 mt-5">
          <div
            className="font-semibold cursor-pointer text-yellow-pokemon hover:text-yellow-300"
            onClick={() => setUpdatePokemon(true)}
          >
            Modifier
          </div>
          <div
            className="font-semibold cursor-pointer text-yellow-pokemon hover:text-yellow-300"
            onClick={onDeletePokemonHandler}
          >
            Supprimer
          </div>
        </div>
      )}

      {updatePokemon &&
        createPortal(
          <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center text-black bg-black bg-opacity-90">
            <div className="w-full max-w-xl p-8 my-10 overflow-y-auto bg-white cursor-auto rounded-xl">
              {/* Close */}
              <div className="flex justify-end text-black cursor-pointer hover:text-yellow-pokemon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdatePokemon(false);
                  }}
                >
                  <g fill="currentColor">
                    <path d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94l-1.97-1.97Z"></path>
                    <path
                      fillRule="evenodd"
                      d="M12.057 1.25h-.114c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z"
                      clipRule="evenodd"
                    ></path>
                  </g>
                </svg>
              </div>

              <h2 className="mb-5 text-3xl font-semibold">
                Modifier un pokémon
              </h2>

              <MakeForm
                name={name}
                height={height}
                weight={weight}
                hp={hp}
                attack={attack}
                defense={defense}
                specialAttack={specialAttack}
                specialDefense={specialDefense}
                speed={speed}
                image={image}
                types={types}
                onFormSubmittedHandler={onUpdatePokemonHandler}
                pokemon={pokemon}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
