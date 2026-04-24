import { api } from "../../core/api/ApiClient";

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  githubId?: string;
};

export class AuthService {
  async login(data: { email: string; password: string }) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }

  async register(data: RegisterPayload) {
    const response = await api.post("/auth/register", data);
    return response.data;
  }

  async getMe() {
    const response = await api.get("/auth/me");
    return response.data.data;
  }

  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  }
}