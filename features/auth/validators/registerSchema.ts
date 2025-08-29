import * as yup from "yup";

import { confirmPasswordValidator, emailValidator, passwordValidator } from "@/utils/validator";

const registerSchema = yup.object({
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
});

export default registerSchema;
