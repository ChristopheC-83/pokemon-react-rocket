import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import CreatePokemon from "./pages/CreatePokemon";
import PokemonDetails from "./pages/PokemonDetails";
import Main from "./Layout/Main";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        // { path: "/", element: <Home /> },
        { index:true, element: <Home /> }, // index:true permet de définir la page par défaut
        { path: "/about", element: <About /> },
        { path: "/create-pokemon", element: <CreatePokemon /> },
        { path: "/pokemon/:id", element: <PokemonDetails /> },
      ],
    },
    // on peut personnaliser pour une page, ou groupe, donnée
    // {
    //   path: "/admin ",
    //   element: <MainAdmin />,
    //   errorElement: <Error />,
    //   children: [
    //     { path: "/admin", element: <Admin /> },
    //     { path: "/users", element: <Users /> },
    //   ],
    // },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
