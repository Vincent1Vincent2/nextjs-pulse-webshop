// UserContext.tsx
'use client';
import { authenticateUser } from '@/app/actions/authenticate';
import { AuthUser } from '@/components/header/Header';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function fetchAuth() {
      const userAuthenticated = await authenticateUser();
      setUser(userAuthenticated);
    }
    fetchAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
