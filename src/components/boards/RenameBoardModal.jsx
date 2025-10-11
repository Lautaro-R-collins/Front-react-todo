const RenameBoardModal = ({
  isOpen,
  onClose,
  renameBoardTitle,
  setRenameBoardTitle,
  onRename,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-base-300 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Renombrar tablero</h2>
        <input
          type="text"
          className="p-2 bg-base-100 w-full mb-4 outline-none focus:ring-0 rounded-md"
          value={renameBoardTitle}
          onChange={(e) => setRenameBoardTitle(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-red-500 rounded cursor-pointer hover:bg-red-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/80"
            onClick={onRename}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameBoardModal;
