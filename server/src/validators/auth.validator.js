import {body, validationResult} from "express-validator";


export const registerValidator = [
    body("email")
    .exists().withMessage("Email is required").bail()
    .isEmail().withMessage("Enter valaid email address")
    .trim(),
    body("name")
    .exists().withMessage("name is required").bail()
    .isString().withMessage("Name must be a string")
    .trim()
    .isLength({min:2 , max:50}).withMessage("name must be between 2 to 50 charcters"),

    body("passwordHash")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Name must be a string")
    .trim()
    .isLength({min:6}).withMessage("name must be atlest 6 charcters long"),

    (req , res , next) =>{
        const errors = validationResult(req) 

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalaid Request",
                errors:errors.array()
            })
        }

        next()
    }
]


export const loginValidator = [
    body("email")
        .exists().withMessage("Email is Required").bail()
        .isString().withMessage("Email must be a String Value").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a String value").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password at least 6 character long"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()
            })
        }

        next()

    }

]