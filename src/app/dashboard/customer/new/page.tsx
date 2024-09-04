import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormCustomer from "../components/form";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="w-full flex flex-col gap-12 items-start mt-2">
        <div className=" sm:flex items-center  gap-4">
          <Link
            href={"/dashboard/customer"}
            className="bg-slate-600 text-white py-1 px-3 rounded-lg"
          >
            Voltar
          </Link>
          <h1 className="font-bold text-2xl pt-3 sm:text-3xl">
            Cadastre um novo cliente
          </h1>
        </div>

        <FormCustomer userId={session.user.id} />
      </main>
    </Container>
  );
}
