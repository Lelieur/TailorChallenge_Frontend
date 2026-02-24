import './../../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getCurrentUser } from "@/server/use-cases/getCurrentUser";
import NavBar from '@/components/NavBar/NavBar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const loggedUser = await getCurrentUser();
  return (
    <>
      <NavBar loggedUser={loggedUser!} />
      {children}
    </>
  );
}
