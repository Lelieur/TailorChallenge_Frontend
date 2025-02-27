import "./../styles/globals.css";
import type { Metadata } from "next";

import { AuthProviderWrapper } from "@/context/auth.context";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "TailorHub Challenge",
  authors: [{ name: "Lucas Lelieur" }],
  description: "TailorHub Challenge resolved by Lucas Lelieur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body className="w-full h-full flex flex-col px-7 pt-7 pb-3">
        <AuthProviderWrapper>
          <NavBar />

          {children}

          <Footer />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
