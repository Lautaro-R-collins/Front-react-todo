const DeleteBoardModal = ({ isOpen, onClose, onConfirm, boardName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Eliminar tablero</h2>
        <p className="mb-6">
          ¿Estás seguro de que quieres eliminar{" "}
          <span className="font-semibold">{boardName}</span>? Esta acción no se
          puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
