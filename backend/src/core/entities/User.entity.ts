
export class UserEntity {
  constructor(
    public readonly user_id: string,
    public readonly first_name: string,
    public readonly last_name: string | null,
    public readonly phone_number: string | null,
    public readonly email: string | null,
    public readonly address: string | null,
    // public readonly govt_id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    if (!this.phone_number && !this.email) {
      throw new Error("User must have at least phone number or email");
    }
  }

  public hasEmail(): boolean {
    return !!this.email;
  }

  public hasPhone(): boolean {
    return !!this.phone_number;
  }

  public getFullName(): string {
    return `${this.first_name} ${this.last_name ?? ""}`.trim();
  }

  public getContactInfo(): object {
    if (this.hasEmail() && this.hasPhone()) {
      return { email: this.email!, phone: this.phone_number! };
    } else if (this.hasEmail()) {
      return { email: this.email! };
    } else if (this.hasPhone()) {
      return { phone: this.phone_number! };
    } else 
        return {};
  }

  public toJSON() {
    return {
      id: this.user_id,
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number,
      email: this.email,
      address: this.address,
      // govt_id: this.govt_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export type UserRole = {
    user_id: string;
  
};