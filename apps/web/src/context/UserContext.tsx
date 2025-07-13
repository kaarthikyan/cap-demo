'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  image?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  designation?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  taxID?: string;
  phone?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
  insta?: string;
  bio?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  updateUserContext: (updatedUser: Partial<User>) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  updateUserContext: () => null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const updateUserContext = (updatedUser: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...updatedUser } : null));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(prev => (prev ? { ...prev, ...data.user } : { ...data.user }));
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
