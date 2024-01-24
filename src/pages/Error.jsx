import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo";

export default function Error() {
  return (
    <div className="min-h-screen px-8 border-t bg-blue-950 border-blue-950">
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <Logo />
        <img src="/error.png" alt="error" className="w-[1000px]" />
        <p className="text-3xl">
          <span className="text-yellow-pokemon">Oups ! </span>Il semblerait
          qu'un <b>Ronflex</b> ait bloqué le chemin...
        </p>
        <Link
          to="/"
          className="inline-block px-10 py-4 mx-auto mt-5 text-xl font-semibold text-black uppercase duration-150 rounded-full bg-yellow-pokemon hover:bg-yellow-100"
        >
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
}
