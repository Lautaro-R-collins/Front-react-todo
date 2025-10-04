import { NavLink } from "react-router-dom"
import { FaPlus } from "react-icons/fa";

export const NavBar = () => {
  return (
    <nav className="flex justify-between navbar bg-base-300 px-4">
      <NavLink className="text-xl font-bold" to="/">TO-DO APP</NavLink>
        <NavLink to="/createNote" className="btn btn-primary gap-2">
          <FaPlus />
          Crear Nota
        </NavLink>
    </nav>

  )
}

export default NavBar