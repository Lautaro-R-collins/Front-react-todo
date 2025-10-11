import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
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
}) => {
  const [tasks, setTasks] = useState(checklist);
  const [newTask, setNewTask] = useState("");

  // Agregar subnota
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

  // Cambiar estado de completado
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

  // Eliminar subnota
  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/api/notes/${id}/checklist/${taskId}`);
      setTasks(res.data.checklist);
    } catch (err) {
      console.error("Error al eliminar subnota", err);
    }
  };

  return (
    <div className="card bg-base-300 shadow-md min-w-[300px]">
      <div className="card-body flex flex-col justify-between">
        <div className="flex justify-between items-center text-sm">
          <time dateTime={date} className="text-gray-400 font-bold">
            {date}
          </time>
          <div className="flex gap-4 text-lg">
            <FaPenToSquare
              className="cursor-pointer text-white hover:text-accent"
              onClick={() => onEdit({ _id: id, title, content })}
            />
            <FaTrashAlt
              className="cursor-pointer text-white hover:text-red-400"
              onClick={() => onDelete(id)}
            />
          </div>
        </div>

        <h2 className="card-title font-bold text-lg lg:text-xl line-clamp-1">
          {title}
        </h2>
        <div>
          <p className="text-sm lg:text-base text-gray-200 line-clamp-3">
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
