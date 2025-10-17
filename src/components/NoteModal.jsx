import NoteForm from "./NoteForm";

const NoteModal = ({ isOpen, closeModal, handleSubmit, editingNote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="rounded-2xl w-full max-w-2xl">
        <NoteForm
          onSubmit={handleSubmit}
          initialDate={editingNote || { title: "", content: "", priority: "ninguna" }}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default NoteModal;
