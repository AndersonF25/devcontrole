"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

const BtnRefresh = () => {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.refresh()}>
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Atualizar lista"
          data-tooltip-variant="info"
        >
          <FiRefreshCcw size={25} color="#1339e4cc" />
        </a>
      </button>
    </>
  );
};

export default BtnRefresh;
