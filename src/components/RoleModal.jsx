import { useState, useEffect } from 'react';

export default function RoleModal({ allPermissions, selectedPermissions, setSelectedPermissions }) {
  const [search, setSearch] = useState('');

  const togglePermission = (permId) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const filteredPermissions = allPermissions.filter(
    p => p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="role-modal">
      <input
        type="text"
        placeholder="Buscar permiso por código..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <ul style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '5px' }}>
        {filteredPermissions.map(p => (
          <li key={p.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(p.id)}
                onChange={() => togglePermission(p.id)}
              />
              {p.code} - {p.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
