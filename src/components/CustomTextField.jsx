import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

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
      <div style={{ flex: 12 || tf || 7 }} class="input-group">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...props}
                {...field}
                label={label}
                variant="outlined"
                fullWidth
                select={select || options}
                multiline={multiline || rows}
                rows={rows}
                error={error}
              >
                {options?.map((option) => (
                  <MenuItem
                    key={option || option?.value}
                    value={option || option?.value}
                  >
                    {option || option?.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      </div>
    </div>
  );
}
