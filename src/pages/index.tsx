import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/reddit/login">
        <p>Reddit</p>
      </Link>
    </div>
  );
}
