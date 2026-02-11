import { useState, useEffect } from 'react';
import { createRole, getPermissions } from '../services/roleService';
import RoleModal from './RoleModal';

export default function RoleForm({ onRoleCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPermissions = async () => {
      const perms = await getPermissions();
      setAllPermissions(perms);
    };
    fetchPermissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!permissions.length) return setError('Debe seleccionar al menos un permiso');
    if (!name) return setError('El nombre es requerido');

    const newRole = {
      code: `ROLE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      name: name.toUpperCase(),
      description,
      permissions
    };

    try {
      const savedRole = await createRole(newRole);
      onRoleCreated(savedRole);
      setName('');
      setDescription('');
      setPermissions([]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error al guardar el rol');
    }
  };

  return (
    <div className="role-form" style={{ marginBottom: '30px' }}>
      <h2>Crear Rol</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            maxLength={30}
            onChange={e => setName(e.target.value.toUpperCase())}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Permisos:</label>
          <RoleModal
            allPermissions={allPermissions}
            selectedPermissions={permissions}
            setSelectedPermissions={setPermissions}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Guardar Rol</button>
      </form>
    </div>
  );
}
