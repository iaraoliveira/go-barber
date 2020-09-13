import { ValidationError } from 'yup';

interface Errors {
  [key: string] : string;
}

export default function getValidationErrors(errors: ValidationError): Errors {
  const validationErrors: Errors = {};

  // console.log(errors);
  errors.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  console.log(validationErrors);
  return validationErrors;
}
