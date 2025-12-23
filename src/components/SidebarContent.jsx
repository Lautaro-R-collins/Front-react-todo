import { FaHome, FaPlus, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const SidebarContent = ({
  isOpen,
  selectedBoard,
  setSelectedBoard,
  boards,
  openCreateBoardModal,
  openRenameBoardModal,
  openDeleteModal,
}) => {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isCalendar = location.pathname === "/calendar";

  return (
      <nav className="flex-1 overflow-y-auto px-2 pb-4 custom-scroll flex flex-col gap-1">
        {/* Botón de todas las notas */}
        <Link to="/home">
            <button
            className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full text-left
                ${isHome && selectedBoard === null ? "bg-base-300" : ""}
            `}
            onClick={() => setSelectedBoard && setSelectedBoard(null)}
            >
            <FaHome className="text-lg" />
            {isOpen && <span>Todas las notas</span>}
            </button>
        </Link>
        
        {/* Botón de Calendario */}
        <Link to="/calendar">
            <button
            className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full text-left
                ${isCalendar ? "bg-base-300" : ""}
            `}
            >
            <FaCalendarAlt className="text-lg" />
            {isOpen && <span>Calendario</span>}
            </button>
        </Link>

        {/* Botón para crear tablero */}
        <button
          className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
          onClick={openCreateBoardModal}
        >
          <FaPlus className="text-lg" />
          {isOpen && <span>Crear Tablero</span>}
        </button>

        {/* Listado de tableros */}
        {boards.map((board) => (
          <div
            key={board._id}
            className={`flex items-center justify-between group p-2 rounded hover:bg-base-300 transition cursor-pointer w-full
              ${isHome && selectedBoard?._id === board._id ? "bg-base-300" : ""}
            `}
          >
            {/* Botón para seleccionar tablero */}
            {/* Si estamos en calendar, navegar a home al seleccionar un board */}
            <Link to="/home" className="flex-grow flex items-center" onClick={() => setSelectedBoard && setSelectedBoard(board)}>
                <div className="flex items-center gap-2 w-full">
                <FaLayerGroup className="text-lg" />
                {isOpen && <span className="truncate">{board.name}</span>}
                </div>
            </Link>


            {isOpen && (
              <div className="dropdown dropdown-end ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div tabIndex={0} role="button">
                  <FiMoreHorizontal size={17} />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-lg bg-base-300 rounded-box w-44 z-50"
                >
                  <li>
                    <button
                      onClick={(e) => {
                          e.preventDefault();
                          openRenameBoardModal(board);
                      }}
                      className="flex items-center gap-2"
                    >
                      <FiEdit2 size={16} />
                      Cambiar nombre
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                          e.preventDefault();
                          openDeleteModal(board);
                      }}
                      className="flex items-center gap-2 text-red-500"
                    >
                      <FiTrash2 size={16} />
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>
  );
};

export default SidebarContent;
