import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main
        className={`flex-grow flex flex-col items-center justify-center p-6 ${inter.className}`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to MyApp!</h1>
          <p className="text-lg text-gray-700 mb-8">
            Your one-stop solution for managing your profile and more.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/profile"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Go to Profile
            </a>
            <a
              href="/learn"
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-12">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        </div>
      </main>
    </div>
  );
}
