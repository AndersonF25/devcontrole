"use client";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import React, { useContext } from "react";
import { FiInfo, FiCheckCircle } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ModalContext } from "@/providers/modal";
import { Tooltip } from "react-tooltip";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

const TicketItem = ({ customer, ticket }: TicketItemProps) => {
  const router = useRouter();
  const { handleOpenModal, handleSetTicketsDetails } = useContext(ModalContext);

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

  const handleModal = () => {
    handleOpenModal();
    handleSetTicketsDetails({
      customer: customer,
      ticket: ticket,
    });
  };

  return (
    <>
      {ticket.customerId === null ? null : (
        <tr className="bg-zinc-100 h-12 border-b-2 border-b-slate-400 last:border-b-0 hover:bg-zinc-200 duration-300 ">
          <td className="pl-2">{customer?.name}</td>
          <td className="hidden md:table-cell">
            {ticket.created_at?.toLocaleDateString("pt-br")}
          </td>
          <td className="h-full overflow-hidden">
            <span
              title={
                ticket.status === "Aberto"
                  ? "Chamado em aberto"
                  : "Chamado finalizado"
              }
              className={`p-4 ${
                ticket.status === "Aberto" ? "bg-green-500" : "bg-red-600"
              } text-white font-bold border-b-2 w-28 block text-center`}
            >
              {ticket.status}
            </span>
          </td>
          <td className="pl-2 flex space-x-2">
            <button
              onClick={handleChangeStatus}
              disabled={ticket.status !== "Aberto"}
              className="cursor-pointer disabled:cursor-not-allowed "
            >
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  ticket.status === "Aberto"
                    ? "Finalizar chamado"
                    : "Chamado finalizado"
                }
                data-tooltip-variant={
                  ticket.status === "Aberto" ? "success" : "error"
                }
              >
                <FiCheckCircle size={24} color="#303030cc" className="mt-4" />
              </a>
            </button>
            <button onClick={handleModal}>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Ver detalhes"
                data-tooltip-variant="info"
              >
                <FiInfo size={24} color="#1339e4cc" className="mt-4" />
              </a>
            </button>
          </td>
        </tr>
      )}
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default TicketItem;
