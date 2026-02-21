import "./../../styles/globals.css";
import Footer from "@/components/Footer/Footer";
import { getCurrentUser } from "../api/auth/dal";
import NavBar from "@/components/NavBar/NavBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUser = await getCurrentUser();
  return (
    <>
      <NavBar loggedUser={loggedUser!} />
      {children}
    </>
  );
}
