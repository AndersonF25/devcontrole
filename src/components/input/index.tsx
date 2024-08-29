"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  name,
  placeholder,
  register,
  type,
  error,
  rules,
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        className="w-full border-2 rounded-md  px-2 h-11  "
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
};

export default Input;
