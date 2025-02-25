import axios, { AxiosInstance } from "axios";

class UploadServices {
  private axiosApp: AxiosInstance;

  constructor() {
    this.axiosApp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    });
  }

  signUpload() {
    return this.axiosApp.get("/signuploadform");
  }

  async uploadImage(file: File) {
    try {
      const { data } = await this.signUpload();
      const { cloudname, folder, apikey, timestamp, signature } = data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apikey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.log("Error subiendo la imagen:", error);
      throw error;
    }
  }
}

export default new UploadServices();
