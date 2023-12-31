import Link from 'next/link';
import useSWR from 'swr';
import { Sub } from '@/types/reddit/types';
import axios from 'axios';
import Image from 'next/image';
import { useAuthState } from '@/context/reddit/auth';

const Reddit = () => {
  const { authenticated } = useAuthState();
  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const address = 'http://localhost:8000/api/subs/sub/topSubs';
  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);
  console.log('topSubs', topSubs);

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* 포스트 리스트 */}
      <div className="w-full md:mr-3 md:w-8/12"></div>

      {/* 사이드 바 */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="bg-white border rounded">
          <div className="p-16 border-b">
            <p className="text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>

          {/* 커뮤니티 리스트 */}
          <div>
            {topSubs?.map((sub) => (
              <div key={sub.name} className="flex items-center px-4 py-2 text-xs border-b">
                <Link href={`/reddit/r/${sub.name}`}>
                  <Image src={sub.imageUrl} className="rounded-full cursor-pointer" alt="Sub" width={24} height={24} />
                </Link>

                <Link href={`/reddit/r/${sub.name}`} className="ml-2 font-bold hover:cursor-pointer">
                  /reddit/r/{sub.name}
                </Link>

                <p className="ml-auto">{sub.postCount}</p>
              </div>
            ))}
          </div>

          {authenticated && (
            <div className="w-full py-16 text-center">
              <Link href="/reddit/subs/create" className="w-full p-2 text-center text-white bg-gray-400 rounded">
                커뮤니티 만들기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reddit;
