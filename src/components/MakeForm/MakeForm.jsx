import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export default function MakeForm({
  onFormSubmittedHandler,
  name,
  height,
  weight,
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
  image,
  types,
  pokemon,
  ...props
}) {
  // If pokemon is not empty, fill the form with pokemon data
  useEffect(() => {
    if (pokemon) {
      name.current.value = pokemon.name;
      height.current.value = pokemon.height * 10;
      weight.current.value = pokemon.weight / 10;
      hp.current.value = pokemon.stats[0].base_stat;
      attack.current.value = pokemon.stats[1].base_stat;
      defense.current.value = pokemon.stats[2].base_stat;
      specialAttack.current.value = pokemon.stats[3].base_stat;
      specialDefense.current.value = pokemon.stats[4].base_stat;
      speed.current.value = pokemon.stats[5].base_stat;
      image.current.value = pokemon.sprites.other.home.front_default || "";
      pokemon.types.forEach((type) => {
        types.current[type.type.name].checked = true;
      });
    }
  }, [pokemon]);

  //   couleurs
  //   test kiki
  //   const couleurs = ["vert", "bleu", "jaune", "orange", "noir", "blanc", "rouge", "violet", "rose", "marron"];

  // Function
  const onBeforeSubmitHandler = (e) => {
    e.preventDefault();
    let isValid = true;
    // Check if name, height, weight and image are not empty
    if (
      !name.current.value ||
      !height.current.value ||
      !weight.current.value ||
      !image.current.value
    ) {
      isValid = false;
    }

    // If there is no types checked, isValid is false
    let typeChecked = false;
    // let couleursChecked = false;
    const typesKeys = Object.keys(types.current);
    typesKeys.forEach((type) => {
      if (types.current[type].checked) {
        typeChecked = true;
      }
    });
    // couleursKeys.forEach((couleur) => {
    //     if (couleurs.current[couleur].checked) {
    //         couleursChecked = true;
    //     }
    // });

    if (!typeChecked ) {
      isValid = false;
    }

    if (isValid) {
      onFormSubmittedHandler();
    } else {
      toast.error("Merci de remplir le formulaire");
    }
  };

  return (
    <form onSubmit={(e) => onBeforeSubmitHandler(e)}>
      <div className="mb-5">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={name}
          placeholder="Pikachu"
          className="w-full px-3 py-2 text-black border border-gray-400 rounded-md"
        />
      </div>
      {/* test kiki */}
      {/* <div className="mb-5">
        <label htmlFor="couleur">Couleurs</label>
        <div className="flex flex-wrap">
          {couleurs.map((couleur, index) => (
            <label className="w-1/2" key={index}>
              <input
                type="checkbox"
                name={couleur}
                id={couleur}
                value={couleur}
                ref={(ref) => (types.current[{ couleur }] = ref)}
              />
              <label htmlFor={couleur} className="ml-3">
                {couleur}
              </label>
            </label>
          ))}
            </div>
        </div> */}

      <div className="mb-5">
        <label htmlFor="type">Type(s)</label>
        {/* Display all pokemon types checkboxs */}
        <div className="flex flex-wrap">
          <label className="w-1/2">
            <input
              type="checkbox"
              name="normal"
              id="normal"
              value="normal"
              ref={(ref) => (types.current["normal"] = ref)}
            />
            <label htmlFor="normal" className="ml-3">
              Normal
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="fighting"
              id="fighting"
              value="fighting"
              ref={(ref) => (types.current["fighting"] = ref)}
            />
            <label htmlFor="fighting" className="ml-3">
              Combat
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="flying"
              id="flying"
              value="flying"
              ref={(ref) => (types.current["flying"] = ref)}
            />
            <label htmlFor="flying" className="ml-3">
              Vol
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="poison"
              id="poison"
              value="poison"
              ref={(ref) => (types.current["poison"] = ref)}
            />
            <label htmlFor="poison" className="ml-3">
              Poison
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="ground"
              id="ground"
              value="ground"
              ref={(ref) => (types.current["ground"] = ref)}
            />
            <label htmlFor="ground" className="ml-3">
              Sol
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="rock"
              id="rock"
              value="rock"
              ref={(ref) => (types.current["rock"] = ref)}
            />
            <label htmlFor="rock" className="ml-3">
              Roche
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="bug"
              id="bug"
              value="bug"
              ref={(ref) => (types.current["bug"] = ref)}
            />
            <label htmlFor="bug" className="ml-3">
              Insecte
            </label>
          </label>
          <label className="w-1/2">
            <input
              type="checkbox"
              name="ghost"
              id="ghost"
              value="ghost"
              ref={(ref) => (types.current["ghost"] = ref)}
            />
            <label htmlFor="ghost" className="ml-3">
              Spectre
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="steel"
              id="steel"
              value="steel"
              ref={(ref) => (types.current["steel"] = ref)}
            />
            <label htmlFor="steel" className="ml-3">
              Acier
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="fire"
              id="fire"
              value="fire"
              ref={(ref) => (types.current["fire"] = ref)}
            />
            <label htmlFor="fire" className="ml-3">
              Feu
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="water"
              id="water"
              value="water"
              ref={(ref) => (types.current["water"] = ref)}
            />
            <label htmlFor="water" className="ml-3">
              Eau
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="grass"
              id="grass"
              value="grass"
              ref={(ref) => (types.current["grass"] = ref)}
            />
            <label htmlFor="grass" className="ml-3">
              Plante
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="eletric"
              id="eletric"
              value="electric"
              ref={(ref) => (types.current["electric"] = ref)}
            />
            <label htmlFor="eletric" className="ml-3">
              Électrique
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="psychic"
              id="psychic"
              value="psychic"
              ref={(ref) => (types.current["psychic"] = ref)}
            />
            <label htmlFor="psychic" className="ml-3">
              Psy
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="ice"
              id="ice"
              value="ice"
              ref={(ref) => (types.current["ice"] = ref)}
            />
            <label htmlFor="ice" className="ml-3">
              Glace
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="dragon"
              id="dragon"
              value="dragon"
              ref={(ref) => (types.current["dragon"] = ref)}
            />
            <label htmlFor="dragon" className="ml-3">
              Dragon
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="dark"
              id="dark"
              value="dark"
              ref={(ref) => (types.current["dark"] = ref)}
            />
            <label htmlFor="dark" className="ml-3">
              Ténèbres
            </label>
          </label>

          <label className="w-1/2">
            <input
              type="checkbox"
              name="fairy"
              id="fairy"
              value="fairy"
              ref={(ref) => (types.current["fairy"] = ref)}
            />
            <label htmlFor="fairy" className="ml-3">
              Fée
            </label>
          </label>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="type">Taille en cm</label>
        <input
          type="text"
          name="height"
          id="height"
          ref={height}
          placeholder="0.5"
          className="w-full px-3 py-2 text-black border border-gray-400 rounded-md"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="type">Poids en kg</label>
        <input
          type="text"
          name="weight"
          id="weight"
          ref={weight}
          placeholder="3"
          className="w-full px-3 py-2 text-black border border-gray-400 rounded-md"
        />
      </div>
      {/* HP */}
      <div className="mb-5">
        <label htmlFor="hp">HP</label>
        <div className="flex justify-between gap-1">
          <input
            type="range"
            name="hp"
            id="hp"
            min="0"
            max="200"
            className="w-full"
            ref={hp}
          />
        </div>
      </div>
      {/* Attack */}
      <div className="mb-5">
        <label htmlFor="attack">Attaque</label>
        <input
          type="range"
          name="attack"
          id="attack"
          min="0"
          max="200"
          className="w-full"
          ref={attack}
        />
      </div>
      {/* Defense */}
      <div className="mb-5">
        <label htmlFor="defense">Défense</label>
        <input
          type="range"
          name="defense"
          id="defense"
          min="0"
          max="200"
          className="w-full"
          ref={defense}
        />
      </div>
      {/* SpecialAttack */}
      <div className="mb-5">
        <label htmlFor="specialAttack">Attaque Spéciale</label>
        <input
          type="range"
          name="specialAttack"
          id="specialAttack"
          min="0"
          max="200"
          className="w-full"
          ref={specialAttack}
        />
      </div>
      {/* SpecialDefense */}
      <div className="mb-5">
        <label htmlFor="specialDefense">Défense Spéciale</label>
        <input
          type="range"
          name="specialDefense"
          id="specialDefense"
          min="0"
          max="200"
          className="w-full"
          ref={specialDefense}
        />
      </div>
      {/* Speed */}
      <div className="mb-5">
        <label htmlFor="speed">Vitesse</label>
        <input
          type="range"
          name="speed"
          id="speed"
          min="0"
          max="200"
          className="w-full"
          ref={speed}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="https://..."
          ref={image}
          className="w-full px-3 py-2 text-black border border-gray-400 rounded-md"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-10 py-3 text-white duration-150 bg-yellow-500 rounded-md hover:bg-yellow-600"
          onClick={(e) => onBeforeSubmitHandler(e)}
        >
          {pokemon ? "Evoluer le pokémon" : "Faire naître un pokémon"}
        </button>
      </div>
    </form>
  );
}
