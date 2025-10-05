import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { IoIosLogOut } from "react-icons/io";

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between navbar bg-base-300 px-4">
      <NavLink className="text-xl font-bold" to="/">TO-DO APP</NavLink>
      <div className="flex gap-2">
        {user ? (
          <>
            <span className="self-center">Hola, {user.name}</span>
            <NavLink to="/createNote" className="btn btn-primary gap-2">
              <FaPlus />
              Crear Nota
            </NavLink>
            <button className="btn btn-ghost" onClick={logout}>Salir <IoIosLogOut className="text-2xl"/></button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-outline">Inicio</NavLink>
            <NavLink to="/register" className="btn btn-primary">Registro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
