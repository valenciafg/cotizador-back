import ICompany from '../interfaces/company-interface';

export class CreateWorkInformationDto {
  profession: string;
  specialty: string;
  knowledge: string[];
  currentCompanies: ICompany[];
  workedCompanies: ICompany[];
  workedProjects: string[];

  services: string[];
  headings: string[];
}
