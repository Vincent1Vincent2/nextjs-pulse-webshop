import { auth } from '@/auth';
import Header from './Header';

export default async function Navbar() {
  const session = await auth();

  return <Header session={session} />;
}
