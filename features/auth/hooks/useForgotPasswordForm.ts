import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { ROUTES } from "@/constants";
import { useForgotPasswordMutation } from "@/features/auth/services";
import { forgotPasswordSchema } from "@/features/auth/validators";
import { useAppSelector } from "@/stores/hooks";

// TODO
// 1. Forward errors to toast stack
// 2. Forward success message to toast stack

interface ForgotPasswordFormFields {
    email: string;
};

const useForgotPasswordForm = (delay = 300) => {
    const [form, setForm] = useState<ForgotPasswordFormFields>({ email: "" });
    const [errors, setErrors] = useState<Partial<ForgotPasswordFormFields>>({});
    const { isLoading } = useAppSelector((state) => state.auth);

    const [forgotPassword] = useForgotPasswordMutation();
    const router = useRouter();

    const debouncedValidation = useRef(
        debounce(
            async (
                field: keyof ForgotPasswordFormFields,
                value: string,
                fullForm: ForgotPasswordFormFields
            ) => {
                try {
                    await forgotPasswordSchema.validateAt(field, { ...fullForm, [field]: value });
                    setErrors((prev) => ({ ...prev, [field]: undefined }));
                } catch (err) {
                    if (err instanceof ValidationError) {
                        setErrors((prev) => ({ ...prev, [field]: err.message }));
                    }
                }
            },
            delay
        )
    ).current;

    const updateField = useCallback(
        (field: keyof ForgotPasswordFormFields, value: string) => {
            setForm((prev) => {
                const updated = { ...prev, [field]: value };
                debouncedValidation(field, value, updated);
                return updated;
            });
        },
        [debouncedValidation]
    );

    const setEmail = useCallback(
        (email: string) => updateField("email", email),
        [updateField]
    );

    const handleForgotPassword = useCallback(async () => {
        try {
            await forgotPasswordSchema.validate(form, { abortEarly: false });
            setErrors({}); // clear errors

            const response = await forgotPassword(form).unwrap();
            // TODO (2)

            router.push(ROUTES.AUTH.LOGIN);
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<ForgotPasswordFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof ForgotPasswordFormFields] = e.message;
                });

                setErrors(newErrors);
            } else {
                const errResponse = err as RTKErrorResponse;
                console.log("Request forgot password failed:", errResponse.data?.message ?? "Unknown error"); // TODO (1)
            }
        }
    }, [form, forgotPassword, router]);

    return { form, errors, setEmail, isLoading, handleForgotPassword };
};

export default useForgotPasswordForm;