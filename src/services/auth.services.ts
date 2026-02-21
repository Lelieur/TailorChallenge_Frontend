import { http } from "@/services/http.services";
import { LoginData, SignupData } from "@/interfaces/Auth.interface";

class AuthServices {
  signupUser(userData: SignupData) {
    return http.post("/backend/signup", userData);
  }

  loginUser(userData: LoginData) {
    return http.post("/auth/login", userData);
  }

  verifyUser() {
    return http.get("/auth/verify");
  }

  logout() {
    return http.post("/auth/logout");
  }
}

const authServicesInstance = new AuthServices();
export default authServicesInstance;
