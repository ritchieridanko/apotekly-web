import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { loginSchema } from "@/features/auth/validators";

// TODO
// 1. Forward errors to toast stack

interface LoginFormFields {
    email: string;
    password: string;
}

const useLoginForm = (delay = 300) => {
    const [form, setForm] = useState<LoginFormFields>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<LoginFormFields>>({});

    const debouncedValidation = useRef(
        debounce(
            async (
                field: keyof LoginFormFields,
                value: string,
                fullForm: LoginFormFields
            ) => {
                try {
                    await loginSchema.validateAt(field, { ...fullForm, [field]: value });
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
        (field: keyof LoginFormFields, value: string) => {
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

    const handleLogin = useCallback(async () => {
        try {
            await loginSchema.validate(form, { abortEarly: false });
            setErrors({}); // clear errors
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<LoginFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof LoginFormFields] = e.message;
                });

                setErrors(newErrors);
            }

            // TODO (1)
        }
    }, [form]);

    return { form, errors, setEmail, setPassword, handleLogin };
};

export default useLoginForm;
