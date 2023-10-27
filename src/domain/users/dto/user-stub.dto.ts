import { CreateUserDto } from './create-user.dto';

export const UserStubDto = (): CreateUserDto => {
  return {
    isActive: true,
    login: 'Admin',
    name: 'Admin',
    email: 'admin@email.com',
    password: '12345'
  };
};
