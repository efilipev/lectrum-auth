import * as yup from "yup";

export const logInForm = yup.object().shape({
    email: yup.string().email("Invalid email address").min(2).max(30).required("Email address is required field"),
    password: yup
        .string()
        .required("Required")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[@$!%*#?&^-]).{12,}$/, "Invalid password")
});
