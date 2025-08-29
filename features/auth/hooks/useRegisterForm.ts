import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { registerSchema } from "@/features/auth/validators";

// TODO
// 1. Forward errors to toast stack

interface RegisterFormFields {
    email: string;
    password: string;
    confirmPassword: string;
}

const useRegisterForm = (delay = 300) => {
    const [form, setForm] = useState<RegisterFormFields>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<RegisterFormFields>>({});

    const debouncedValidation = useRef(
        debounce(
            async (
                field: keyof RegisterFormFields,
                value: string,
                fullForm: RegisterFormFields
            ) => {
                try {
                    await registerSchema.validateAt(field, { ...fullForm, [field]: value });
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
        (field: keyof RegisterFormFields, value: string) => {
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

    const setPassword = useCallback(
        (password: string) => updateField("password", password),
        [updateField]
    );

    const setConfirmPassword = useCallback(
        (password: string) => updateField("confirmPassword", password),
        [updateField]
    );

    const handleRegister = useCallback(async () => {
        try {
            await registerSchema.validate(form, { abortEarly: false });
            setErrors({}); // clear errors
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<RegisterFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof RegisterFormFields] = e.message;
                });

                setErrors(newErrors);
            }

            // TODO (1)
        }
    }, [form]);

    return { form, errors, setEmail, setPassword, setConfirmPassword, handleRegister };
};

export default useRegisterForm;
