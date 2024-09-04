import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "./components/table";
import prismaClient from "@/lib/prisma";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      customer: true,
    },
    orderBy: [{ status: "asc" }, { created_at: "desc" }],
  });

  const customer = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main className="w-full h-full mt-2 mb-4  ">
      <Container>
        <div className="w-full flex items-center justify-between mb-4">
          <h1 className="font-extrabold text-3xl">Chamados</h1>
          <Link
            href={"/dashboard/new"}
            className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-700 duration-300"
          >
            Novo chamado
          </Link>
        </div>

        {customer.length === 0 ? (
          <p className="mt-5 font-normal text-lg">
            Você não tem nenhum chamado
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CLIENTE
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DATA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AÇÕES
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    customer={ticket.customer}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </main>
  );
}
