import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 obtenemos login del contexto
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/register`, form);

      // 👇 Guardamos en el context (queda logueado)
      login(res.data.user, res.data.token);

      toast.success("Registro exitoso, bienvenido!");
      navigate("/"); // 👈 redirige directo al Home
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en el registro");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded shadow-lg bg-base-300">
      <h2 className="text-2xl font-bold mb-6">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-base-100 p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-base-100 p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-base-100 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full btn btn-primary p-2 rounded cursor-pointer"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
