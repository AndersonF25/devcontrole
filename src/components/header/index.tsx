"use client";

import Link from "next/link";
import React from "react";
import { FiLogOut, FiUser, FiLoader, FiLogIn } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { MdOutlineDashboard } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { status } = useSession();

  async function handleSignIn() {
    await signIn();
  }
  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="w-full h-20 flex items-center bg-white border-b-2">
      <div className="w-5/6 m-auto  flex items-center justify-between">
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="font-bold text-2xl text-blue-500  ">DEV</span>
          <span className="font-bold text-2xl text-black">CONTROLE</span>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={25} />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleSignIn}>
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Entrar"
              data-tooltip-variant="info"
            >
              <FiLogIn size={25} />
            </a>
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"} className="flex items-center ">
              <button className="w-full h-full">
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Acessar dashboard"
                  data-tooltip-variant="info"
                >
                  <MdOutlineDashboard size={27} />
                </a>
              </button>
            </Link>
            <button onClick={handleSignOut}>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Sair"
                data-tooltip-variant="error"
              >
                <FiLogOut size={25} />
              </a>
            </button>
          </div>
        )}
      </div>
      <Tooltip id="my-tooltip" />
    </header>
  );
};

export default Header;
