import { MenuItem, TextField } from "@mui/material";
import React from "react";

export function CustomTextField({
  label,
  control,
  name,
  options,
  select,
  lf,
  tf,
  rows,
  multiline,
  ...props
}) {
  return (
    <div class="d-flex mt-3">
      {/* <label style={{ flex: lf || 5 }} for={name} class="form-label">
        {label}
      </label> */}
      <div style={{ flex: 12 || tf || 7 }} class="input-group">
        <TextField
          {...props}
          label={label}
          variant="outlined"
          fullWidth
          select={select || options}
          multiline={multiline || rows}
          rows={rows}
        >
          {options?.map((option) => (
            <MenuItem key={option || option?.value}>
              {option || option?.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}
