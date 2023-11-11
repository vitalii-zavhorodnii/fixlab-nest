import * as generator from 'generate-password';

export const PasswordGeneratorHelper = (length = 16): string =>
  generator.generate({
    length,
    numbers: true
  });
