import { useRef } from "react";
import MakeForm from "../components/MakeForm/MakeForm";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreatePokemon() {
  const navigate = useNavigate();
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

  // Function
  const onCreateNewPokemon = async () => {
    const newPokemon = {
      // General
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
        newPokemon.types.push({
          type: {
            name: type,
          },
        });
      }
    });

    // Add to firebase realtime

    const response = await fetch(
      "https://pokerocket-90ef4-default-rtdb.europe-west1.firebasedatabase.app/pokemons.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPokemon),
      }
    );
    //if Error
    if (!response.ok) {
      toast.error("Un erreur est survenue !");
      return;
    } else {
      toast.success("Pokemon créé !");
    }

    // on recupère l'id de la nouvelle création
    //on renomme le nom de l'objet Firebase reçu pour ne pas faire d'amalgame avec le Nom du pokemon
    const { name: newPokemonName } = await response.json();

    // rediriger vers le nouveau pokemon

    navigate(`/pokemon/${newPokemonName}`)
  };

  return (
    <div className="min-h-screen px-8 text-white border-t bg-blue-950 border-blue-950">
      <Toaster position="bottom-center" richColors expand={true} />
      <h1 className="mb-10 text-3xl font-semibold text-center">
        Créer un pokémon
      </h1>
      <div className="max-w-xl p-10 py-6 m-5 mx-auto bg-gray-900 rounded-xl ">
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
          onFormSubmittedHandler={onCreateNewPokemon}
        />
      </div>
    </div>
  );
}
