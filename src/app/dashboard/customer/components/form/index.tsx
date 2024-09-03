"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório!"),
  email: z
    .string()
    .email("Digite um email valido")
    .min(1, "O campo email é obrigatório!"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O número de telefone deve estar dessa forma => (00)999999999",
    }
  ),
  address: z.string().min(1, "O campo endereço é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const FormCustomer = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    router.refresh();
    try {
      await axios.post("/api/customer", {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: data.email,
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }

    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col items-start w-full "
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 font-semibold text-lg">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        register={register}
        error={errors.name?.message}
      />

      <section className="w-full flex  items center gap-3 mt-3 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 font-semibold text-lg">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Exemplo: (52) 9988998XX "
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 font-semibold text-lg">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite um email valido"
            register={register}
            error={errors.email?.message}
          />
        </div>
      </section>

      <label className="mb-1 font-semibold text-lg mt-3">
        Endereço completo
      </label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        register={register}
        error={errors.address?.message}
      />

      <button
        type="submit"
        className="mt-3 w-full bg-blue-500 py-2 rounded-md text-white font-semibold hover:bg-blue-600 duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default FormCustomer;
