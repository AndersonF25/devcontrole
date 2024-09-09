"use client";

import Input from "@/components/input";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import FormTicket from "./components/FormNewTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email para localizar o cliente!")
    .min(1, "O campo email é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setValue("email", "");
    setCustomer(null);
  }

  async function handleSearchCustomer(data: FormData) {
    try {
      const response = await api.get("/api/customer", {
        params: {
          email: data.email,
        },
      });

      if (response.data === null) {
        setError("email", {
          type: "custom",
          message: "Cliente não encontrado!",
        });
        return;
      }

      setCustomer({
        id: response.data.id,
        name: response.data.name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-2xl px-2 mx-auto h-full ">
      <h1 className="font-bold text-3xl text-center mt-36">Abrir chamado</h1>
      <main className="mt-4 p-6 rounded-md">
        {customer ? (
          <>
            <section className="flex flex-col gap-4">
              <div className="  rounded-md flex w-full justify-between items-center">
                <p className="flex gap-1">
                  <strong>Cliente selecionado:</strong>
                  {customer.name}
                </p>
                <button>
                  <MdCancel
                    size={26}
                    color="red"
                    onClick={handleClearCustomer}
                  />
                </button>
              </div>
            </section>

            <FormTicket customer={customer} />
          </>
        ) : (
          <form
            className="bg-slate-200 p-4 rounded-lg"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                type="text"
                register={register}
                placeholder="Digite o email do cliente..."
                error={errors.email?.message}
              />

              <button
                type="submit"
                className="bg-blue-500 w-full flex items-center justify-center gap-3 py-2 rounded-md text-white font-bold hover:bg-blue-600 duration-300"
              >
                Procurar clientes <FiSearch size={20} />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
