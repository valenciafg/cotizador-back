import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { get } from 'lodash';
import { getOffset, getPages, handleRegisterExceptions } from '../utils';
import { equalUserTypeValidation, userStepValidation } from './helpers';
import {
  CreateBasicInformationDto,
  CreateProfileInformationDto,
  CreateUserInformationDto,
  CreateWorkInformationDto,
  UploadFileDto,
  UserDto,
} from './dto';
import { User } from './entities/user.entity';
import { REGISTER_STEPS, USER_TYPE } from '../constants';
import { CompanyService } from '../company/company.service';
import { ServiceService } from '../service/service.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { HeadingService } from '../heading/heading.service';
import { ProjectService } from '../project/project.service';
import { SearchUsersInput, SearchUsersOptions } from './inputs';
import { FilesService } from '../files/files.service';
import { CityService } from '../city/city.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private companyService: CompanyService,
    private serviceService: ServiceService,
    private knowledgeService: KnowledgeService,
    private headingService: HeadingService,
    private projectService: ProjectService,
    private fileService: FilesService,
    private cityService: CityService,
  ) {}

  async setType(user: User, userType: number) {
    const currentUserType = get(user, 'userType', -1);
    if (currentUserType === 0) {
      throw new BadRequestException('User already have type');
    }
    userStepValidation(user, REGISTER_STEPS.USER_TYPE);
    const validUserTypes = [
      USER_TYPE.PROFESSIONAL,
      USER_TYPE.COMPANY,
      USER_TYPE.CONTRACTOR_SUPPLIER,
    ];
    if (!validUserTypes.includes(userType)) {
      throw new BadRequestException(`Invalid type ${userType}`);
    }
    try {
      await user.updateOne({
        userType,
        registerStep: REGISTER_STEPS.BASIC_INFO,
      });
      return { ok: true, message: `User updated with type: ${userType}` };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async setBasicInformation(user: User, basicInfo: CreateBasicInformationDto) {
    equalUserTypeValidation(user, basicInfo.userType);
    userStepValidation(user, REGISTER_STEPS.BASIC_INFO);
    delete basicInfo.userType;
    try {
      await user.updateOne({
        ...basicInfo,
        registerStep: REGISTER_STEPS.USER_INFO,
      });
      return { ok: true, message: 'Basic information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async validateMainDocument(user: User, userInfo: CreateUserInformationDto) {
    let userFound;
    if (user.userType === USER_TYPE.PROFESSIONAL) {
      userFound = await this.userModel.findOne({ dni: userInfo.dni });
    } else {
      userFound = await this.userModel.findOne({ ruc: userInfo.ruc });
    }
    if (userFound && user.uuid !== userFound.uuid) {
      throw new Error('Exist another user with this main document');
    }
  }

  async setGeneralInformation(user: User, userInfo: CreateUserInformationDto) {
    equalUserTypeValidation(user, userInfo.userType);
    userStepValidation(user, REGISTER_STEPS.USER_INFO);
    delete userInfo.userType;
    try {
      await user.updateOne({
        ...userInfo,
        registerStep: REGISTER_STEPS.WORK_INFO,
      });
      return { ok: true, message: 'General information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async setWorkInformation(user: User, workInfo: CreateWorkInformationDto) {
    equalUserTypeValidation(user, workInfo.userType);
    userStepValidation(user, REGISTER_STEPS.WORK_INFO);
    delete workInfo.userType;
    try {
      await user.updateOne({
        ...workInfo,
        registerStep: REGISTER_STEPS.PROFILE_INFO,
      });
      return { ok: true, message: 'Work information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }
  async setProfileInformation(
    user: User,
    profileInfo: CreateProfileInformationDto,
  ) {
    equalUserTypeValidation(user, profileInfo.userType);
    userStepValidation(user, REGISTER_STEPS.PROFILE_INFO);
    delete profileInfo.userType;
    try {
      await user.updateOne({
        ...profileInfo,
        registerStep: REGISTER_STEPS.FINISHED,
      });
      return { ok: true, message: 'Profile information registered' };
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async getUserById(id: string) {
    const user: User = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createBasicInformationDto: CreateBasicInformationDto) {
    try {
      const user = await this.userModel.create(createBasicInformationDto);
      return user;
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Must send a valid ID');
    }
    return this.getUserById(id);
  }

  findOneByUuid(uuid: string) {
    return this.userModel.findOne({ uuid });
  }

  getUserByUUID(uuid: string) {
    return this.userModel.findOne({ uuid });
  }

  async addKnowlege(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const knowledge = await this.knowledgeService.findOrCreate(name);
    const [knowledgeFound] = doc.knowledges.filter(
      (element) => element === knowledge.uuid,
    );
    if (knowledgeFound) {
      throw new Error('Item found');
    }
    doc.knowledges.push(knowledge.uuid);
    const response = await doc.save();
    return response;
  }
  async addWorkedProject(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const project = await this.projectService.findOrCreate(name);
    const [projectFound] = doc.workedProjects.filter(
      (element) => element === project.uuid,
    );
    if (projectFound) {
      throw new Error('Item found');
    }
    doc.workedProjects.push(project.uuid);
    const response = await doc.save();
    return response;
  }
  async addCurrentCompany(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const company = await this.companyService.findOrCreate(name);
    const [companyFound] = doc.currentCompanies.filter(
      (element) => element === company.uuid,
    );
    if (companyFound) {
      throw new Error('Item found');
    }
    doc.currentCompanies.push(company.uuid);
    const response = await doc.save();
    return response;
  }
  async addWorkedCompany(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const company = await this.companyService.findOrCreate(name);
    const [companyFound] = doc.workedCompanies.filter(
      (element) => element === company.uuid,
    );
    if (companyFound) {
      throw new Error('Item found');
    }
    doc.workedCompanies.push(company.uuid);
    const response = await doc.save();
    return response;
  }
  async addService(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const service = await this.serviceService.findOrCreate(name);
    const [serviceFound] = doc.services.filter(
      (element) => element === service.uuid,
    );
    if (serviceFound) {
      throw new Error('Item found');
    }
    doc.services.push(service.uuid);
    const response = await doc.save();
    return response;
  }
  async addHeading(uuid: string, name: string) {
    const doc = await this.userModel.findOne({ uuid });
    if (!doc) {
      throw new Error('User not found');
    }
    const heading = await this.headingService.findOrCreate(name);
    const [headingFound] = doc.workedCompanies.filter(
      (element) => element === heading.uuid,
    );
    if (headingFound) {
      throw new Error('Item found');
    }
    doc.headings.push(heading.uuid);
    const response = await doc.save();
    return response;
  }
  async deleteKnowledge(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          knowledges: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }
  async deleteCurrentCompany(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          currentCompanies: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }
  async deleteWorkedProject(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          workedProjects: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }
  async deleteWorkedCompany(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          workedCompanies: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }
  async deleteService(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          services: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }
  async deleteHeading(userUuid: string, uuid: string) {
    const doc = await this.userModel.updateOne(
      { uuid: userUuid },
      {
        $pullAll: {
          headings: [uuid],
        },
      },
    );
    if (doc.modifiedCount > 0) {
      return `${uuid}`;
    }
    throw new Error(`${uuid} not found`);
  }

  async getUsers(options: SearchUsersOptions, input?: SearchUsersInput) {
    const VALID_USER_TYPES = [
      USER_TYPE.PROFESSIONAL,
      USER_TYPE.COMPANY,
      USER_TYPE.CONTRACTOR_SUPPLIER,
    ];
    let query = {};
    if (input.serviceId) {
      query = { ...query, services: input.serviceId };
    }
    if (input.deparmentId) {
      query = { ...query, deparmentId: input.deparmentId };
    }
    if (input.provinceId) {
      query = { ...query, provinceId: input.provinceId };
    }
    if (input.districtId) {
      query = { ...query, districtId: input.districtId };
    }
    const filter = {
      userType: {
        $in: VALID_USER_TYPES,
      },
      ...query,
    };
    const count = await this.userModel.countDocuments(filter);
    const offset = getOffset(options.page, options.limit);
    const pages = getPages(count, options.limit);
    const users = await this.userModel
      .find(filter)
      .limit(options.limit)
      .skip(offset)
      .sort({ createdAt: -1 });
    return {
      pages,
      currentPage: options.page,
      users,
    };
  }

  async setProfilePic(uuid: string, profilePicUuid: string) {
    try {
      await this.userModel.findOneAndUpdate(
        { uuid },
        { profilePic: profilePicUuid },
      );
    } catch (error) {
      handleRegisterExceptions(error);
    }
  }

  async uploadFile(
    options: UploadFileDto,
    file: Express.Multer.File,
    user: User,
  ) {
    try {
      const fileResponse = await this.fileService.uploadUserFile(
        file,
        user,
        options.isProfile,
      );
      if (options.isProfile) {
        await this.setProfilePic(user.uuid, fileResponse.uuid);
      }
      return fileResponse;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getFullAddress(user: UserDto): Promise<string> {
    let fullAddress = '';
    if (user.address) {
      fullAddress += `${user.address},`;
    }
    // console.log({ user })
    // if (user.cityId)
    if (user.districtId) {
      const [district] = await this.cityService.getDistricts(
        null,
        user.districtId,
      );
      if (district) {
        fullAddress += ` ${district.distrito},`;
      }
    }
    if (user.provinceId) {
      const [province] = await this.cityService.getProvinces(
        null,
        user.provinceId,
      );
      if (province) {
        fullAddress += ` ${province.provincia},`;
      }
    }
    if (user.departmentId) {
      const [department] = await this.cityService.getDeparments(
        user.departmentId,
      );
      if (department) {
        fullAddress += ` ${department.departamento},`;
      }
    }
    return fullAddress.replace(/,\s*$/, '');
  }

  async createFakeUser(limit: number, type: string) {
    for (let i = 0; i < limit; i++) {
      const data = {
        email: faker.internet.email(),
        password: '123456',
        registerStep: REGISTER_STEPS.FINISHED,
        description: faker.company.catchPhraseDescriptor(),
      };
    }
  }
}
