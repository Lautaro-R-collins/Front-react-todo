import NoteForm from "../components/NoteForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const CreateNotePage = () => {
  const navigate = useNavigate();

  const Notacreate = async (note) => {
    try {
      await axios.post(`${apiUrl}/api/notes`, note).then((res) => {
        if (res.status != 201) {
          throw new Error("Error al crear una nota");
        }
        toast.success("Nota creada!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        navigate("/")
      });
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4 text-2xl font-bold">Crear Nueva tarea</h1>
      <NoteForm
        onSubmit={Notacreate}
        initialDate={{ title: "", content: "" }}
      />
    </div>
  );
};

export default CreateNotePage;
