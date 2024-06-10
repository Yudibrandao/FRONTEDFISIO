import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./CustomInput.css"; // Importamos el archivo de estilos CSS

export const CustomInput = ({
  placeholder,
  type,
  name,
  handler,
  value,
  disabled,
  max,
  min,
  className,
}) => {
  return (
    <>
      <label htmlFor={name} className="custom-label">
        {placeholder}
      </label>

      <InputGroup  className="mb-3 custom-input-container">
        <Form.Control
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          max={max}
          min={min}
          onChange={handler}
          className={`custom-input ${className}`} // Agregamos la clase custom-input
          disabled={disabled}
        />
      </InputGroup>
    </>
  );
};
