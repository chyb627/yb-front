import { AuthProvider } from '@/context/reddit/auth';
import '@/styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.BASE_URL + '/api';

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
