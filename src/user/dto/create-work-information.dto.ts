import ICompany from '../interfaces/company-interface';
import { USER_TYPE } from '../../constants';

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
