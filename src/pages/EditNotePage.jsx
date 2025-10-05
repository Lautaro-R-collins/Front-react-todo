import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { toast } from "react-toastify";
import api from "../api/axiosConfig.js"; // <-- usa esta instancia

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  // Obtener datos de la nota
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/api/notes/${id}`);
        setNote(response.data);
      } catch {
        toast.error("Error al cargar la nota");
      }
    };
    fetchNote();
  }, [id]);

  // Enviar cambios
  const handleUpdate = async (updatedNote) => {
    try {
      await api.put(`/api/notes/${id}`, updatedNote); // <-- usa api
      toast.success("Nota actualizada!");
      navigate("/"); // Volvemos al home
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al actualizar la nota"
      );
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
