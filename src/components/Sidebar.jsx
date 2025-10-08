import { FaHome, FaPlus } from "react-icons/fa";

const Sidebar = ({ isOpen, openCreateModal }) => {
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
                className="flex items-center gap-2 p-2 rounded hover:bg-base-300 cursor-pointer w-full text-left"
                onClick={openCreateModal}
              >
                <FaPlus /> Crear Nota
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile (drawer) */}
      <div
        className={`md:hidden fixed top-16 left-0 h-screen bg-base-200 z-50 transition-transform duration-300 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col p-4 gap-4">
          <h2 className="text-xl font-bold">Menú</h2>
          <nav className="flex flex-col gap-2">
            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={() => console.log("Ir a Inicio")}
            >
              <FaHome /> Inicio
            </button>
            <button
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={openCreateModal}
            >
              <FaPlus /> Crear Nota
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
