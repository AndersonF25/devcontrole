"use client";

import Link from "next/link";
import React from "react";
import { FiLogOut, FiUser, FiLoader, FiLogIn } from "react-icons/fi";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const Header = () => {
  const { data: session, status } = useSession();

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
          <button onClick={handleSignIn} title="login">
            <FiLogIn size={25} />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"} title="dashboard">
              <FiUser size={25} />
            </Link>
            <button onClick={handleSignOut} title="logout">
              <FiLogOut size={25} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


