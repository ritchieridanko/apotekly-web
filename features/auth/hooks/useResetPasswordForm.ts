import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { ROUTES } from "@/constants";
import { useResetPasswordMutation } from "@/features/auth/services";
import { resetPasswordSchema } from "@/features/auth/validators";

// TODO
// 1. Forward errors to toast stack
// 2. Forward success message to toast stack

interface ResetPasswordFormFields {
    password: string;
    confirmPassword: string;
};

const useResetPasswordForm = (delay = 300) => {
    const [form, setForm] = useState<ResetPasswordFormFields>({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState<Partial<ResetPasswordFormFields>>({});

    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const router = useRouter();

    const debouncedValidation = useRef(
        debounce(
            async (
                field: keyof ResetPasswordFormFields,
                value: string,
                fullForm: ResetPasswordFormFields
            ) => {
                try {
                    await resetPasswordSchema.validateAt(field, { ...fullForm, [field]: value });
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
        (field: keyof ResetPasswordFormFields, value: string) => {
            setForm((prev) => {
                const updated = { ...prev, [field]: value };
                debouncedValidation(field, value, updated);
                return updated;
            });
        },
        [debouncedValidation]
    );

    const setPassword = useCallback(
        (password: string) => updateField("password", password),
        [updateField]
    );

    const setConfirmPassword = useCallback(
        (password: string) => updateField("confirmPassword", password),
        [updateField]
    );

    const handleResetPassword = useCallback(async (token: string | null) => {
        try {
            await resetPasswordSchema.validate(form, { abortEarly: false });
            setErrors({}); // clear errors

            const response = await resetPassword({ token: token ?? "", new_password: form.password }).unwrap();
            // TODO (2)

            router.replace(ROUTES.AUTH.LOGIN);
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<ResetPasswordFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof ResetPasswordFormFields] = e.message;
                });

                setErrors(newErrors);
            } else {
                const errResponse = err as RTKErrorResponse;
                console.log("Reset password failed:", errResponse.data?.message ?? "Unknown error"); // TODO (1)
            }
        }
    }, [form, resetPassword, router]);

    return { form, errors, setPassword, setConfirmPassword, isLoading, handleResetPassword };
};

export default useResetPasswordForm;