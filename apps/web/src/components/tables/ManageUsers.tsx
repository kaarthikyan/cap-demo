'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';

import Badge from '../ui/badge/Badge';
import Image from 'next/image';
import { User, useUser } from '@/context/UserContext';
import Button from '../ui/button/Button';
import { useRouter } from 'next/navigation';

export default function ManageUsersTable() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [userIdToUpdateRole, setUserIdToUpdateRole] = useState<string>('');

  const { user, updateUserContext } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        console.log('Users', data.users);
        setUsers(data.users || []);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userIdToUpdateRole]);

  const updateAccess = async (userId: string, newRole: string) => {
    setUserIdToUpdateRole(userId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId, newRole }),
      });

      if (res.ok) {
        const updated = await res.json();
        if (user?.id === userId && newRole === 'user') {
          updateUserContext(updated);
          router.replace('/');
        }
      } else {
        alert('Failed to update access.');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUserIdToUpdateRole('');
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[961px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  State, Country
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Manage Access
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {!loading && users.length
                ? users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={user?.image || ''}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {`${user.firstName} ${user.lastName}`}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {user.designation}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {`${user.state}, ${user.country}`}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge size="sm" color={user.role === 'admin' ? 'success' : 'warning'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {userIdToUpdateRole === user.id ? (
                        'updating access...'
                      ) : user.role === 'admin' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateAccess(user.id, 'user')}
                        >
                          Remove Access
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => updateAccess(user.id, 'admin')}
                        >
                          Grant Access
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
                : null}
            </TableBody>
          </Table>
          {loading && (
            <div className="px-105 py-35 text-gray-500 dark:text-gray-400">Loading users...</div>
          )}
        </div>
      </div>
    </div>
  );
}
