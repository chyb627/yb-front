import { FormEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import InputGroup from '@/components/reddit/InputGroup';
import axios from 'axios';
import { useAuthDispatch, useAuthState } from '@/context/reddit/auth';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  if (authenticated) router.push('/reddit');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      // onSubmit event가 일어나면 페이지에 refresh가 일어나는데 preventDefault가 그 동작을 막아준다.
      e.preventDefault();

      try {
        const res = await axios.post('/auth/login', { password, email }, { withCredentials: true });
        console.log('res', res);
        dispatch('LOGIN', res.data?.user);
        router.push('/reddit');
      } catch (error: any) {
        console.log(error);
        setErrors(error.response?.data || {});
      }
    },
    [dispatch, email, password, router],
  );

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96 flex flex-col items-center">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>

          <form onSubmit={handleSubmit}>
            <InputGroup placeholder="Email" value={email} setValue={setEmail} error={errors.email} />
            <InputGroup placeholder="Password" value={password} setValue={setPassword} error={errors.password} />

            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              로그인
            </button>
          </form>
        </div>

        <small>
          아직 아이디가 없나요?
          <Link href="/reddit/register">
            <span className="ml-1 text-blue-500 uppercase">회원가입</span>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
