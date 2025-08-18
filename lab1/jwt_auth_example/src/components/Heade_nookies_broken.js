import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'http://localhost:3000'; // Set your domain here

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = parseCookies(null, { domain });
    console.log('Cookies:', cookies);  // Debugging
    const token = cookies.auth || '';



    setIsLoggedIn(!!cookies.auth);
  }, [router.pathname]);  // Adding router.pathname to ensure the useEffect runs on route change

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      destroyCookie(null, 'auth');
      setIsLoggedIn(false);
      router.push('/login');
    } else {
      console.error('Failed to logout');
    }
  };

  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">MyApp</div>
        <div>
          <Link className="mr-4" href="/">
            Home
          </Link>
          <Link className="mr-4" href="/profile">
            Profile
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
