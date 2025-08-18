import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useUser } from '../../contexts/UserContext';

// Logger function
const logger = (message) => {
  console.error(message);
};

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      logger('User not set. Please log in to view your profile.');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <div className="text-center text-red-600 font-semibold mb-4">
              Please log in to view your profile.
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/login')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Profile</h1>
          <div className="text-lg mb-4">
            <div className="flex items-center mb-4">
              <label className="block text-gray-700 font-semibold mr-2" htmlFor="username">
                Username:
              </label>
              <div
                id="username"
                className="flex-grow px-3 py-2 border rounded bg-gray-100 text-gray-800"
              >
                {user}
              </div>
            </div>
            {/* Add more fields here as necessary */}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
