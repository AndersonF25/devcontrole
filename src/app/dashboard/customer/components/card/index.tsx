"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import ModalConfirmDelete from "../modal";

interface CardCustomerProps {
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  id: string;
  userId?: string;
}

const CardCustomer = ({
  address,
  email,
  id,
  name,
  phone,
}: CardCustomerProps) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  async function handleDeleteCustomer() {
    try {
      await api.delete("/api/customer", {
        params: {
          id: id,
        },
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting customer:", error);
    } finally {
      setOpenModal(false); // Fecha o modal após a exclusão
    }
  }

  return (
    <main className="relative">
      <article
        className="flex flex-col items-start bg-gray-100 border-2 p-2 gap-2 hover:scale-105 duration-300 z-20"
        key={id}
      >
        <h2>
          <span className="font-bold">Nome:</span> {name}
        </h2>
        <p>
          <span className="font-bold">Email:</span> {email}
        </p>
        <p>
          <span className="font-bold">Telefone:</span> {phone}
        </p>

        {address && (
          <p>
            <span className="font-bold">Endereço:</span> {address}
          </p>
        )}

        <button
          className="bg-red-500 py-1 px-3 rounded-md text-white hover:bg-red-600 duration-300"
          onClick={() => setOpenModal(true)}
        >
          Deletar
        </button>
      </article>
      {openModal && (
        <ModalConfirmDelete
          onCancel={() => setOpenModal(false)}
          onConfirm={handleDeleteCustomer}
        />
      )}
    </main>
  );
};

export default CardCustomer;
