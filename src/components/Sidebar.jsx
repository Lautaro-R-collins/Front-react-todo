import { FaHome, FaPlus, FaLayerGroup } from "react-icons/fa";

const Sidebar = ({
  isOpen,
  openCreateModal,
  boards,
  selectedBoard,
  setSelectedBoard,
  openCreateBoardModal,
}) => {
  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:flex fixed top-16 left-0 h-screen bg-base-200 z-40 transition-all duration-300 flex-col
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        {isOpen && (
          <div className="flex flex-col p-4 gap-4">
            <h2 className="text-xl font-bold">Menú</h2>
            <nav className="flex flex-col gap-2">
              <button
                className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full text-left
                  ${selectedBoard === null ? "bg-base-300" : ""}
                `}
                onClick={() => setSelectedBoard(null)}
              >
                <FaHome /> Todas las notas
              </button>

              {boards.map(board => (
                <button
                  key={board._id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full text-left
                    ${selectedBoard?._id === board._id ? "bg-base-300" : ""}
                  `}
                  onClick={() => setSelectedBoard(board)}
                >
                  <FaLayerGroup /> {board.name}
                </button>
              ))}

              <button
                className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
                onClick={openCreateModal}
              >
                <FaPlus /> Crear Nota
              </button>

              <button
                className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
                onClick={openCreateBoardModal}
              >
                <FaPlus /> Crear Tablero
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div
        className={`md:hidden fixed top-16 left-0 h-screen bg-base-200 z-50 transition-transform duration-300 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col p-4 gap-4">
          <h2 className="text-xl font-bold">Menú</h2>
          <nav className="flex flex-col gap-2">
            <button
              className={`flex items-center gap-2 p-2 rounded w-full text-left
                ${selectedBoard === null ? "bg-base-300" : ""}
              `}
              onClick={() => setSelectedBoard(null)}
            >
              <FaHome /> Todas las notas
            </button>

            {boards.map(board => (
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