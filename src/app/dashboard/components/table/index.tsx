"use client";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import React from "react";
import { FiInfo, FiCheckCircle } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

const TicketItem = ({ customer, ticket }: TicketItemProps) => {
  const router = useRouter();

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      toast.success("Tarefa finalizada com sucesso!");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {ticket.customerId === null ? null : (
        <tr className="bg-zinc-100 h-12 border-b-2 z-10 border-b-slate-400 last:border-b-0 hover:bg-zinc-200 duration-300">
          <td className="pl-2 ">{customer?.name}</td>
          <td>{ticket.created_at?.toLocaleDateString("pt-br")}</td>
          <td className="h-full overflow-hidden  ">
            <span
              title={
                ticket.status === "Aberto"
                  ? "Chamado em aberto"
                  : "Chamado finalizado"
              }
              className={`p-4 ${
                ticket.status === "Aberto" ? "bg-green-600" : "bg-red-500"
              } text-black border-b-2 w-28  block text-center`}
            >
              {ticket.status}
            </span>
          </td>
          <td className="pl-2 table-cell">
            <button onClick={handleChangeStatus}>
              <FiCheckCircle
                size={24}
                color="#303030cc"
                title={ticket.status === "Aberto" ? "Finalizar chamado" : ""}
              />
            </button>
            <button className=" ml-2">
              <FiInfo
                size={24}
                color="#1339e4cc"
                title="Informações do chamado"
              />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default TicketItem;
