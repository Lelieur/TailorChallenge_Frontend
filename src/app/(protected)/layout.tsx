import "./../../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { getCurrentUser } from "@/server/use-cases/getCurrentUser";
import { requireSession } from "@/server/auth/session";
import NavBar from "@/components/NavBar/NavBar";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  const loggedUser = await getCurrentUser();
  return (
    <>
      <NavBar loggedUser={loggedUser!} />
      {children}
    </>
  );
}
