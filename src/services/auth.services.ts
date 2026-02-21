import { http } from "@/services/http.services";
import { LoginData, SignupData } from "@/interfaces/Auth.interface";
import { User } from "@/interfaces/User.interface";

class AuthServices {
  signupUser(
    userData: SignupData,
  ): Promise<{ data: { loggedUserData: User } }> {
    return http.post("/backend/signup", userData);
  }

  loginUser(userData: LoginData): Promise<{ data: { loggedUserData: User } }> {
    return http.post("/auth/login", userData);
  }

  verifyUser(): Promise<{ data: { loggedUserData: User } }> {
    return http.get("/auth/verify");
  }

  logout() {
    return http.post("/auth/logout");
  }
}

const authServicesInstance = new AuthServices();
export default authServicesInstance;
