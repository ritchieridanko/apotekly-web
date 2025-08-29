import * as yup from "yup";

import { emailValidator } from "@/utils/validator";

const loginSchema = yup.object({
    email: emailValidator,
    password: yup.string().required("Password is required"),
});

export default loginSchema;
