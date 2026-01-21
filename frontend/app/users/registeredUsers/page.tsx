"use client";

import { useState, useEffect } from 'react';
import UsersHeader from '@/components/UsersHeader';
import UsersStats from '@/components/Userstats';
import UsersTable from '@/components/Userstable';
import axios from 'axios';
import AxiosToastError from '@/utils/AxiosToastError';
import { useCookie } from 'next-cookie';


type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'inactive';
};

type RegisteredUsersData = {
  users: User[];
};

export default function RegisteredUsersPage() {
  const cookies = useCookie();
  const token = cookies.get('jwtToken');
  const [data, setData] = useState<RegisteredUsersData>({
    users: [],
  });


async function fetchRegisteredUsers() {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/users',
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const rawUsers = response?.data?.data; 
    setData({
      users: rawUsers.map((user: any) => ({
        id: user.id,
        fullName: user.fullName, 
        email: user.email,
        role: user.role || 'user',
        avatar: user.avatar || '',
        status: user.status || 'active',
      })),
    });
  } catch (error) {
    AxiosToastError(error);
  }
}

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <UsersHeader />
      <div className="container mx-auto px-6 py-8">
        <div className="">
          <UsersTable users={data.users} />
        </div>
      </div>
    </div>
  );
}
