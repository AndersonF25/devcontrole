"use client";

import React from "react";
import Input from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";

interface CustomerDataInfo {
  id: string;
  name: string;
}

interface FormTicketProps {
  customer: CustomerDataInfo;
}

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório!"),
  description: z.string().min(1, "Descreva sobre no seu problema..."),
});

type FormData = z.infer<typeof schema>;

const FormTicket = ({ customer }: FormTicketProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    try {
      await api.post("/api/ticket", {
        name: data.name,
        description: data.description,
        customerId: customer.id,
      });
    } catch (error) {
      console.log(error);
    }

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="mt-5 flex flex-col bg-slate-200 p-4 rounded-lg"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="font-medium">Nome do chamado</label>
      <Input
        name="name"
        placeholder="Digite o nome do chamado"
        register={register}
        error={errors.name?.message}
        type="text"
      />
      <label className="font-medium mt-2">Descreva o problema</label>
      <textarea
        className="w-full border-2 h-24 resize-none mb-2 px-2 rounded-lg"
        placeholder="Descreva o seu problema..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full p-2 font-bold text-white hover:bg-blue-600 duration-300 mt-2"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormTicket;
