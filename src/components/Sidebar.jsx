import { FaHome, FaPlus, FaLayerGroup } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = ({
  isOpen,
  openCreateModal,
  boards,
  selectedBoard,
  setSelectedBoard,
  openCreateBoardModal,
}) => {
  const { user } = useAuth();
  const userName =
    user.name.charAt(0).toUpperCase() +
    user.name.slice(1).toLowerCase();
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:flex fixed top-16 left-0 h-screen bg-base-200 z-40 transition-all duration-300 flex-col
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Avatar */}
          <div className="flex items-center gap-3 p-4 shrink-0 mt-2">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-lg font-bold">{userInitial}</span>
            </div>
            {isOpen && (
              <span className="font-semibold text-lg">{userName}</span>
            )}
          </div>

          {/* Navegación */}
          <nav className="flex-1 overflow-y-auto px-2 pb-4 custom-scroll flex flex-col gap-1">
            <button
              className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full text-left
                ${selectedBoard === null ? "bg-base-300" : ""}
              `}
              onClick={() => setSelectedBoard(null)}
            >
              <FaHome className="text-lg" />
              {isOpen && <span>Todas las notas</span>}
            </button>

            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
              onClick={openCreateModal}
            >
              <FaPlus className="text-lg" />
              {isOpen && <span>Crear Nota</span>}
            </button>

            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
              onClick={openCreateBoardModal}
            >
              <FaPlus className="text-lg" />
              {isOpen && <span>Crear Tablero</span>}
            </button>

            {boards.map((board) => (
              <button
                key={board._id}
                className={`flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left
                  ${selectedBoard?._id === board._id ? "bg-base-300" : ""}
                `}
                onClick={() => setSelectedBoard(board)}
              >
                <FaLayerGroup className="text-lg" />
                {isOpen && <span>{board.name}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile (igual que lo tenías) */}
      <div
        className={`md:hidden fixed top-16 left-0 h-screen bg-base-200 z-50 transition-transform duration-300 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header con Avatar y nombre */}
          <div className="flex items-center gap-3 p-4 shrink-0">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-lg font-bold">{userInitial}</span>
            </div>
            <span className="font-semibold text-lg">{userName}</span>
          </div>

          {/* Navegación con scroll */}
          <nav className="flex-1 overflow-y-auto px-4 pb-4 custom-scroll">
            <button
              className={`flex items-center gap-2 p-2 rounded w-full text-left
                ${selectedBoard === null ? "bg-base-300" : ""}
              `}
              onClick={() => setSelectedBoard(null)}
            >
              <FaHome /> Todas las notas
            </button>

            {boards.map((board) => (
              <button
                key={board._id}
                className={`flex items-center gap-2 p-2 rounded w-full text-left
                  ${selectedBoard?._id === board._id ? "bg-base-300" : ""}
                `}
                onClick={() => setSelectedBoard(board)}
              >
                <FaLayerGroup /> {board.name}
              </button>
            ))}

            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={openCreateModal}
            >
              <FaPlus /> Crear Nota
            </button>

            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={openCreateBoardModal}
            >
              <FaPlus /> Crear Tablero
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
