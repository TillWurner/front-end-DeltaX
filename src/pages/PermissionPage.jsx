import { useEffect, useState } from "react";
import { getPermissions } from "../services/permissionService";
import PermissionModal from "../components/PermissionModal";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);

const loadPermissions = async () => {
  try {
    const data = await getPermissions();

    if (Array.isArray(data)) {
      setPermissions(data);
    } else {
      setPermissions([]);
    }

    return data;

  } catch (error) {
    console.log("Error cargando:", error);
    setPermissions([]);
  }
};


  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <div className="container mt-4">

      {/* BOTON CREAR */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#permModal"
        >
          + Crear Permiso
        </button>
      </div>

      {/* TABLA */}
      <div className="card p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p) => (
              <tr key={p.id || p.code}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MODALs */}
      <PermissionModal 
  reload={loadPermissions}
  permissions={permissions}
/>
    </div>
  );
}
