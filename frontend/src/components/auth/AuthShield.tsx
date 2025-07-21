
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores/authStore';

const PUBLIC_ROUTES = ['/login', '/register'];

const AuthShield = ({ children } : { children: React.ReactNode }) => {
  const { setUser, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [ shouldRender, setShouldRender ] = useState(false);

  const isValidToken = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      return Date.now() < exp;
    } catch (error) {
      return false;
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(currentPath);

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (token) {
      if (isValidToken(token)) {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(user, token);
        setShouldRender(true);
      } else {
        clearUser();
        if (!isPublicRoute) {
          navigate('/login', { state: { from: location } });
        }
      }
    } else if (!isPublicRoute) {
      clearUser();
      navigate('/login', { state: { from: location } });
    } else {
      setShouldRender(true);
    }
  }, [location.pathname]);

  return (
    <>{shouldRender ? children : null}</>
  )
};

export default AuthShield;
