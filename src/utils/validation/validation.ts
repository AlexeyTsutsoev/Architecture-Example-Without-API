import { string as yupString } from 'yup';
import regexs from './regexValidation';
import validationErrors from './validationErrors';

export const emailValidation = yupString()
  .required(validationErrors.requiredEmail)
  .email(validationErrors.invalidEmail);

export const passwordValidation = yupString()
  .required(validationErrors.reqiredPassword)
  .min(8, validationErrors.invalidPassword + 'minimum 8 chars')
  .matches(
    regexs.onlyLatin,
    validationErrors.invalidPassword +
      'Password can only contain Latin letters.',
  );

export const nameValidation = yupString().required(
  validationErrors.requiredFirstName,
);

export const lastNameValidation = yupString().required(
  validationErrors.requiredLastName,
);

export const genderValidation = yupString().required(
  validationErrors.requiredGender,
);

export const countryValidation = yupString().required(
  validationErrors.requiredCountry,
);

export const phoneValidation = yupString()
  .required(validationErrors.requiredPhoneNumber)
  .min(10, validationErrors.invalidPhone)
  .max(13, validationErrors.invalidPhone)
  .matches(regexs.phoneRegExp, validationErrors.invalidPhone);

export const urlValidation = yupString()
  .required(validationErrors.urlRequired)
  .matches(regexs.urlRegex, validationErrors.urlNotMathes);
