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
          className="border p-2 w-full mb-4"
          value={renameBoardTitle}
          onChange={(e) => setRenameBoardTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
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
