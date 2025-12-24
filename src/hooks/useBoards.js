import { useState, useCallback, useEffect } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

export const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fetchBoards = useCallback(async () => {
    try {
      const response = await api.get("/api/boards");
      setBoards(response.data);
    } catch (err) {
      console.error("Error fetching boards:", err);
      toast.error("Error al obtener tableros");
    }
  }, []);

  const createBoard = async (name) => {
    try {
      const response = await api.post("/api/boards", { name });
      setBoards((prev) => [...prev, response.data]);
      toast.success("Tablero creado");
      return true;
    } catch (err) {
      console.error("Error creating board:", err);
      toast.error("Error al crear tablero");
      return false;
    }
  };

  const deleteBoard = async (id) => {
    try {
      await api.delete(`/api/boards/${id}`);
      setBoards((prev) => prev.filter((b) => b._id !== id));
      if (selectedBoard?._id === id) {
        setSelectedBoard(null);
      }
      toast.success("Tablero eliminado");
      return true;
    } catch (err) {
      console.error("Error deleting board:", err);
      toast.error("Error al eliminar tablero");
      return false;
    }
  };

  const renameBoard = async (id, newName) => {
    try {
      const res = await api.put(`/api/boards/${id}`, { name: newName });
      setBoards((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      if (selectedBoard?._id === id) {
        setSelectedBoard(res.data);
      }
      toast.success("Tablero renombrado");
      return true;
    } catch (err) {
      console.error("Error renaming board:", err);
      toast.error("Error al renombrar el tablero");
      return false;
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return {
    boards,
    selectedBoard,
    setSelectedBoard,
    fetchBoards,
    createBoard,
    deleteBoard,
    renameBoard,
  };
};
