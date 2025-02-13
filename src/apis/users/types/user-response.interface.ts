export interface SafeUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  preferredLanguage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatedUserResponse {
  message: string;
  statusCode: number;
  data: SafeUser;
}
