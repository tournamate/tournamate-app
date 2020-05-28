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
