import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import CartNote from "../components/CartNote";
import NoteForm from "../components/NoteForm";
import formatData from "../utils/FormatDate";
import api from "../api/axiosConfig.js";
import { toast } from "react-toastify";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); 

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching notes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Nota eliminada", { position: "bottom-center" });
    } catch (error) {
      toast.error("Error al eliminar la nota");
      console.error(error);
    }
  };

  const handleEdit = async (id, updatedNote) => {
    try {
      const response = await api.put(`/api/notes/${id}`, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      toast.success("Nota actualizada", { position: "bottom-center" });
    } catch (error) {
      toast.error("Error al actualizar la nota");
      console.error(error);
    }
  };

  // --------- FUNCIONES PARA MODAL ---------
  const openCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingNote(null);
    setIsModalOpen(false);
  };

  // Guardar nota desde modal (nuevo o editar)
  const handleSubmitModal = async (noteData) => {
    if (editingNote) {
      // Editar
      await handleEdit(editingNote._id, noteData);
    } else {
      // Crear nueva
      try {
        const response = await api.post("/api/notes", noteData);
        setNotes([...notes, response.data]);
        toast.success(`Nota creada: ${response.data.title}`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al crear la nota");
        console.error(error);
      }
    }
    closeModal();
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="h-screen">
      {/* Navbar */}
      <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} openCreateModal={openCreateModal} />

      {/* Contenido principal */}
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
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
            <h2 className="text-4xl font-bold mb-2">¡Bienvenido!</h2>
            <p className="mb-4">Aún no tienes notas creadas.</p>
            <p className="text-sm">
              Haz clic en <strong>"Crear Nota"</strong> en la barra de
              navegación para empezar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {notes.map((note) => (
              <CartNote
                key={note._id}
                title={note.title}
                content={note.content}
                id={note._id}
                date={formatData(note.createdAt)}
                onDelete={handleDelete}
                onEdit={() => openEditModal(note)}
              />
            ))}
          </div>
        )}
      </main>

      {/* --------- MODAL --------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 rounded-2xl p-6 w-full max-w-3xl">
            <div className="flex justify-end mb-4">
              <button className="text-2xl font-bold" onClick={closeModal}>
                ✕
              </button>
            </div>
            <NoteForm
              onSubmit={handleSubmitModal}
              initialDate={editingNote || { title: "", content: "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
