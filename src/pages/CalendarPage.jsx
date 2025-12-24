import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import NotesGrid from "../components/NotesGrid";
import NoteModal from "../components/NoteModal";
import { useNotes } from "../hooks/useNotes";
import "react-calendar/dist/Calendar.css";
import "../index.css";
import { isSameDay, parseISO } from "date-fns";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // UI State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const {
    notes,
    fetchNotes,
    deleteNote,
    updateNote,
    togglePinNote,
    createNote,
  } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (notes) {
      const dayNotes = notes.filter((note) => {
        const noteDate = parseISO(note.createdAt);
        return isSameDay(noteDate, date);
      });
      setFilteredNotes(dayNotes);
    }
  }, [date, notes]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  // Helper calendar
  const tileContent = ({ date: tileDate, view }) => {
    if (view === "month") {
      const hasNotes = notes.some((note) =>
        isSameDay(parseISO(note.createdAt), tileDate)
      );
      if (hasNotes) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  // Modal Handlers
  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingNote(null);
    setIsModalOpen(false);
  };
  const handleSubmitModal = async (noteData) => {
    if (editingNote) {
      await updateNote(editingNote._id, noteData);
    } else {
      await createNote(noteData);
      fetchNotes();
    }
    closeModal();
  };

  return (
    <div className="h-screen bg-base-100 text-base-content overflow-hidden flex flex-col">
      <NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        boards={[]}
        selectedBoard={null}
        setSelectedBoard={() => {}}
        openCreateBoardModal={() => {}}
        openRenameBoardModal={() => {}}
        openDeleteModal={() => {}}
      />

      <main
        className="pt-20 p-4 md:p-6 overflow-y-auto h-full w-full transition-all duration-300"
        style={{
          marginLeft:
            isSidebarOpen && window.innerWidth >= 768
              ? "16rem"
              : window.innerWidth >= 768
              ? "4rem"
              : "0",
        }}
      >
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Mi Calendario
          </h1>

          <div className="flex flex-col xl:flex-row gap-8 items-start h-full">
            {/* Calendar Section */}
            <div className="w-full xl:w-auto shrink-0 flex justify-center xl:justify-start">
              <div className="bg-base-200 p-4 rounded-2xl shadow-xl w-full max-w-md">
                <Calendar
                  onChange={handleChange}
                  value={date}
                  className="react-calendar-custom w-full border-none rounded-xl bg-base-100 p-2"
                  tileContent={tileContent}
                />
              </div>
            </div>

            {/* Notes Section */}
            <div className="flex-1 w-full min-w-0">
              <div className="bg-base-200 rounded-2xl shadow-xl p-4 md:p-6 min-h-[500px]">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Notas del{" "}
                  <span className="text-primary">
                    {date.toLocaleDateString()}
                  </span>
                  <span className="badge badge-neutral">
                    {filteredNotes.length}
                  </span>
                </h2>

                <div className="divider my-2"></div>

                {filteredNotes.length > 0 ? (
                  <div className="mt-4">
                    <NotesGrid
                      notes={filteredNotes}
                      onDelete={deleteNote}
                      onEdit={openEditModal}
                      onTogglePin={togglePinNote}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 opacity-50">
                    <p className="text-xl">
                      No hay notas creadas en esta fecha.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal notes */}
      <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmitModal}
        editingNote={editingNote}
      />
    </div>
  );
};

export default CalendarPage;
