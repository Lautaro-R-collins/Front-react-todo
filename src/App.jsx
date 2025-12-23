import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
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
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <LoginPage />}
        />
        
        <Route
          path="/register"
          element={user ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
