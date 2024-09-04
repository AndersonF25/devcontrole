import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CardCustomer from "./components/card";
import prismaClient from "@/lib/prisma";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="w-full">
        <div className="w-full flex items-center justify-between mt-2 flex-wrap-reverse gap-4">
          <h1 className="font-extrabold text-3xl">Meus clientes</h1>
          <Link
            href={"/dashboard/customer/new"}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-300"
          >
            Novo cliente
          </Link>
        </div>
        {customers.length === 0 ? (
          <p className="mt-4 font-light text-lg">
            Você não cadastrou nenhum cliente!
          </p>
        ) : (
          <section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 mt-6">
            {customers.map((customer) => (
              <CardCustomer
                address={customer.address}
                email={customer.email}
                id={customer.id}
                name={customer.name}
                phone={customer.phone}
                key={customer.id}
               
              />
            ))}
          </section>
        )}
      </main>
    </Container>
  );
}
