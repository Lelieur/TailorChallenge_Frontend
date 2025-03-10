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
  logoutUser: () => void;
  authenticateUser: () => void;
  isFetchingUser: boolean;
}>({
  loggedUser: undefined,
  loginUser: () => {},
  logoutUser: () => {},
  authenticateUser: () => {},
  isFetchingUser: true,
});

function AuthProviderWrapper({ children }: PropsWithChildren) {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined); // Permitir undefined
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const loginUser = (userData: User) => {
    setLoggedUser(userData);
  };

  const logoutUser = () => {
    setLoggedUser(undefined);
    setIsFetchingUser(false);
    localStorage.removeItem("authToken");
  };

  const authenticateUser = useCallback(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      AuthServices.verifyUser(token)
        .then(({ data }) => {
          loginUser(data.loggedUserData);
          setIsFetchingUser(false);
        })
        .catch((err) => {
          console.log(err);
          logoutUser();
        });
    } else {
      logoutUser();
    }
  }, []);

  useEffect(() => authenticateUser(), [authenticateUser]);

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
