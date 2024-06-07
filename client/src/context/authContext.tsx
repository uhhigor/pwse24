import React, { Dispatch, ReactNode } from 'react'
import { createContext, useReducer, useEffect } from 'react'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface State {
  user: any | null;
}

interface Action {
  type: string;
  payload: any;
}

interface AuthContextProps {
  state: State;
  dispatch: Dispatch<Action>;
  updateUserToken: (newToken: string) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_TOKEN':
      return { user: {...state.user, token: action.payload } }
    default:
      return state
  }
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  const checkTokenExpiration = (token: any) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp! < currentTime) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return true;
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      if (checkTokenExpiration(token)) {
        Cookies.remove('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
      } else {
        try {
          const decodedToken = jwtDecode(token);
          dispatch({ type: 'LOGIN', payload: { ...decodedToken, token } });
        } catch (error) {
          console.error('Invalid token:', error);
          Cookies.remove('token');
          localStorage.removeItem('user');
          localStorage.removeItem('email');
        }
      }
    }
  }, []);

  const updateUserToken = (newToken: string) => {
    Cookies.set('token', newToken)
    try {
      const decodedToken = jwtDecode(newToken)
      dispatch({ type: 'UPDATE_TOKEN', payload: newToken })
      dispatch({ type: 'LOGIN', payload: { ...decodedToken, token: newToken } })
    } catch (error) {
      console.error('Invalid token:', error)
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, updateUserToken }}>
      {children}
    </AuthContext.Provider>
  )
}