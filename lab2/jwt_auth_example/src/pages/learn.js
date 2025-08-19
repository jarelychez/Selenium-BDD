import Header from '../components/Header';

export default function Learn() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Learn More About MyApp</h1>
          <p className="text-lg text-gray-700 mb-8">
            MyApp is designed to help you manage your profile efficiently. Here are some key features and how we use cookies to enhance your experience.
          </p>
          <div className="text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Features:</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-8">
              <li>Profile management</li>
              <li>Secure login and authentication</li>
              <li>User-friendly interface</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Use of Cookies:</h2>
            <p className="text-lg text-gray-700 mb-8">
              We use cookies to improve your experience on our site. Here’s how:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-8">
              <li>
                <strong>Authentication:</strong> Cookies help us keep you logged in and maintain your session, so you don’t have to log in repeatedly.
              </li>
              <li>
                <strong>Security:</strong> Cookies are used to enhance the security of our site by preventing unauthorized access.
              </li>
              <li>
                <strong>User Preferences:</strong> Cookies help us remember your preferences and settings to provide a personalized experience.
              </li>
            </ul>
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Go Back Home
            </a>
            <a
              href="/profile"
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Go to Profile
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
