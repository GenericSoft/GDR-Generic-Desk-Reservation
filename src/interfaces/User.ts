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
  email: string;
  profilePic?: string;
  token: string;
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
