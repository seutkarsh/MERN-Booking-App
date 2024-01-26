import { check } from 'express-validator'

enum Errors {
    FIRSTNAME_REQUIRED = 'First Name is Required',
    LASTNAME_REQUIRED = 'Last Name is Required',
    EMAIL_REQUIRED = 'Email is Required',
    PASSWORD_LENGTH = 'Password with 6 or more characters is Required',
}
export const userRegistrationValidator = [
    check('firstName', Errors.FIRSTNAME_REQUIRED).isString(),
    check('lastName', Errors.LASTNAME_REQUIRED).isString(),
    check('email', Errors.EMAIL_REQUIRED).isEmail(),
    check('password', Errors.PASSWORD_LENGTH).isLength({ min: 6 }),
]

export const userLoginValidator = [
    check('email', Errors.EMAIL_REQUIRED).isEmail(),
    check('password', Errors.PASSWORD_LENGTH).isLength({ min: 6 }),
]
