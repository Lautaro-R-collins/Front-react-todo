import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const NoteForm = ({ onSubmit, initialDate, closeModal }) => {
  const [note, setNote] = useState({ title: "", content: "", priority: "ninguna" });

  useEffect(() => {
    if (initialDate) {
      setNote({
        title: initialDate.title || "",
        content: initialDate.content || "",
        priority: initialDate.priority || "ninguna",
      });
    }
  }, [initialDate]);

  const noteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const noteSubmit = (e) => {
    e.preventDefault();
    onSubmit(note); 
  };

  return (
    <form
      onSubmit={noteSubmit}
      className="bg-base-300 rounded-2xl p-6 m-4 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {initialDate?._id ? "Editar Nota" : "Nueva Nota"}
        </h2>
        <button
          type="button"
          className="text-gray-600 hover:text-red-500 transition text-2xl cursor-pointer"
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
      </div>

      <input
        type="text"
        placeholder="Título"
        name="title"
        value={note.title}
        onChange={noteChange}
        className="p-2 bg-base-100 w-full mb-4 outline-none focus:ring-0 rounded-md"
        required
      />

      <textarea
        placeholder="Descripción de la tarea"
        name="content"
        value={note.content}
        onChange={noteChange}
        className="p-2 bg-base-100 w-full mb-4 outline-none focus:ring-0 rounded-md"
        required
      />

      {/* Selector de prioridad */}
      <label className="block mb-2 font-semibold">Prioridad:</label>
      <div className="flex gap-4 mb-4">
        {["ninguna", "baja", "media", "alta"].map((level) => (
          <label key={level} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value={level}
              checked={note.priority === level}
              onChange={noteChange}
              className="radio radio-primary"
            />
            <span className="capitalize">{level}</span>
          </label>
        ))}
      </div>

      <button className="btn btn-soft btn-primary w-full">Guardar</button>
    </form>
  );
};

export default NoteForm;
