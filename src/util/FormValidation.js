import ValidationRegex from "../constants/ValidationRegex";
import { ErrorMessages } from "../constants/Messages";
import { PASSWORD_MIN_LENGTH } from "../constants/ConstantValues";
import { EMAIL_ALLOWED } from "../config/ApiUrl";
import ApiRequest from "../util/ApiRequest";
import React, { useState, useEffect } from "react";

const validateEmailPattern = (email) => ValidationRegex.EMAIL.test(email);
const namePattern = (name) => ValidationRegex.ONLY_ALPHA.test(name);
const passwordPattern = (password) => ValidationRegex.PASSWORD.test(password);

class ValidationResponse {
  isValid = true;
  message = "";
}

export const resetPasswordValidate = (value) => {
  const validationResponse = new ValidationResponse();
  if (!value) {
    validationResponse.isValid = false;
    validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
  } else if (value.length < PASSWORD_MIN_LENGTH) {
    validationResponse.isValid = false;
    validationResponse.message = ErrorMessages.PASSWORD_MIN;
  } else if (passwordPattern(value)) {
    validationResponse.isValid = false;
    validationResponse.message = ErrorMessages.PASSWORD_PATTERN;
  }
  return validationResponse;
};

class Validation {
  validateForm = (fields, context) => {
    const response = {
      errors: {},
      isFormValid: true,
    };

    for (const field in fields) {
      if (Object.hasOwnProperty.call(fields, field)) {
        const value = fields[field];
        const validationResponse = this.validateField(field, value, context);
        response.errors[field] = validationResponse.message;
        if (response.isFormValid) {
          response.isFormValid = validationResponse.isValid;
        }
      }
    }
    return response;
  };
}

export class LoginValidation extends Validation {
  validateField = (field, value) => {
    const validationResponse = new ValidationResponse();
    switch (field) {
      case "email":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.EMAIL_REQUIRED;
        } else if (!validateEmailPattern(value)) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.EMAIL_INVALID;
        }
        break;
      case "password":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
        }

        break;

      default:
        break;
    }
    return validationResponse;
  };
}

export class UserValidation extends Validation {
  constructor(props) {
    super(props);
    this.state = {
      legalEmail: true,
      password: "",
    };
  }
  validateField = (field, value, context) => {
    const validationResponse = new ValidationResponse();

    switch (field) {
      case "email":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.EMAIL_REQUIRED;
        } else {
          if (!validateEmailPattern(value)) {
            validationResponse.isValid = false;
            validationResponse.message = ErrorMessages.EMAIL_INVALID;
          } else {
            let EmailData = {
              email: value,
            };
            ApiRequest.request(EMAIL_ALLOWED, "POST", EmailData).then((res) => {
              if (res.status) {
                this.state.legalEmail = true;
              } else {
                this.state.legalEmail = false;
              }
            });

            if (!this.state.legalEmail) {
              validationResponse.isValid = false;
              validationResponse.message = ErrorMessages.EMAIL_NOT_ACCEPT;
            }
          }
        }
        break;
      case "name":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.NAME_REQURIED;
        } else {
          if (!namePattern(value)) {
            validationResponse.isValid = false;
            validationResponse.message = ErrorMessages.NAME_PATTERN;
          }
        }
        break;

      case "setpassword":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
        } else if (value.length < PASSWORD_MIN_LENGTH) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_MIN;
        } else if (passwordPattern(value)) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_PATTERN;
        } else if (value) {
          this.state.password = value;
        }
        break;
      case "confirmpassword":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
        } else if (value.length < PASSWORD_MIN_LENGTH) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_MIN;
        } else if (this.state.password !== value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_MATCH;
        }
        break;

      default:
        break;
    }
    return validationResponse;
  };
}

export class ForgotValidation extends Validation {
  validateField = (field, value) => {
    const validationResponse = new ValidationResponse();

    switch (field) {
      case "email":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.EMAIL_REQUIRED;
        } else {
          if (!validateEmailPattern(value)) {
            validationResponse.isValid = false;
            validationResponse.message = ErrorMessages.EMAIL_INVALID;
          }
        }
        break;
      default:
      // break;
    }
    return validationResponse;
  };
}

export class ResetPassword extends Validation {
  validateField = (field, value, context) => {
    const validationResponse = new ValidationResponse();

    switch (field) {
      case "setPassword":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
        } else if (value.length < PASSWORD_MIN_LENGTH) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_MIN;
        } else if (passwordPattern(value)) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_PATTERN;
        }
        break;
      case "confirmPassword":
        if (!value) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
        } else if (value.length < PASSWORD_MIN_LENGTH) {
          validationResponse.isValid = false;
          validationResponse.message = ErrorMessages.PASSWORD_MIN;
        }
        break;

      default:
        break;
    }
    return validationResponse;
  };
}
