import * as yup from "yup";

import { emailValidator } from "@/utils/validator";

const forgotPasswordSchema = yup.object({
    email: emailValidator,
});

export default forgotPasswordSchema;
