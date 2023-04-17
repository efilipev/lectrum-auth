import * as yup from "yup";

const hasNumber = (password: string): boolean => new RegExp(/[0-9]/).test(password);

const hasMixedCapitals = (password: string): boolean =>
    new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);

const hasSpecialCharacter = (password: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(password);

export const hasNumberValidation: yup.TestConfig = {
    name: "hasNumber",
    message: "Must contain a number",
    test: hasNumber
};

export const hasMixedCapitalsValidation: yup.TestConfig = {
    name: "hasMixedCapitals",
    message: "Must contain a mixed capitals",
    test: hasMixedCapitals
};

export const hasSpecialCharacterValidation: yup.TestConfig = {
    name: "hasSpecialCharacter",
    message: "Must contain a special character",
    test: hasSpecialCharacter
};

export const strengthPasswordIndicator = (password: string): { label: string; color: string } => {
    if (!password.length) return { label: "Poor", color: "error.main" };

    let strengths = 0;
    if (password.length > 5) strengths += 1;
    if (password.length > 7) strengths += 1;
    if (hasNumber(password)) strengths += 1;
    if (hasSpecialCharacter(password)) strengths += 1;
    if (hasMixedCapitals(password)) strengths += 1;

    if (strengths < 2) return { label: "Poor", color: "error.main" };
    if (strengths < 3) return { label: "Weak", color: "warning.main" };
    if (strengths < 4) return { label: "Normal", color: "warning.dark" };
    if (strengths < 5) return { label: "Good", color: "success.main" };
    if (strengths < 6) return { label: "Strong", color: "success.dark" };
};

export const signUpSchemaValidator = yup.object().shape({
    name: yup.string().required("Invalid display name").required("Name is required field"),
    email: yup.string().email("Invalid email address").min(2).max(30).required("Email address is required field"),
    password: yup
        .string()
        .required("Password is required field")
        .test(hasNumberValidation)
        .test(hasMixedCapitalsValidation)
        .test(hasSpecialCharacterValidation)
});
