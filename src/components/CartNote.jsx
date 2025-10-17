import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt, FaPlus, FaThumbtack } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { useState } from "react";
import api from "../api/axiosConfig";

const CartNote = ({
  title,
  content,
  id,
  date,
  priority = "ninguna",
  onDelete,
  onEdit,
  checklist = [],
  pinned = false,
  onTogglePin,
}) => {
  const [tasks, setTasks] = useState(Array.isArray(checklist) ? checklist : []);
  const [newTask, setNewTask] = useState("");

  const priorityClasses = {
    alta: "border-l-8 border-solid border-red-500",
    media: "border-l-8 border-solid border-yellow-500",
    baja: "border-l-8 border-solid border-green-500",
    ninguna: "border-l-8 border-solid border-base-300",
  };

  const priorityHex = {
    alta: "#ef4444",
    media: "#f59e0b",
    baja: "#22c55e",
    ninguna: "#e5e7eb",
  };

  const fallbackStyle = {
    borderLeftWidth: "8px",
    borderLeftStyle: "solid",
    borderLeftColor: priorityHex[priority] || priorityHex.ninguna,
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await api.post(`/api/notes/${id}/checklist`, { text: newTask });
      setTasks(res.data.checklist || []);
      setNewTask("");
    } catch (err) {
      console.error("Error al agregar subnota", err);
    }
  };

  const toggleTask = async (taskId, done) => {
    try {
      const res = await api.put(`/api/notes/${id}/checklist/${taskId}`, { done });
      setTasks(res.data.checklist || []);
    } catch (err) {
      console.error("Error al actualizar subnota", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/api/notes/${id}/checklist/${taskId}`);
      setTasks(res.data.checklist || []);
    } catch (err) {
      console.error("Error al eliminar subnota", err);
    }
  };

  return (
    <div
      className={`card shadow-md min-w-[300px] relative transition-all bg-base-300 ${priorityClasses[priority]}`}
      style={fallbackStyle}
    >
      <div className="card-body flex flex-col justify-between">
        <div className="flex justify-between items-center text-sm">
          <time dateTime={date} className="text-gray-400 font-bold">{date}</time>

          <div className="flex gap-2 text-lg">
            <FaPenToSquare
              className="cursor-pointer text-base-content/80 hover:text-primary transition-colors"
              onClick={() => onEdit({ _id: id, title, content, priority })}
              title="Editar nota"
            />
            <FaTrashAlt
              className="cursor-pointer text-base-content/80 hover:text-error transition-colors"
              onClick={() => onDelete(id)}
              title="Eliminar nota"
            />
            <button
              onClick={() => onTogglePin(id)}
              className={`transition-transform hover:scale-110 cursor-pointer ${pinned ? "text-error rotate-12" : "text-base-content/60 hover:text-error/80"}`}
              title={pinned ? "Desfijar nota" : "Fijar nota"}
            >
              <FaThumbtack />
            </button>
          </div>
        </div>

        <h2 className="card-title font-bold text-lg lg:text-xl line-clamp-1">{title}</h2>

        <div>
          <p className="text-sm lg:text-base text-base-content/80 line-clamp-3">{content}</p>

          {/* {priority !== "ninguna" && (
            <p className="text-xs font-semibold mt-2 opacity-75">
              Prioridad: <span className="capitalize">{priority}</span>
            </p>
          )} */}

          <div className="mt-3 space-y-2">
            {tasks?.length > 0 ? (
              tasks.map(task => (
                <div key={task._id ?? task.id} className="flex items-center gap-2 bg-base-100 p-2 rounded-xl font-semibold">
                  <input
                    type="checkbox"
                    checked={!!task.done}
                    onChange={e => toggleTask(task._id ?? task.id, e.target.checked)}
                    className="checkbox checkbox-sm checked:bg-primary"
                  />
                  <span className={task.done ? "line-through text-red-300" : "text-base-content"}>
                    {task.text}
                  </span>
                  <button onClick={() => deleteTask(task._id ?? task.id)} className="text-red-400 hover:text-red-500 ml-auto text-xl cursor-pointer">
                    <RiCloseCircleLine />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-sm text-base-content/60 italic">Sin subtareas</div>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Nueva Tarea..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
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
