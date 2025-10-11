import { useEffect, useState } from "react";

export const useBoards = () => {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : ["General"];
  });

  const [activeBoard, setActiveBoard] = useState(() => {
    return localStorage.getItem("activeBoard") || "General";
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem("activeBoard", activeBoard);
  }, [activeBoard]);

  const addBoard = (name) => {
    if (!boards.includes(name)) {
      setBoards([...boards, name]);
    }
  };

  return { boards, activeBoard, setActiveBoard, addBoard };
};
