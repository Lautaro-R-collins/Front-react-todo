import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar.jsx";
import { AuthProvider } from "../src/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
