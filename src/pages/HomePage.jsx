import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import CartNote from "../components/CartNote";
import NoteModal from "../components/NoteModal";
import formatData from "../utils/FormatDate";
import api from "../api/axiosConfig.js";
import { toast } from "react-toastify";
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
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
    if (!newBoardTitle.trim()) return toast.error("El nombre no puede estar vacío");
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
      const res = await api.put(`/api/boards/${selectedBoard._id}`, { name: renameBoardTitle });
      setBoards(boards.map((b) => (b._id === selectedBoard._id ? res.data : b)));
      setSelectedBoard(res.data);
      toast.success("Tablero renombrado");
      setIsRenameModalOpen(false);
    } catch (err) {
      toast.error("Error al renombrar el tablero");
      console.error(err);
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
        <div
          className="-mx-4 flex justify-between items-center mb-4 py-4 px-8 
                bg-base-200/60 backdrop-blur-md border-b border-amber-50"
        >
          <h1 className="text-2xl font-bold">
            {selectedBoard ? selectedBoard.name : "Todas las notas"}
          </h1>

          {selectedBoard && (
            <div className="dropdown dropdown-end z-50">
              {/* Botón tres puntos */}
              <div
                tabIndex={0}
                role="button"
                className="btn bg-base-300/80 backdrop-blur-md border-none shadow-sm"
              >
                <FiMoreHorizontal size={22} />
              </div>

              {/* Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-base-300 rounded-box w-52 z-50"
              >
                {/* Renombrar tablero */}
                <li>
                  <button onClick={openRenameBoardModal}>
                    <FiEdit2 size={18} className="mr-2" />
                    Cambiar nombre
                  </button>
                </li>
                {/* Eliminar tablero */}
                <li>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-red-600"
                  >
                    <FiTrash2 size={18} className="mr-2" />
                    Eliminar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
            <p>No hay notas en este tablero.</p>
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

      {/* Modal de notas */}
      <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmitModal}
        editingNote={editingNote}
      />

      {/* Modal de crear tablero */}
      {isBoardModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-base-300 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Crear nuevo tablero</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Nombre del tablero"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeBoardModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleCreateBoard}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de renombrar tablero */}
      {isRenameModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-base-300 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Renombrar tablero</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              value={renameBoardTitle}
              onChange={(e) => setRenameBoardTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsRenameModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleRenameBoard}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

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

// ------------------- Modal para eliminar tablero -------------------
const DeleteBoardModal = ({ isOpen, onClose, onConfirm, boardName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Eliminar tablero</h2>
        <p className="mb-6">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-semibold">{boardName}</span>? Esta acción no se
          puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
