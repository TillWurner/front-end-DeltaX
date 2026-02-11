
import { useEffect, useState } from 'react';
import { getRoles } from '../services/roleService';

export default function RoleList({ newRoleAdded }) {
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  useEffect(() => {
    fetchRoles();
  }, [newRoleAdded]); 

  return (
    <div>
      <h2>Lista de Roles</h2>
      {roles.length === 0 && <p>No hay roles creados.</p>}
      <ul>
        {roles.map(role => (
          <li key={role.id}>
            <strong>{role.name}</strong> - {role.description || 'Sin descripción'}
            <br />
            Permisos: {role.permissions?.map(p => p.code).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
