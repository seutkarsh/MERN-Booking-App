import { check } from 'express-validator'

enum Errors {
    NAME_REQUIRED = 'Name is required',
    CITY_REQUIRED = 'City is required',
    COUNTRY_REQUIRED = 'Country is required',
    DESCRIPTION_REQUIRED = 'Description is required',
    TYPE_REQUIRED = 'Type is required',
    PRICE_PER_NIGHT_REQUIRED = 'Price per night is required and must be a number',
    FACILITIES_REQUIRED = 'Facilities required',
}
export const addHotelValidators = [
    check('name', Errors.NAME_REQUIRED).isString().notEmpty(),
    check('city', Errors.CITY_REQUIRED).isString().notEmpty(),
    check('country', Errors.COUNTRY_REQUIRED).isString().notEmpty(),
    check('description', Errors.DESCRIPTION_REQUIRED).isString().notEmpty(),
    check('type', Errors.TYPE_REQUIRED).isString().notEmpty(),
    check('pricePerNight', Errors.PRICE_PER_NIGHT_REQUIRED)
        .notEmpty()
        .isNumeric(),
    check('facilities', Errors.FACILITIES_REQUIRED).notEmpty().isArray(),
]
