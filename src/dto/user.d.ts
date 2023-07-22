type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  cellphone: string;
};

type UserDto = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  cellphone: string;
  verifyToken: string;
};
