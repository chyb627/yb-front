# yb-front

frontend web practice

### setting

```bash
# 현재 폴더에 next, typescript 설치
$ npx create-next-app@latest --typescript ./

# prettier 설치
$ yarn add -D prettier eslint-plugin-prettier eslint-config-prettier

# prettierrc설정
# vscode setting파일 설정
# package.json scripts 명령어 설정
# tailwind.config.ts 파일 설정

```

### swr

- wtale-while-revalidate
- 데이터를 가져오기 위한 React Hook 라이브러리
- SWR은 원격 데이터를 가져올 때 캐싱된 데이터가 있으면 그 데이터를 먼저 반환(stale)한 다음 가져오기 요청(revalidate)을 보내고, 마지막으로 최신 데이터와 함께 제공하는 라이브러리.
- 인자로 key와 fetcher가 있다.
- 첫번째 인자는 API URL이면서 캐싱할 때 사용되는 key가 된다.
- 여러 컴포넌트에서 사용하여도 같은 key의 데이터가 있다면 캐싱된 것을 가져옴.
- 두번째 인자는 fetcher이다. Fetch API를 기본으로 하며, 제일 많이 사용되는 Axios나 GraphQL을 사용할 수 있다.

- 사용법

```js
import useSWR from 'swr';
import axios from 'axios';

const Profile = () => {

  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };

  const { data, error } = useSWR('/api/...', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;


  // render data
  return <div>hello {data.name}!</div>;
};
```

### 특정 DOM 선택하기

- 보통 자바스크립트에서는 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM을 선택한다.
- 리액트에서는 ref를 이용해서 DOM을 선택한다.
- DOM을 직접 선택해야 할 경우
  1. 엘리먼트 크기를 가져와야 할 때
  2. 스크롤바 위치를 가져와야 할 때
  3. 엘리먼트에 포커스를 설정 해줘야 할 때 등등
