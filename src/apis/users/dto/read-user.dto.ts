export class ReadUserDto {
  message: string;
  statusCode: number;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role: string;
    preferredLanguage?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}
