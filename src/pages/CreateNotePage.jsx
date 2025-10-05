import NoteForm from "../components/NoteForm";
import api from "../api/axiosConfig.js"; // <-- usa esta instancia
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const navigate = useNavigate();

  const Notacreate = async (note) => {
    try {
      const res = await api.post("/api/notes", note);
      toast.success(`Nota creada: ${res.data.title}`);
      navigate("/");
    } catch (error) {
      console.error("Error al crear la nota:", error);
      toast.error(error.response?.data?.message || "Error al crear la nota");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4 text-2xl font-bold">Crear Nueva Nota</h1>
      <NoteForm
        onSubmit={Notacreate}
        initialDate={{ title: "", content: "" }}
      />
    </div>
  );
};

export default CreateNotePage;
