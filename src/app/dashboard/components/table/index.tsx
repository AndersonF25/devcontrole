import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TicketItem = () => {
  return (
    <>
      <tr className="bg-zinc-100 h-12 border-b-2 border-b-slate-400 last:border-b-0 hover:bg-zinc-200 duration-300">
        <td className="pl-2 ">mercado silva</td>
        <td>19/08/2024</td>
        <td className="bg-green-500 pl-2">Aberto</td>
        <td className="pl-2 table-cell">
          <button>
            <FiTrash2 size={24} color="#e41313cc" />
          </button>
          <button className=" ml-2">
            <FiEdit size={24} color="#1339e4cc" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TicketItem;
