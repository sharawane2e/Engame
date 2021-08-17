import ValidationRegex from "../constants/ValidationRegex";
import { ErrorMessages } from "../constants/Messages";
import { PASSWORD_MIN_LENGTH } from "../constants/ConstantValues";

const validateEmailPattern = (email) => ValidationRegex.EMAIL.test(email);

class ValidationResponse {
    isValid = true;
    message = "";
}

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
                    validationResponse.message = ErrorMessages.EMAIL_INVALID;
                } else {
                    if (!validateEmailPattern(value)) {
                        validationResponse.isValid = false;
                        validationResponse.message = ErrorMessages.EMAIL_INVALID;
                    }
                }
                break;
            case "password":
                // if (value) {
                //     validationResponse.isValid = false;
                //     validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
                // }
                 if (value.length < PASSWORD_MIN_LENGTH) {
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

export class UserValidation extends Validation {
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
                    }
                }
                break;
            case "name":
                if (!value) {
                    validationResponse.isValid = false;
                    validationResponse.message = ErrorMessages.NAME_REQURIED;
                }
                break;

            case "setpassword":
                if (!value) {
                    validationResponse.isValid = false;
                    validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
                }
                else if (value.length < PASSWORD_MIN_LENGTH) {
                  validationResponse.isValid = false;
                  validationResponse.message = ErrorMessages.PASSWORD_MIN;
                }
                break;
            case "confirmpassword":
                if (!value) {
                    validationResponse.isValid = false;
                    validationResponse.message = ErrorMessages.PASSWORD_REQUIRED;
                }

                else if (value.length < PASSWORD_MIN_LENGTH) {
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

export class ForgotValidation extends Validation {

    validateField = (field, value) => {
        const validationResponse = new ValidationResponse();

        switch (field) {
            case "email":
                if (!value) {
                    validationResponse.isValid = false;
                    validationResponse.message = ErrorMessages.EMAIL_INVALID;
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