// components/Header.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../contexts/UserContext';

const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost';
console.log(`domain=${domain}`);

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useUser();
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  useEffect(() => {
    const token = cookies.auth;

    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      console.log(`decodedToken=${JSON.stringify(decodedToken)}`)
      setUser(decodedToken.username);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [router.pathname, cookies, setUser]);

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      removeCookie('auth', { path: '/', domain });
      setIsLoggedIn(false);
      setUser(null);
      router.push('/login');
    } else {
      console.error('Failed to logout');
    }
  };

  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">MyApp <span className="mr-4">{user ? `Welcome, ${user}` : ''}</span></div>
        <div>
          <Link className="mr-4" href="/" passHref>
            Home
          </Link>
          <Link className="mr-4" href="/profile" passHref>
            Profile
          </Link>
          {isLoggedIn ? (
            <>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
                className="mr-4"
              href="/login"
              passHref
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
