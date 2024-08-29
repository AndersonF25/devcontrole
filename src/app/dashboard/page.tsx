import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "./components/table";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

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
            <TicketItem />
            <TicketItem />
            <TicketItem />
          </tbody>
        </table>
      </Container>
    </main>
  );
}
