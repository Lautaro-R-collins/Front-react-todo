import { useEffect, useState } from "react";
import CartNote from "../components/CartNote";
import formatData from "../utils/FormatDate"; 
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/notes`);
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching notes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  // Eliminar nota
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id)); // Actualiza estado
      toast.success("Nota eliminada", { position: "bottom-center" });
    } catch (error) {
      toast.error("Error al eliminar la nota");
      console.error(error);
    }
  };

  // Editar nota 
  const handleEdit = async (id, updatedNote) => {
    try {
      const response = await axios.put(`${apiUrl}/api/notes/${id}`, updatedNote);
      setNotes(notes.map(note => note._id === id ? response.data : note));
      toast.success("Nota actualizada", { position: "bottom-center" });
    } catch (error) {
      toast.error("Error al actualizar la nota");
      console.error(error);
    }
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div
      className="grid grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] gap-4 p-4
      xl:grid-cols-[repeat(auto-fit,minmax(320px,_1fr))]"
    >
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
  );
};

export default HomePage;
