import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3">
      <div style={{ flex: 12 || tf || 7 }} className="input-group">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...props}
                {...field}
                label={t(label)}
                variant="outlined"
                fullWidth
                select={select || options}
                multiline={multiline || rows}
                rows={rows}
                error={error}
                helperText={error?.message}
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
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3">
      <div style={{ flex: 12 || tf || 7 }} className="input-group">
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
                    label={t(label)}
                    placeholder={placeholder}
                    error={error}
                    helperText={error?.message}
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

export const CustomDateTimePicker = ({
  label,
  cg,
  lg,
  tg,
  helperText,
  options,
  children,
  value,
  disabled,
  // onChange,
  noLabel,
  small,
  endAfterIcon,
  startBeforeIcon,
  name,
  register,
  setValue,
  customStyle,

  control,
  tf,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3">
      <div style={{ flex: 12 || tf || 7 }} className="input-group">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            const { value, onChange, ...other } = field;

            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  {...other}
                  flex={1}
                  label={label}
                  disabled={disabled}
                  inputFormat="DD/MM/YYYY"
                  value={dayjs(value)}
                  onChange={(newValue) => {
                    onChange(dayjs(newValue).toDate());
                  }}
                  sx={{
                    width: "100%",
                    // "& .MuiFormControl-root": {
                    //   width: "100%",
                    //   ...customStyle,
                    // },
                    // "& .MuiOutlinedInput-input": {
                    //   padding: small
                    //     ? "6px 10px!important"
                    //     : "8.5px 10px!important",
                    // },
                  }}
                  // textFiel
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      label={t(label)}
                      // sx={
                      //   {
                      //     "& .MuiFormControl-root": { width: "100%" },
                      //     "& .MuiOutlinedInput-input": {
                      //       padding: small
                      //         ? "6px 10px!important"
                      //         : "8.5px 10px!important",
                      //     },
                      //   }
                      // small
                      //   ? {
                      //       ...datePickerStyle,
                      //       "& .MuiOutlinedInput-input": {
                      //         padding: small && "8px 10px",
                      //         fontSize: small && ".85rem",
                      //       },
                      //     }
                      //   : { ...datePickerStyle })
                      // }
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            );
          }}
        />
      </div>
    </div>
  );
};
