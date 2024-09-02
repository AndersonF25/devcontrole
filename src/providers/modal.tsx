"use client";

import ModalDetailsTicket from "@/components/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { createContext, ReactNode, useState } from "react";
import React from "react";

interface ModalContextProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  handleOpenModal: () => void;
  children: ReactNode;
  ticketDetails: TicketsDetailsInfo | undefined;
  handleSetTicketsDetails: (ticketDetails: TicketsDetailsInfo) => void;
}

interface TicketsDetailsInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ticketDetails, setTicketsDetails] = useState<TicketsDetailsInfo>();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleSetTicketsDetails = (ticketDetails: TicketsDetailsInfo) => {
    console.log(ticketDetails);
    setTicketsDetails(ticketDetails);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        handleOpenModal,
        children,
        ticketDetails,
        handleSetTicketsDetails,
      }}
    >
      {openModal && <ModalDetailsTicket />}
      {children}
    </ModalContext.Provider>
  );
};
