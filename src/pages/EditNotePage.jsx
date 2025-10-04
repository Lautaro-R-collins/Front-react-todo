import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NoteForm from "../components/NoteForm";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  // Obtener datos de la nota
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error(error); 
        toast.error("Error al actualizar la nota");
      }
    };
    fetchNote();
  }, [id]);

  // Enviar cambios
  const handleUpdate = async (updatedNote) => {
    try {
      await axios.put(`${apiUrl}/api/notes/${id}`, updatedNote);
      toast.success("Nota actualizada!");
      navigate("/"); 
    } catch (error) {
      console.error(error); 
      toast.error("Error al actualizar la nota");
    }
  };

  if (!note) return <p className="text-center mt-6">Cargando nota...</p>;

  return (
    <div>
      <h1 className="text-center mt-4 text-2xl font-bold">Editar Nota</h1>
      <NoteForm onSubmit={handleUpdate} initialDate={note} />
    </div>
  );
};

export default EditNotePage;
