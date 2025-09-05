import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { ROUTES } from "@/constants";
import { useRegisterMutation } from "@/features/auth/services";
import { setCredentials } from "@/features/auth/slices/authSlice";
import { registerSchema } from "@/features/auth/validators";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

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
    const { isLoading } = useAppSelector((state) => state.auth);

    const [register] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

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

            const response = await register(form).unwrap();
            dispatch(setCredentials(response));

            router.replace(ROUTES.HOME);
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<RegisterFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof RegisterFormFields] = e.message;
                });

                setErrors(newErrors);
            } else {
                const errResponse = err as RTKErrorResponse;
                console.log("Registration failed:", errResponse.data?.message ?? "Unknown error"); // TODO (1)
            }
        }
    }, [form, register, dispatch, router]);

    return { form, errors, setEmail, setPassword, setConfirmPassword, isLoading, handleRegister };
};

export default useRegisterForm;
