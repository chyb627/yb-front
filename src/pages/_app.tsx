import NavBar from '@/components/reddit/NavBar';
import { AuthProvider } from '@/context/reddit/auth';
import '@/styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.BASE_URL + '/api';
  axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ['/reddit/register', '/reddit/login', '/'];
  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!authRoute && <NavBar />}

      <div className={authRoute ? '' : 'pt-48'}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
