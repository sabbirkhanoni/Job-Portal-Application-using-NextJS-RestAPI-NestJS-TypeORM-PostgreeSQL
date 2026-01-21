import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
  fullName: string;
  avatar?: string;
}

export const getUserFromToken = (token: string | undefined): JwtPayload | null => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};