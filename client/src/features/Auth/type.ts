export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  rpassword: string;
  phone: string;
  role: string;
};


export type UserForRegistration = Omit<
  User,
  'id' | 'role'  >;
export type UserForAuthorisation = Pick<User, 'email' | 'password'>;

export type StateAuth = {
  user: User | null;
  message: string | undefined;
};
