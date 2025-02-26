import { Company } from '../entities/company.entity';

export class ReadCompanyDto {
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    logoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export class ReadAllCompaniesDto {
  message: string;
  statusCode: number;
  data: {
    companies: Company[];
  };
}
