import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt, FaPlus, FaThumbtack } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from "react";
import api from "../api/axiosConfig";

export const CartNote = ({
  title,
  content,
  id,
  date,
  onDelete,
  onEdit,
  checklist = [],
  pinned = false,
  onTogglePin,
}) => {
  const [tasks, setTasks] = useState(checklist);
  const [newTask, setNewTask] = useState("");

  // --- Funciones de checklist  ---
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await api.post(`/api/notes/${id}/checklist`, {
        text: newTask,
      });
      setTasks(res.data.checklist);
      setNewTask("");
    } catch (err) {
      console.error("Error al agregar subnota", err);
    }
  };

  const toggleTask = async (taskId, done) => {
    try {
      const res = await api.put(`/api/notes/${id}/checklist/${taskId}`, {
        done,
      });
      setTasks(res.data.checklist);
    } catch (err) {
      console.error("Error al actualizar subnota", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/api/notes/${id}/checklist/${taskId}`);
      setTasks(res.data.checklist);
    } catch (err) {
      console.error("Error al eliminar subnota", err);
    }
  };

  return (
    <div className="card bg-base-300 shadow-md min-w-[300px] relative">
      <div className="card-body flex flex-col justify-between">
        {/* Encabezado con fecha e íconos */}
        <div className="flex justify-between items-center text-sm">
          <time dateTime={date} className="text-gray-400 font-bold">
            {date}
          </time>

          {/* Botones de acción */}
          <div className="flex gap-2 text-lg">
            <FaPenToSquare
              className="cursor-pointer text-base-content/80 hover:text-primary transition-colors"
              onClick={() => onEdit({ _id: id, title, content })}
              title="Editar nota"
            />
            <FaTrashAlt
              className="cursor-pointer text-base-content/80 hover:text-error transition-colors"
              onClick={() => onDelete(id)}
              title="Eliminar nota"
            />
            <button
              onClick={() => onTogglePin(id)}
              className={`transition-transform hover:scale-110 cursor-pointer ${
                pinned
                  ? "text-error rotate-12"
                  : "text-base-content/60 hover:text-error/80"
              }`}
              title={pinned ? "Desfijar nota" : "Fijar nota"}
            >
              <FaThumbtack />
            </button>
          </div>
        </div>

        <h2 className="card-title font-bold text-lg lg:text-xl line-clamp-1">
          {title}
        </h2>

        <div>
          <p className="text-sm lg:text-base text-base-content/80 line-clamp-3">
            Nota: {content}
          </p>

          {/* Checklist */}
          <div className="mt-3 space-y-2">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-2 bg-base-100 p-2 rounded-xl font-semibold"
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={(e) => toggleTask(task._id, e.target.checked)}
                  className="checkbox checkbox-sm checked:bg-primary"
                />
                <span className={task.done ? "line-through text-red-300" : ""}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-400 hover:text-red-500 ml-auto text-xl cursor-pointer"
                >
                  <RiCloseCircleLine />
                </button>
              </div>
            ))}
          </div>

          {/* Input nueva subnota */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Nueva Tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="input input-sm border-none w-full outline-none focus:outline-none focus:ring-0 focus:border-none"
            />
            <button onClick={addTask} className="btn btn-sm btn-primary">
              <FaPlus className="textarea-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNote;
