export interface registerUserType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface loginUserType {
  email: string;
  password: string;
}

export interface userType {
  userId: string;
  firstName?: string;
  lastName?: string;
  jobRole?: string;
  email: string;
  profilePic?: string;
  token: string;
}
export interface ReturnedFieldsType {
  firstName: string | undefined;
  lastName: string | undefined;
  jobRole: string | undefined;
}

export interface EditUserDataType {
  userId: string;
  newFields: { firstName: string; lastName: string; jobRole: string };
}
export interface firebaseUserType {
  email: string;
  firstName: string;
  lastName: string;
  jobRole: string;
  myDesk: {
    deskNum: number;
  };
  profilePic: string;
  userId: string;
}
