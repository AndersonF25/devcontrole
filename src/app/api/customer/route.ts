import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

//DELETAR UM CLIENTE!
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  try {
    await prismaClient.customer.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 400 }
    );
  }
}

//ROTA PARA CADASTRAR UM CLIENTE
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, phone, email, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new customer" },
      { status: 400 }
    );
  }
}

//ROTA PARA PEGAR UM CLIENTE
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Customer not found!" }, { status: 404 });
  }

  try {
    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(findCustomer);
  } catch (error) {
    return NextResponse.json({ error: "Customer not found!" }, { status: 404 });
  }
}
