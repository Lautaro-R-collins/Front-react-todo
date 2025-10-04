import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateNotePage from "./pages/CreateNotePage.jsx";
import EditNotePage from "./pages/EditNotePage.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createNote" element={<CreateNotePage />} />
        <Route path="/editNote/:id" element={<EditNotePage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
