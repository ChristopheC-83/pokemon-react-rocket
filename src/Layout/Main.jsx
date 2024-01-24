import Logo from "../components/Logo/Logo";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="min-h-screen px-8 text-white border-t bg-blue-950 border-blue-950">
      <Logo />
      <Nav />
      {/* remplace un children qui serait le corps de la page issu de App.jsx */}
      <Outlet />
      <Footer />
    </div>
  );
}
