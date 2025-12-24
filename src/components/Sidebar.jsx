import { useAuth } from "../context/AuthContext.jsx";
import SidebarContent from "./SidebarContent";

const Sidebar = ({
  isOpen,
  boards,
  selectedBoard,
  setSelectedBoard,
  openCreateBoardModal,
  openRenameBoardModal,
  openDeleteModal,
}) => {
  const { user } = useAuth();

  // Safety check si el usuario es null
  if (!user) return null;

  const userName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();
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

          {/* Navegación Desktop */}
          <SidebarContent
            isOpen={isOpen}
            boards={boards}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            openCreateBoardModal={openCreateBoardModal}
            openRenameBoardModal={openRenameBoardModal}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`md:hidden fixed top-16 left-0 h-screen bg-base-200 z-[1200] transition-transform duration-300 w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 shrink-0">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-lg font-bold">{userInitial}</span>
            </div>
            <span className="font-semibold text-lg">{userName}</span>
          </div>

          {/* Navegación Mobile */}
          <SidebarContent
            isOpen={true}
            boards={boards}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            openCreateBoardModal={openCreateBoardModal}
            openRenameBoardModal={openRenameBoardModal}
            openDeleteModal={openDeleteModal}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
