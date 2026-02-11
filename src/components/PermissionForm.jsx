import { useState } from "react";
import { createPermissions } from "../services/permissionService";

export default function PermissionForm({ reload }) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.code) return "Código requerido";
    if (!form.name) return "Nombre requerido";
    if (form.name.length > 30) return "Nombre max 30 chars";
    if (form.description.length > 100) return "Desc max 100";
    if (form.name.trim() !== form.name) return "Sin espacios inicio/fin";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) return setError(err);

    try {
      await createPermissions([form]); 
      setForm({ code: "", name: "", description: "" });
      reload();
    } catch (e) {
      setError("Error creando permiso");
    }
  };

  return (
    <div>
      <h3>Crear permiso</h3>

      {error && <p style={{color:"red"}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="Código" value={form.code} onChange={handleChange}/>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange}/>
        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange}/>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
