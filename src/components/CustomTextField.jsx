import React from "react";

export function CustomTextField({ label, control, name, lf, tf }) {
  return (
    <div class="d-flex mt-2">
      <label style={{ flex: lf || 5 }} for={name} class="form-label">
        {label}
      </label>
      <div style={{ flex: tf || 7 }} class="input-group">
        <input type="text" name="username" class="form-control" id={name} />
        <div class="invalid-feedback">Please enter your username.</div>
      </div>
    </div>
  );
}
export function CustomTextAread({ label, control, name, lf, tf, rows }) {
  return (
    <div class="d-flex mt-2">
      <label style={{ flex: lf || 5 }} for={name} class="form-label">
        {label}
      </label>
      <div style={{ flex: tf || 7 }} class="input-group">
        <textarea
          type="text"
          name="username"
          class="form-control"
          id={name}
          rows={rows||5}
        ></textarea>
        <div class="invalid-feedback">Please enter your username.</div>
      </div>
    </div>
  );
}
