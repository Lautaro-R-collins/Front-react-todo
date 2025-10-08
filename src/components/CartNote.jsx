import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

export const CartNote = ({ title, content, id, date, onDelete, onEdit }) => {
  return (
    <div className="card bg-base-300 shadow-md h-44 min-w-[300px]"> 
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title font-bold text-lg lg:text-xl line-clamp-1">
            {title}
          </h2>
          <p className="text-sm lg:text-base text-gray-200 mt-2 line-clamp-3">
            {content}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3 text-sm">
          <time dateTime={date} className="text-gray-400">
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
      </div>
    </div>
  );
};

export default CartNote;
