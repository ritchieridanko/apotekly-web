import * as yup from "yup";

import { confirmPasswordValidator, passwordValidator } from "@/utils/validator";

const resetPasswordSchema = yup.object({
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
});

export default resetPasswordSchema;
