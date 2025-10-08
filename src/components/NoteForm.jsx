import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const NoteForm = ({ onSubmit, initialDate, closeModal }) => {
  const [note, setNotes] = useState(initialDate || { title: "", content: "" });

  useEffect(() => {
    setNotes(initialDate || { title: "", content: "" });
  }, [initialDate]);

  const noteChange = (e) => {
    setNotes({
      ...note,
      [e.target.name]: e.target.value,
    });
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
        id="title"
        name="title"
        value={note.title}
        onChange={noteChange}
        className="block w-full mb-8 input lg:input-lg"
        required
      />

      <textarea
        className="textarea textarea-bordered w-full mb-8"
        name="content"
        id="content"
        placeholder="Descripción de la tarea"
        value={note.content}
        onChange={noteChange}
        required
      ></textarea>

      <button className="btn btn-soft btn-primary w-full">Guardar</button>
    </form>
  );
};

export default NoteForm;
