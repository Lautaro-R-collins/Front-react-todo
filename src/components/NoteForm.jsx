import { useEffect, useState } from "react";

export const NoteForm = ({ onSubmit, initialDate }) => {
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
    <div className="px-4">
      <form
        onSubmit={noteSubmit}
        className=" bg-base-300 rounded-2xl p-6 m-4 max-w-4xl mx-auto"
      >
        <input
          type="text"
          placeholder="Title"
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

        <button className="btn btn-soft btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default NoteForm;
