import Container from "@/components/container";
import Link from "next/link";
import React from "react";

const DashboardHeader = () => {
  return (
    <Container>
      <div className="w-full mt-4 mb-4 bg-slate-600 h-full py-2 rounded-lg text-white flex items-center gap-6 pl-4 ">
        <Link
          href={"/dashboard"}
          className="text-white hover:scale-105 duration-300 "
        >
          Chamados
        </Link>
        <Link
          href={"/dashboard/customer"}
          className="text-white hover:scale-105 duration-300 "
        >
          Clientes
        </Link>
      </div>
    </Container>
  );
};

export default DashboardHeader;
