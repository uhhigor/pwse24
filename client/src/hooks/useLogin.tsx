import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined)
  const { dispatch } = useAuthContext()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    if (email.length !== 0 || password.length !== 0) {
      const data = {
          email: email,
          password: password
      };
      axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/login", data)
          .then((response: any) => {
            localStorage.setItem("user", JSON.stringify({"email": response.data.email, "role": response.data.role}));
            localStorage.setItem("email", data.email);
            dispatch({type: 'LOGIN', payload: response});
            setIsLoading(false);
          }).catch((err) => {
          console.error(err);
      });
    }
  }

  return { login, isLoading, error }
}