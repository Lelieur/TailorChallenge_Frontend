import "./../styles/globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sileo";

export const metadata: Metadata = {
  title: "TailorHub Challenge",
  authors: [{ name: "Lucas Lelieur" }],
  description: "TailorHub Challenge resolved by Lucas Lelieur",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body className="flex h-full w-full flex-col px-2 pt-2 pb-3 sm:px-7 sm:pt-7">
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
