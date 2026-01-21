'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCookie } from 'next-cookie';
import AxiosToastError from '@/utils/AxiosToastError';
import LogOut from '@/components/LogOut';

export default function LogOutButton() {
  const router = useRouter();
  const cookies = useCookie();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      cookies.remove('jwtToken');
      router.push('/login');
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <LogOut />
    </div>
  );
}
