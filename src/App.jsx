import { useState } from "react";
import PermissionPage from "./pages/PermissionPage";
import RolePage from "./pages/RolePage";

function App() {
  const [currentPage, setCurrentPage] = useState("permissions");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Módulo Seguridad</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCurrentPage("permissions")}>Permisos</button>
        <button onClick={() => setCurrentPage("roles")} style={{ marginLeft: "10px" }}>Roles</button>
      </div>

      {currentPage === "permissions" && <PermissionPage />}
      {currentPage === "roles" && <RolePage />}
    </div>
  );
}

export default App;


