import { USER_TYPE } from "src/constants";

export const getUserFullname = (user) => {
  return user.userType === USER_TYPE.PROFESSIONAL ? `${user.name} ${user.lastName}` : user.commercialName;
}