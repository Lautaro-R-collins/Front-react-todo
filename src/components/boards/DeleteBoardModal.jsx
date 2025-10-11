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
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-500 rounded cursor-pointer hover:bg-red-600" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/80"
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
