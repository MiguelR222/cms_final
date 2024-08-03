import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md mb-6">
      <div className="flex space-x-4">
        <Link href="/" passHref>
          <div className="relative text-blue-600 font-bold hover:text-blue-900 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
            Home
          </div>
        </Link>
        <Link href="/dashboard" passHref>
          <div className="relative text-blue-600 font-bold hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
            Dashboard
          </div>
        </Link>
        <Link href="/template" passHref>
          <div className="relative text-blue-600 font-bold hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
            Template
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {session && (
          <>
            <div className="text-right">
              <p className="font-bold text-blue-600">{session.user.name}</p>
              <p className="text-sm text-blue-400">{session.user.email}</p>
            </div>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-400 transition transform hover:scale-105 hover:rotate-3"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;