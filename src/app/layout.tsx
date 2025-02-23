import "./../styles/globals.css";
import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "TailorHub Challenge",
  authors: [{ name: "Lucas Lelieur" }],
  description: "TailorHub Challenge resolved by Lucas Lelieur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body className="w-full h-full flex flex-col">
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
