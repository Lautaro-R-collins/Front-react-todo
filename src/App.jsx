import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateNotePage from "./pages/CreateNotePage.jsx";
import EditNotePage from "./pages/EditNotePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {/* 👇 si hay user → Home, si no → Registro */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <RegisterPage />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createNote"
          element={
            <ProtectedRoute>
              <CreateNotePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editNote/:id"
          element={
            <ProtectedRoute>
              <EditNotePage />
            </ProtectedRoute>
          }
        />

        {/* 👇 si ya está logueado, que no entre otra vez a login/registro */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/home" /> : <RegisterPage />}
        />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
