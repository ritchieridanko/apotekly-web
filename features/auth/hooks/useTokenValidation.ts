import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useValidateResetTokenMutation } from "@/features/auth/services";

const useTokenValidation = () => {
    const searchParams = useSearchParams();
    const urlToken: string | null = searchParams.get("token");

    const [token, setToken] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [validateResetToken, { isLoading: isValidating }] = useValidateResetTokenMutation();

    useEffect(() => {
        const validateToken = async () => {
            const resetToken: string | null = urlToken || sessionStorage.getItem("resetToken");

            if (!resetToken) {
                setIsValid(false);
                return;
            }

            try {
                const response = await validateResetToken({ token: resetToken }).unwrap();

                if (response.data.is_valid) {
                    setToken(resetToken);
                    setIsValid(true);
                    sessionStorage.setItem("resetToken", resetToken);

                    // Clean the token from URL
                    window.history.replaceState({}, "", window.location.pathname);
                } else {
                    setIsValid(false);
                }
            } catch {
                setIsValid(false);
            }
        };

        validateToken();
    }, [urlToken, validateResetToken]);

    return { token, isValid, isValidating };
};

export default useTokenValidation;