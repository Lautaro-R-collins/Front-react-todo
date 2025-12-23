import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SubNavbar from "../components/SubNavbar";
import Sidebar from "../components/Sidebar";
import NotesGrid from "../components/NotesGrid";
import NoteModal from "../components/NoteModal";
import BoardModal from "../components/boards/BoardModal";
import RenameBoardModal from "../components/boards/RenameBoardModal";
import DeleteBoardModal from "../components/boards/DeleteBoardModal";
import { toast } from "react-toastify";

import { useNotes } from "../hooks/useNotes";
import { useBoards } from "../hooks/useBoards";

const HomePage = () => {
  // Estado local para UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation();

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameBoardTitle, setRenameBoardTitle] = useState("");

  // Custom Hooks
  const { 
    notes, 
    loading: notesLoading, 
    fetchNotes, 
    createNote, 
    updateNote, 
    deleteNote, 
    togglePinNote 
  } = useNotes();
  
  const {
    boards,
    selectedBoard,
    setSelectedBoard,
    createBoard,
    deleteBoard,
    renameBoard
  } = useBoards();


  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Efectos
  useEffect(() => {
    fetchNotes(selectedBoard?._id);
  }, [selectedBoard, location, fetchNotes]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Manejadores de Modal de Notas
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

  const handleSubmitModal = async (noteData) => {
    const boardId = selectedBoard?._id || null;
    noteData.board = boardId;

    let success = false;
    if (editingNote) {
      success = await updateNote(editingNote._id, noteData);
    } else {
      success = await createNote(noteData);
    }

    if (success) {
        // Recargar notas es manejado optimísticamente en los hooks, 
        // pero si createNote no agrega al estado (en mi implementación del hook arriba no lo hacía para board, pero para notas debería quizas)
        // En useNotes fetchNotes actualiza el estado, y createNote solo hace POST.
        // Vamos a revisar useNotes.
        // Si el hook useNotes no actualiza el estado local al crear, necesitamos hacer fetch.
        // Revisando mi implementación anterior de useNotes: createNote SÍ devuelve true/false pero NO actualizaba el estado local 'notes'.
        // Así que debemos hacer fetchNotes aquí si es create. 
        // O mejor mejorar useNotes después. Por ahora mantengamos fetchNotes para asegurar consistencia.
        if (!editingNote) fetchNotes(boardId); 
        closeModal();
    }
  };

  // Manejadores de Tableros
  const openCreateBoardModal = () => setIsBoardModalOpen(true);
  const closeBoardModal = () => setIsBoardModalOpen(false);

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) return toast.error("El nombre no puede estar vacío");
    const success = await createBoard(newBoardTitle);
    if (success) {
      setNewBoardTitle("");
      setIsBoardModalOpen(false);
    }
  };

  const handleDeleteBoard = async () => {
    if (!selectedBoard) return;
    const success = await deleteBoard(selectedBoard._id);
    if (success) {
        setIsDeleteModalOpen(false);
        fetchNotes(null); // Recargar notas "generales" o vacias
    }
  };

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
    const success = await renameBoard(selectedBoard._id, renameBoardTitle);
    if (success) {
      setIsRenameModalOpen(false);
    }
  };

  if (notesLoading && notes.length === 0 && boards.length === 0) return <span>Cargando...</span>;

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
          onDelete={deleteNote}
          onEdit={openEditModal}
          onTogglePin={togglePinNote}
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
