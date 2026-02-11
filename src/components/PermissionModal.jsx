import { useState } from "react";
import { createPermissions } from "../services/permissionService";
import * as bootstrap from "bootstrap";

export default function PermissionModal({ reload, permissions }) {
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

    if (permissions?.some(p => p.code === form.code))
      return "El código ya existe";

    if (!form.name) return "Nombre requerido";
    if (!/^[a-zA-Z0-9_ ]+$/.test(form.name))
      return "Solo alfanumérico";
    if (form.name.length > 30)
      return "Máx 30 caracteres";

    if (form.description.length > 100)
      return "Desc máx 100";
    if (form.description.trim() !== form.description)
      return "Sin espacios inicio/fin";

    return null;
  };

  const closeModalClean = () => {
    const modalElement = document.getElementById("permModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    // limpiar fondo gris bug bootstrap
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
  };

  const handleSubmit = async () => {
    setError("");
    const err = validate();
    if (err) return setError(err);

    try {
      // API espera array
      await createPermissions(form);

      await reload();

      setForm({ code: "", name: "", description: "" });
      closeModalClean();

    } catch (e) {
      console.log("ERROR AXIOS:", e);
      setError("Error creando permiso");
    }
  };

  return (
    <div className="modal fade" id="permModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3" style={{ borderRadius: "12px" }}>

          {/* HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title w-100 text-center fw-bold">
              Crear Permiso
            </h5>

            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              data-bs-dismiss="modal"
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body pt-2">

            {error && (
              <div className="alert alert-danger py-1">{error}</div>
            )}

            {/* CODIGO */}
            <div className="row align-items-center mb-3">
              <div className="col-3 text-end fw-semibold">
                Código:
              </div>
              <div className="col-9">
                <input
                  className="form-control"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  style={{ background: "#f5f5f5" }}
                />
              </div>
            </div>

            {/* NOMBRE */}
            <div className="row align-items-center mb-1">
              <div className="col-3 text-end fw-semibold">
                Nombre:
              </div>
              <div className="col-9">
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={{ background: "#f5f5f5" }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-3"></div>
              <div className="col-9">
                <small className="text-muted">
                  ⚠ Solo caracteres alfanuméricos, máx. 30
                </small>
              </div>
            </div>

            {/* DESCRIPCION */}
            <div className="row align-items-start mb-3">
              <div className="col-3 text-end fw-semibold">
                Descripción:
              </div>
              <div className="col-9">
                <textarea
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Descripción (opcional)"
                  rows="3"
                  style={{ background: "#f5f5f5" }}
                />
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0 justify-content-center">
            <button
              className="btn px-5 fw-semibold"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#f4b400",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 40px",
                fontSize: "16px"
              }}
            >
              Guardar Permiso
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
