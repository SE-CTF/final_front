import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { ReactElement } from "react";

interface CustomTextFieldProps {
  multilline?: boolean;
  id: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  label: string;
  value?: string;
  onChange?: () => {};
  variant: "outlined" | "standard" | "filled";
  fullWidth?: boolean;
  register?: any;
  name?: string;
  validationRules?: any;
  required?: boolean;
  isPassword?: boolean;
  helperText?: string;
  icon?: ReactElement;
  disabled?: boolean;
  ref? : any;
}

const CustomTextField = ({
  multilline,
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  variant,
  fullWidth,
  register,
  name,
  validationRules,
  required,
  isPassword,
  helperText,
  icon,
  disabled,
  ref,
}: CustomTextFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        {...(register !== undefined
          ? { ...register(name, validationRules) }
          : {})}
        helperText={helperText}
        inputRef={ref}
        error={helperText == "" || helperText == undefined ? false : true}
        multiline={multilline == undefined ? false : multilline}
        id={id}
        type={!isPassword ? type : showPassword ? "text" : "password"}
        placeholder={placeholder}
        label={label}
        value={value}
        onChange={onChange}
        variant={variant}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled == undefined ? false : disabled}
        InputProps={{
          
          style: {
            borderRadius: "8px",
          },
          startAdornment:
            icon == undefined ? null : (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          endAdornment: !isPassword ? null : (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: {
            color: "#3498db",
          },
        }}
      ></TextField>
    </>
  );
};

export default CustomTextField;
