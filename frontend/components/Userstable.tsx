'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';


type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'inactive';
  createdAt?: string;
}

type UsersTableProps = {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {

  const [userList, setUserList] = useState<User[]>(users);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredUsers = userList.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  useEffect(() => {
    setUserList(users);
  }, [users]);


    const handleStatusToggle = async (
    userId: number,
    currentStatus: 'active' | 'inactive'
  ) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setUserList(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/${userId}/status`,
        { status: newStatus }
      );

      toast.success(`User marked as ${newStatus}`);
    } catch (error) {
      setUserList(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, status: currentStatus } : user
        )
      );

      toast.error('Failed to update user status');
    }
  };

    


  return (
    <div className="card bg-white shadow-lg">
      <div className="card-body">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="form-control flex-1">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control w-full lg:w-48">
            <select
              className="select select-bordered w-full"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option>All</option>
              <option>jobseeker</option>
              <option>employee</option>
              <option>agency</option>
            </select>
          </div>

          <div className="form-control w-full lg:w-48">
            <select
              className="select select-bordered w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className='bg-black text-white'>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='custom-zebra text-black'>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover">
                  <td className="font-mono text-sm">{user.id}</td>
                  
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 flex justify-center items-center rounded-full ring ring-primary ring-offset-2">
                           <img
                            src={
                              user.avatar ? user.avatar
                                : '/jobLogo.png'
                            }
                            alt={user.fullName}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.fullName}</div>
                      </div>
                    </div>
                  </td>

                  <td className="text-slate-700">{user.email}</td>

                  <td>
                    <span className={`badge text-xs badge-lg`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <label className="cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={user.status === 'active'}
                        onChange={() => handleStatusToggle(user.id, user.status)}
                      />
                      <span className='text-sm font-medium'>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No users found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}