export interface SignupWithEmail {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

export interface UserDataType extends Omit<SignupWithEmail, 'password'> {
  signedInWithEmail: boolean;
  createdAt: string;
  userId: string;
}

export interface AuthSchema {
  createdAt: number;
  email: string;
  emailIdVerified: boolean;
  fullName: string;
  isAuthenticated: boolean;
  isNewUser: boolean;
  mobileNumber: number | null;
  mobileNumberVerified: boolean;
  photo: string;
  userId: string;
  others?: {
    aud: string | null;
    iss: string | null;
    provier: string | null;
  };
  userName: string;
  pubgMobileUsername?: string;
  pubgUsername?: string;
  freeFireUsername?: string;
}
