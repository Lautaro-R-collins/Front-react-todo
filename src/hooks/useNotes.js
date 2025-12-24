import { useState, useCallback } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async (boardId = null) => {
    setLoading(true);
    try {
      const response = await api.get("/api/notes", { params: { boardId } });
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error("Error al cargar las notas");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = async (noteData) => {
    try {
      await api.post("/api/notes", noteData);
      toast.success(`Nota creada: ${noteData.title}`);
      return true;
    } catch (err) {
      console.error("Error creating note:", err);
      toast.error("Error al crear la nota");
      return false;
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await api.put(`/api/notes/${id}`, updatedNote);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? response.data : note))
      );
      toast.success("Nota actualizada", { position: "bottom-center" });
      return true;
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Error al actualizar la nota");
      return false;
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Nota eliminada", { position: "bottom-center" });
      return true;
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Error al eliminar la nota");
      return false;
    }
  };

  const togglePinNote = async (id) => {
    try {
      const res = await api.put(`/api/notes/${id}/pin`);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data : note))
      );
      toast.success(res.data.pinned ? "Nota fijada" : "Nota desfijada", {
        position: "bottom-center",
      });
      return true;
    } catch (err) {
      console.error("Error toggling pin:", err);
      toast.error("No se pudo cambiar el estado del pin");
      return false;
    }
  };

  return {
    notes,
    loading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    togglePinNote,
  };
};
