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
  country?: string;
  birthday?: string;
  email: string;
  profilePic?: string;
  token?: string;
}
export interface ProfileInfoType {
  firstName?: string | undefined;
  lastName?: string | undefined;
  jobRole?: string | undefined;
  country?: string | undefined;
  profilePic?: string;
  birthday?: string | undefined;
}

export interface EditUserDataType {
  userId: string;
  newFields: {
    firstName?: string;
    lastName?: string;
    jobRole?: string;
    country?: string;
    birthday?: string;
    profilePic?: string;
  };
}
export interface firebaseUserType {
  email: string;
  firstName: string;
  lastName: string;
  jobRole: string;
  country: string;
  birthday: string;
  myDesk: {
    deskNum: number;
  };
  profilePic: string;
  userId: string;
}
