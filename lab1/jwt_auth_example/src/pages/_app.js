import "@/styles/globals.css";
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from '../contexts/UserContext';

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </CookiesProvider>
  );
}
