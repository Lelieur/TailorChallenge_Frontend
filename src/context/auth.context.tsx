"use client";

import {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
} from "react";
import { User } from "@/interfaces/User.interface";
import AuthServices from "@/services/auth.services";

const AuthContext = createContext<{
  loggedUser: User | undefined;
  loginUser: (userData: User) => void;
  logoutUser: () => Promise<void>;
  authenticateUser: () => Promise<void>;
  isFetchingUser: boolean;
}>({
  loggedUser: undefined,
  loginUser: () => {},
  logoutUser: async () => {},
  authenticateUser: async () => {},
  isFetchingUser: true,
});

function AuthProviderWrapper({ children }: PropsWithChildren) {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const loginUser = (userData: User) => setLoggedUser(userData);

  const logoutUser = useCallback(async () => {
    try {
      await AuthServices.logout();
    } catch {}
    setLoggedUser(undefined);
    setIsFetchingUser(false);
  }, []);

  const authenticateUser = useCallback(async () => {
    setIsFetchingUser(true);
    try {
      const { data } = await AuthServices.verifyUser();
      loginUser(data.loggedUserData);
    } catch {
      setLoggedUser(undefined);
    } finally {
      setIsFetchingUser(false);
    }
  }, []);

  useEffect(() => {
    void authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        loginUser,
        logoutUser,
        authenticateUser,
        isFetchingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
