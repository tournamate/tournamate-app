export interface SignupWithEmail {
  fullName: string;
  nickName: string;
  email: string;
  password: string;
}

export interface UserDataType extends Omit<SignupWithEmail, 'password'> {
  signedInWithEmail: boolean;
  isUserExists: boolean;
  token?: string;
}
