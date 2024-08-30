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

  return (
    <main className="w-full h-full mt-2 mb-4">
      <Container>
        <div className="w-full flex items-center justify-between">
          <h1 className="font-extrabold text-3xl">Chamados</h1>
          <Link
            href={"/dashboard/new"}
            className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-700 duration-300"
          >
            Novo chamado
          </Link>
        </div>

        {tickets.length === 0 ? (
          <p>Você não tem nenhum chamado</p>
        ) : (
          <table className="min-w-full my-8 ">
            <thead>
              <tr>
                <th className="font-bold text-left ">CLIENTE</th>
                <th className="font-bold text-left">CADASTRO</th>
                <th className="font-bold text-left">STATUS</th>
                <th className="font-bold text-left">#</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  ticket={ticket}
                  customer={ticket.customer}
                />
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </main>
  );
}
