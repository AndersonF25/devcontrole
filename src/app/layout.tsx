import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/providers/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento.",
  description: "Gerencie seus clientes de forma rápida e pratica!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
