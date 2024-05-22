// 'use client';
// import { authenticateUser } from '@/app/actions/authenticate';
// import { useEffect, useState } from 'react';
// import AdminHeader from './AdminHeader';
// import GuestHeader from './GuestHeader';
// import UserHeader from './UserHeader';

// export interface AuthUser {
//   id: number;
//   firstName: string | null;
//   admin: boolean | null;
// }

// export default function Header() {
//   const [user, setUser] = useState<AuthUser | null>();

//   useEffect(() => {
//     async function fetchAuth() {
//       const user = await authenticateUser();
//       setUser(user);
//     }
//     fetchAuth();
//   }, []);

//   if (!user || user === null) {
//     return <GuestHeader />;
//   }

//   if (user && !user.admin) {
//     return <UserHeader />;
//   }

//   if (user && user.admin) {
//     return <AdminHeader />;
//   }
// }
