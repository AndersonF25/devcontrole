import Container from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import toast from "react-hot-toast";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    let name = formData.get("name");
    let description = formData.get("description");
    let customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    try {
      await prismaClient.ticket.create({
        data: {
          name: name as string,
          description: description as string,
          customerId: customerId as string,
          status: "Aberto",
          userId: session?.user.id,
        },
      });
      toast.success("O chamado foi criado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <main className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-4 mt-2">
          <Link
            href={"/dashboard"}
            className="bg-slate-600 text-white py-1 px-4 rounded-lg"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form
          className="flex flex-col items-start mt-5"
          action={handleRegisterTicket}
        >
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 h-11 mb-5"
            name="name"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            placeholder="Digite o nome do chamado"
            required
            className="w-full border-2 rounded-md p-2  mb-5 resize-none h-24"
            name="description"
          />
          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 h-11 rounded-md pl-1"
                name="customer"
              >
                {customers.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <span className="flex items-center gap-2 font-light">
              Você não possui clientes cadastrados,
              <Link
                href={"/dashboard/customer/new"}
                className="font-semibold text-blue-500"
              >
                cadastre um novo cliente aqui!
              </Link>
            </span>
          )}

          {}

          <button
            type="submit"
            className="w-full px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300 mt-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
            title={
              customers.length === 0
                ? "Você não possui clientes para continuar esta ação"
                : "Criar chamado"
            }
          >
            Criar chamado
          </button>
        </form>
      </main>
    </Container>
  );
}
