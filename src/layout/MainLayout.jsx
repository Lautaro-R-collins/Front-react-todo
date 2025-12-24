import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Ajuste al redimensionar
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Estado global de boards
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div className="h-screen">
      <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        boards={boards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
      />

      <main
        className="pt-16 p-4 overflow-y-auto h-screen transition-all duration-300"
        style={{
          marginLeft:
            isSidebarOpen && window.innerWidth >= 768
              ? "16rem"
              : window.innerWidth >= 768
              ? "4rem"
              : "0",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
