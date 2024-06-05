import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined)
  const { dispatch } = useAuthContext()

  const signup = async (email: string, password: string, name: string, surname: string) => {
    setIsLoading(true)
    setError(null)

    if (email.length !== 0 || password.length !== 0
      || name.length !== 0 || surname.length !== 0) {
      const data = {
          email: email,
          password: password,
          name: name,
          surname: surname
      };
      axios.post(process.env.REACT_APP_API_ADDRESS + "/auth/register", data).then((response: any) => {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("email", data.email);
        
        dispatch({type: 'LOGIN', payload: response})
        setIsLoading(false)
      }).catch((err) => {
          console.error(err);
      });
    }
  }

  return { signup, isLoading, error }
}