import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { IoIosLogOut } from "react-icons/io";

export const NavBar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center navbar bg-base-300 px-4 fixed top-0 left-0 w-full z-50">
      {/* menú hamburguesa para sidebar */}
      {toggleSidebar && (
        <button
          onClick={toggleSidebar}
          className="text-2xl mr-2 cursor-pointer"
        >
          {isSidebarOpen ? <FaBars /> : <FaTimes />}
        </button>
      )}

      {/* Acciones de usuario */}
      <div className="flex gap-2 ml-auto">
        {user ? (
          <>
            <span className="self-center hidden font-bold sm:inline">
              Hola,{" "}
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLowerCase()}
            </span>
            <button className="btn btn-ghost btn-primary" onClick={logout}>
              Salir <IoIosLogOut className="text-2xl" />
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-primary">
              Inicio
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              Registro
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
