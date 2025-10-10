import { FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";

const SubNavbar = ({
  selectedBoard,
  openRenameBoardModal,
  openDeleteModal,
}) => {
  return (
    <div
      className="-mx-4 flex justify-between items-center mb-4 py-4 px-8 
                 bg-base-200/60 backdrop-blur-md border-b border-amber-50"
    >
      {/* Título */}
      <h1 className="text-2xl font-bold">
        {selectedBoard ? selectedBoard.name : "Todas las notas"}
      </h1>

      {/* Menú de opciones si hay tablero */}
      {selectedBoard && (
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-base-300/80 backdrop-blur-md border-none shadow-sm"
          >
            <FiMoreHorizontal size={22} />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-300 rounded-box w-52 z-50"
          >
            {/* Renombrar tablero */}
            <li>
              <button onClick={openRenameBoardModal}>
                <FiEdit2 size={18} className="mr-2" />
                Cambiar nombre
              </button>
            </li>
            {/* Eliminar tablero */}
            <li>
              <button
                onClick={openDeleteModal}
                className="text-red-600"
              >
                <FiTrash2 size={18} className="mr-2" />
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubNavbar;
