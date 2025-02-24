import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

class AuthServices {
  private axiosApp: AxiosInstance;

  constructor() {
    this.axiosApp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    });

    this.axiosApp.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }

        return config;
      }
    );
  }

  signupUser(userData: object) {
    return this.axiosApp.post("/signup", userData);
  }

  loginUser(userData: object) {
    return this.axiosApp.post("/login", userData);
  }

  verifyUser(token: string) {
    return this.axiosApp.get("/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AuthServices();
