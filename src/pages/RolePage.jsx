import { useState } from "react";
import RoleForm from "../components/RoleForm";
import RoleList from "../components/RoleList";

export default function RolePage() {
  const [newRole, setNewRole] = useState(null);

  return (
    <div>
      <h1>Módulo Roles</h1>
      <RoleForm onRoleCreated={setNewRole} />
      <RoleList newRoleAdded={newRole} />
    </div>
  );
}
