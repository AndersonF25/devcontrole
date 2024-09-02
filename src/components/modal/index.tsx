"use client";

import { ModalContext } from "@/providers/modal";
import React, { useContext, useRef } from "react";

const ModalDetailsTicket = () => {
  const { handleOpenModal, ticketDetails } = useContext(ModalContext);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleOpenModal();
    }
  };

  return (
    <section
      className="absolute bg-gray-900/80 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-zinc-100 shadow-lg rounded-md p-5 w-1/2 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Detalhes do chamado</h1>
            <button
              className="bg-red-500 py-1 px-3 rounded-md text-white"
              onClick={handleOpenModal}
            >
              Fechar
            </button>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="font-bold">Nome do chamado:</h3>
            <span>{ticketDetails?.ticket.name}</span>
          </div>
          <div className="flex items-start gap-1">
            <h3 className="font-bold">Descrição:</h3>
            <span>{ticketDetails?.ticket.description}</span>
          </div>
          <hr className=" border-zinc-600 " />
          <h3 className="font-bold text-xl">Detalhes do cliente</h3>
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-1">
              <span className="font-bold">Nome:</span>
              <span>{ticketDetails?.customer?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Telefone:</span>
              <span>{ticketDetails?.customer?.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">Email:</span>
              <span>{ticketDetails?.customer?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalDetailsTicket;
