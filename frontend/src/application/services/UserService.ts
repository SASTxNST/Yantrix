import { api } from "../../core/api/ApiClient";
import type { User } from "../../domain/models/User";

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  phone?: string;
  githubId?: string;
};

export class UserService {
  async updateProfile(data: UpdateProfilePayload): Promise<User> {
    const response = await api.patch("/user/update-profile", data);
    return response.data.data;
  }
}