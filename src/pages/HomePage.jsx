import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SubNavbar from "../components/SubNavbar";
import Sidebar from "../components/Sidebar";
import NotesGrid from "../components/NotesGrid";
import NoteModal from "../components/NoteModal";
import BoardModal from "../components/boards/BoardModal";
import RenameBoardModal from "../components/boards/RenameBoardModal";
import DeleteBoardModal from "../components/boards/DeleteBoardModal";
import api from "../api/axiosConfig.js";
import { toast } from "react-toastify";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  // Modal notas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Modal tableros
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  // Modales adicionales
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameBoardTitle, setRenameBoardTitle] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ------------------- Fetch notes -------------------
  const fetchNotes = useCallback(
    async (boardId = selectedBoard?._id) => {
      setLoading(true);
      try {
        const response = await api.get("/api/notes", { params: { boardId } });
        setNotes(response.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
      setLoading(false);
    },
    [selectedBoard]
  );

  // ------------------- Fetch boards -------------------
  const fetchBoards = async () => {
    try {
      const response = await api.get("/api/boards");
      setBoards(response.data);
    } catch (err) {
      console.error("Error fetching boards:", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [selectedBoard, location, fetchNotes]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ------------------- Note CRUD -------------------
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Nota eliminada", { position: "bottom-center" });
    } catch {
      toast.error("Error al eliminar la nota");
    }
  };

  const handleEdit = async (id, updatedNote) => {
    try {
      const response = await api.put(`/api/notes/${id}`, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      toast.success("Nota actualizada", { position: "bottom-center" });
    } catch {
      toast.error("Error al actualizar la nota");
    }
  };

  // ------------------- Modals -------------------
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

  const openCreateBoardModal = () => setIsBoardModalOpen(true);
  const closeBoardModal = () => setIsBoardModalOpen(false);

  const handleSubmitModal = async (noteData) => {
    const boardId = selectedBoard?._id || null;
    noteData.board = boardId;

    if (editingNote) {
      await handleEdit(editingNote._id, noteData);
    } else {
      try {
        await api.post("/api/notes", noteData);
        toast.success(`Nota creada: ${noteData.title}`);
        fetchNotes(boardId);
      } catch {
        toast.error("Error al crear la nota");
      }
    }
    closeModal();
  };

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim())
      return toast.error("El nombre no puede estar vacío");
    try {
      const response = await api.post("/api/boards", { name: newBoardTitle });
      setBoards([...boards, response.data]);
      setNewBoardTitle("");
      setIsBoardModalOpen(false);
      toast.success("Tablero creado");
    } catch {
      toast.error("Error al crear tablero");
    }
  };

  // ------------------- Eliminar tablero -------------------
  const handleDeleteBoard = async () => {
    if (!selectedBoard) return;
    try {
      await api.delete(`/api/boards/${selectedBoard._id}`);
      toast.success("Tablero eliminado");
      setBoards(boards.filter((b) => b._id !== selectedBoard._id));
      setSelectedBoard(null);
      fetchNotes(null);
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("Error al eliminar tablero");
    }
  };

  // ------------------- Renombrar tablero -------------------
  const openRenameBoardModal = () => {
    if (!selectedBoard) return;
    setRenameBoardTitle(selectedBoard.name);
    setIsRenameModalOpen(true);
  };

  const handleRenameBoard = async () => {
    if (!renameBoardTitle.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    try {
      const res = await api.put(`/api/boards/${selectedBoard._id}`, {
        name: renameBoardTitle,
      });
      setBoards(
        boards.map((b) => (b._id === selectedBoard._id ? res.data : b))
      );
      setSelectedBoard(res.data);
      toast.success("Tablero renombrado");
      setIsRenameModalOpen(false);
    } catch (err) {
      toast.error("Error al renombrar el tablero");
      console.error(err);
    }
  };

  //      ---- Fijar notas ----

  const handleTogglePin = async (id) => {
    try {
      const res = await api.put(`/api/notes/${id}/pin`);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? res.data : note))
      );
      toast.success(res.data.pinned ? "Nota fijada" : "Nota desfijada", {
        position: "bottom-center",
      });
    } catch (err) {
      console.error("Error al alternar pin:", err);
      toast.error("No se pudo cambiar el estado del pin");
    }
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="h-screen">
      <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        openCreateModal={openCreateModal}
        boards={boards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        openCreateBoardModal={openCreateBoardModal}
        openRenameBoardModal={(board) => {
          setSelectedBoard(board);
          setRenameBoardTitle(board.name);
          setIsRenameModalOpen(true);
        }}
        openDeleteModal={(board) => {
          setSelectedBoard(board);
          setIsDeleteModalOpen(true);
        }}
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
        {/* Sub-navbar */}
        <SubNavbar
          selectedBoard={selectedBoard}
          openRenameBoardModal={openRenameBoardModal}
          openDeleteModal={() => setIsDeleteModalOpen(true)}
          openCreateModal={openCreateModal}
        />

        {/* Grid de notas */}
        <NotesGrid
          notes={notes}
          onDelete={handleDelete}
          onEdit={openEditModal}
          onTogglePin={handleTogglePin}
        />
      </main>

      {/* Modal de notas */}
      <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmitModal}
        editingNote={editingNote}
      />

      {/* Modal de crear tablero */}
      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={closeBoardModal}
        newBoardTitle={newBoardTitle}
        setNewBoardTitle={setNewBoardTitle}
        onCreate={handleCreateBoard}
      />

      {/* Modal de renombrar tablero */}
      <RenameBoardModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        renameBoardTitle={renameBoardTitle}
        setRenameBoardTitle={setRenameBoardTitle}
        onRename={handleRenameBoard}
      />

      {/* Modal eliminar tablero */}
      {selectedBoard && (
        <DeleteBoardModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteBoard}
          boardName={selectedBoard.name}
        />
      )}
    </div>
  );
};

export default HomePage;
