import CartNote from "./CartNote";
import formatData from "../utils/FormatDate";

const NotesGrid = ({ notes, onDelete, onEdit }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
        <p>No hay notas en este tablero.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {notes.map((note) => (
        <CartNote
          key={note._id}
          title={note.title}
          content={note.content}
          id={note._id}
          date={formatData(note.createdAt)}
          onDelete={onDelete}
          onEdit={() => onEdit(note)}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
