import { Autocomplete, MenuItem, TextField } from "@mui/material";
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
                    key={option?.value || option}
                    value={option?.value || option}
                  >
                    {option?.label || option}
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
export function CustomAutoComplete({
  label,
  control,
  name,
  options,
  select,
  lf,
  tf,
  rows,
  multiline,
  multiple,
  placeholder,
  loading,
  ...props
}) {
  return (
    <div class="d-flex mt-3">
      <div style={{ flex: 12 || tf || 7 }} class="input-group">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;

            return (
              <Autocomplete
                {...field}
                multiple={multiple}
                id="tags-outlined"
                options={options || []}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={
                  value || !loading
                    ? multiple
                      ? options?.filter((option) => value?.includes(option?.id))
                      : options?.find((option) => value === option?.id) ?? null
                    : multiple
                    ? []
                    : null
                }
                onChange={(e, newValue) => {
                  multiple
                    ? onChange(newValue ? newValue?.map((nv) => nv.id) : null)
                    : onChange(newValue ? newValue.id : null);
                }}
                isOptionEqualToValue={(option, value) => {
                  return option["id"] === value["id"];
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    error={error}
                    fullWidth
                    inputRef={ref}
                  />
                )}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
