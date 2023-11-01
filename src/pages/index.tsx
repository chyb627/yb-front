import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/reddit">
        <p>Reddit</p>
      </Link>
    </div>
  );
}
