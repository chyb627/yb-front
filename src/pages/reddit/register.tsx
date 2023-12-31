import { FormEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import InputGroup from '@/components/reddit/InputGroup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuthState } from '@/context/reddit/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();
  const router = useRouter();

  if (authenticated) router.push('/reddit');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      // onSubmit event가 일어나면 페이지에 refresh가 일어나는데 preventDefault가 그 동작을 막아준다.
      e.preventDefault();

      try {
        const res = await axios.post('/auth/register', {
          email,
          username,
          password,
        });

        console.log('res', res);
        router.push('/reddit/login');
      } catch (error: any) {
        console.log('error', error);
        setErrors(error?.response.data || {});
      }
    },
    [email, password, router, username],
  );

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96 flex flex-col items-center">
          <h1 className="mb-2 text-lg font-medium">회원가입</h1>

          <form onSubmit={handleSubmit}>
            <InputGroup placeholder="Email" value={email} setValue={setEmail} error={errors.email} />
            <InputGroup placeholder="Username" value={username} setValue={setUsername} error={errors.username} />
            <InputGroup placeholder="Password" value={password} setValue={setPassword} error={errors.password} />

            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원 가입
            </button>
          </form>
        </div>

        <small>
          이미 가입하셨나요?
          <Link href="/reddit/login">
            <span className="ml-1 text-blue-500 uppercase">로그인</span>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Register;
