import { Error } from "mongoose";

export const handleValidationError = (err: Error.ValidationError ) => {
  let message = 'unknown';
  const key = Object.keys(err.errors);
  const errorValidator = err.errors[key[0]] as Error.ValidatorError;
  if (errorValidator && errorValidator.properties) {
    message = errorValidator.properties.message;
  }
  return message;
}
