import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CartNote from "../components/CartNote";
import formatData from "../utils/FormatDate";
import api from "../api/axiosConfig.js";
import { toast } from "react-toastify";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  if (loading) return <span>Cargando...</span>;

  return (
    
    <div className="p-4">
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
          <h2 className="text-4xl font-bold mb-2">¡Bienvenido!</h2>
          <p className="mb-4">Aún no tienes notas creadas.</p>
          <p className="text-sm">
            Haz clic en <strong>"Crear Nota"</strong> en la barra de navegación
            para empezar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {notes.map((note) => (
            <CartNote
              key={note._id}
              title={note.title}
              content={note.content}
              id={note._id}
              date={formatData(note.createdAt)}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
