import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const CartNote = ({ title, content, id, date, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-300 w-full shadow-sm">
      <div className="card-body">
        <h2 className="card-title font-bold lg:text-2xl">{title}</h2>
        <p className="text-amber-50">{content}</p>
        <div className="flex justify-between mt-6">
          <time dateTime={date}>{date}</time>
          <div className="flex gap-4">
            <FaPenToSquare
              className="cursor-pointer text-white hover:text-accent text-xl"
              onClick={() => navigate(`/editNote/${id}`)} 
            />
            <FaTrashAlt
              className="cursor-pointer text-white hover:text-red-400 text-xl"
              onClick={() => onDelete(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNote;
