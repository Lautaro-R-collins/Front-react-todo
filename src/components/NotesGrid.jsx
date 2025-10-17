import CartNote from "./CartNote";
import formatData from "../utils/FormatDate";

const priorityValue = {
  alta: 3,
  media: 2,
  baja: 1,
  ninguna: 0,
};

const NotesGrid = ({ notes, onDelete, onEdit, onTogglePin }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="flex text-3xl font-bold flex-col items-center justify-center h-64 text-center text-gray-600">
        <p>No hay notas en este tablero</p>
      </div>
    );
  }
  
  const sortedNotes = [...notes].sort((a, b) => {
    if (b.pinned !== a.pinned) return b.pinned ? 1 : -1;
    return (priorityValue[b.priority] || 0) - (priorityValue[a.priority] || 0);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 items-start">
      {sortedNotes.map((note) => (
        <CartNote
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          date={formatData(note.createdAt)}
          checklist={note.checklist}
          pinned={note.pinned}
          priority={note.priority || "ninguna"}  
          onDelete={onDelete}
          onEdit={() => onEdit(note)}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
