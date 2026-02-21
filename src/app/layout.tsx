import "./../styles/globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "TailorHub Challenge",
  authors: [{ name: "Lucas Lelieur" }],
  description: "TailorHub Challenge resolved by Lucas Lelieur",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body className="w-full h-full flex flex-col px-2 pt-2 sm:px-7 sm:pt-7 pb-3">
        {children}
        <Footer />
      </body>
    </html>
  );
}
