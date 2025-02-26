import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { LoginData, SignupData } from "@/interfaces/Auth.interface";

class AuthServices {
  private axiosApp: AxiosInstance;

  constructor() {
    this.axiosApp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    });

    this.axiosApp.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== undefined) {
          const storedToken = localStorage.getItem("authToken");
          if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
          }
        }

        return config;
      }
    );
  }

  signupUser(userData: SignupData) {
    return this.axiosApp.post("/signup", userData);
  }

  loginUser(userData: LoginData) {
    return this.axiosApp.post("/login", userData);
  }

  verifyUser(token?: string) {
    const header = token ? { Authorization: `Bearer ${token}` } : {};
    return this.axiosApp.get("/verify", { headers: header });
  }
}

export default new AuthServices();
