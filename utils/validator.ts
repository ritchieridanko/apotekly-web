import * as yup from "yup";

export const emailValidator = yup
    .string()
    .required("Email is required")
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
    );

export const passwordValidator = yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password is too long")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
    );

export const confirmPasswordValidator = yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match");
