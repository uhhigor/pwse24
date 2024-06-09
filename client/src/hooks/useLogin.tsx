import { useState } from 'react';
import axios from 'axios';
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/login", { email, password });
            localStorage.setItem("user", JSON.stringify({"email": response.data.email, "role": response.data.role, "id": response.data._id}));
            localStorage.setItem("email", email);
            dispatch({type: 'LOGIN', payload: response});
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
