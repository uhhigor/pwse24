import Cookies from 'js-cookie';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    Cookies.remove('token');

    dispatch({ type: 'LOGOUT', payload: null });
  }

  return { logout }
}