import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).end(); // Método não permitido
  }

  try {
    // Iniciar uma transação
    await prisma.$transaction(async (prisma) => {
      // Deletar todos os tickets associados ao cliente
      await prisma.ticket.deleteMany({
        where: {
          customerId: id as string,
        },
      });

      // Deletar o cliente
      await prisma.customer.delete({
        where: {
          id: id as string,
        },
      });
    });

    res
      .status(200)
      .json({ message: "Cliente e tickets deletados com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar cliente e tickets:", error);
    res.status(500).json({ error: "Erro ao deletar cliente e tickets." });
  }
}
