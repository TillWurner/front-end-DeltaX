export default function PermissionList({ permissions }) {
  return (
    <div>
      <h3>Lista permisos</h3>
      {permissions.map((p, i) => (
        <div key={i} style={{border:"1px solid #ccc",margin:"5px"}}>
          <b>{p.code}</b> - {p.name}
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
