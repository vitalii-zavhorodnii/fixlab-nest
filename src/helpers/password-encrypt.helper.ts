import * as bcrypt from 'bcrypt';

export const PasswordEncryptHelper = async (password: string) => {
  const salt = 16;

  console.log({ salt });

  const hashedData = await bcrypt.hash(password, salt);

  return hashedData;
};
