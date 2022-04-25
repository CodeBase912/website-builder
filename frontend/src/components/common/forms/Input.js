import React from "react";
import classNames from "classnames";
import { useFormContext, Controller } from "react-hook-form";

const Input = ({ name, placeholder, type = "text", className }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={classNames(
            "bg-transparent text-sm outline-none border-2 border-grey px-6 py-2",
            className
          )}
        />
      )}
    />
  );
};

export default Input;
