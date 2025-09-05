import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ValidationError } from "yup";

import { ROUTES } from "@/constants";
import { useLoginMutation } from "@/features/auth/services";
import { setCredentials } from "@/features/auth/slices/authSlice";
import { loginSchema } from "@/features/auth/validators";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";

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
    const { isLoading } = useAppSelector((state) => state.auth);

    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

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

            const response = await login(form).unwrap();
            dispatch(setCredentials(response));

            router.replace(ROUTES.HOME);
        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Partial<LoginFormFields> = {};

                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path as keyof LoginFormFields] = e.message;
                });

                setErrors(newErrors);
            } else {
                const errResponse = err as RTKErrorResponse;
                console.log("Login failed:", errResponse.data?.message ?? "Unknown error"); // TODO (1)
            }
        }
    }, [form, login, dispatch, router]);

    return { form, errors, setEmail, setPassword, isLoading, handleLogin };
};

export default useLoginForm;
