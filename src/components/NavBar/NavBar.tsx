import { User } from "@/interfaces/User.interface";
import UserMenu from "@/components/NavBar/UserMenu";

export default function NavBar({ loggedUser }: { loggedUser: User }): React.ReactNode {
  return (
    <nav
      className={` w-full text-sm mb-3 relative ${
        loggedUser ? "block" : "hidden"
      }`}
    >
      <UserMenu loggedUser={loggedUser} />
    </nav>
  );
}
