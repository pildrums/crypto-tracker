# Crypto Tracker 실습

이 프로젝트는 노마드코더 강의를 보고 실습한 것을 정리한 문서입니다.
향후에 배운 내용을 바탕으로 저만의 다양한 방식으로 새롭게 제작될 예정입니다.

# 2022.9.27

## 1. Interface

interface는 Object 형식으로 타입을 지정할 때 사용합니다. 예를 들어 하나의 컴포넌트에 여러가지의 Props가 들어갈 때, 그 props들의 타입을 한번에 묶어서 지정해줄 수 있습니다.

```typescript
interface ComponentProps {
  name: string;
  age: number;
}

function sayHello({ name, age }: ComponentProps) {
  `Hello My name is ${name}! I'm ${age} years old.`;
}

sayHello({ name: Pildrum, age: 100 });
```

## 2. Optional Props

optional props는 반드시 required가 아니어도 되는 상황일 때 쓸 수 있습니다. key 바로 뒤에 ?를 넣어주면 됩니다.

```typescript
interface ComponentProps {
  name: string;
  age?: number;
}

function sayHello({ name, age }: ComponentProps) {
  `Hello My name is ${name}! I'm ${age} years old.`;
}

sayHello({ name: Pildrum });
```

## 3. State

Typescript로 만들어진 React Project는 useState 함수안에 인자에 따라서 인자의 타입을 추론합니다. 그래서 따로 타입을 명시해 줄 필요는 없습니다.  
다만 상황에 따라서는 타입을 두가지 이상 넣어줘야할 때가 있습니다. 이를테면, state 초깃값이 number나 string을 줘야할 때는 OR 연산자로 타입을 지정해주면 number나 string값 두개를 넣어도 에러를 발생시키지 않습니다.

### 첫번째 예시

```typescript
// 초깃값이 number이면
const [value, setValue] = useState(0);

// useState에서 이미 number라고 추론하기 때문에
// setter 함수의 인자도 number로 넣어줘야 함.
setValue(1);
```

### 두번째 예시

```typescript
// 초깃값이 number나 string이고 OR 연산자로 타입을 정해주면
const [value, setValue] = useState<number | string>(0);

// setter 함수의 인자에 number나 string으로 넣어줄 수 있음.
setValue('hello');
```

그러나 두번째 예시의 경우에는 잘 쓰이지 않습니다. state를 만들면 그 타입 그대로 쓰는 경우가 많아서 굳이 나눠서 쓸 필요는 없지만 혹시라도 사용해야하는 경우라면 알아둬야 할 것 같습니다.

# 2022.9.28

## 4. React-Router-Dom v6

React에서 라우팅을 할 때에는 React-Router-Dom을 사용해서 라우팅을 합니다.  
NomadCoder 강의에서는 v5로 작업을 했지만, 저는 여기서 v6로 리팩토링했습니다.

1. App 컴포넌트를 BrowserRouter로 묶어줍니다. 다만 Router.tsx를 만들어서 따로 적용하겠습니다.

```typescript
import { BrowserRouter } from 'react-router-dom';

const Router = () => {
  return <BrowserRouter></BrowserRouter>;
};

export default Router;
```

2. Routes와 Route를 사용해서 라우팅할 컴포넌트를 넣어줍니다. path props에 사용할 쿼리를 적어주면 됩니다.  
   v5와 다르게 v6는 Switch가 아닌 Routes를 사용하고, element props 안에 라우팅할 컴포넌트를 넣어주게 됩니다.

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyComponent from './routes/Mycomponent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/myComponent" element={<MyComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
```

## 5. useEffect에서 함수 즉각 실행

useEffect에서 함수를 즉각 실행하는 방법은 다음 코드와 같이 useEffect 안에 만들어 준 함수 안에 괄호 두개를 넣고, 첫번째 괄호 안에 다른 코드를 넣어주면 됩니다.

```typescript
import {useEffect} from 'react';

useEffect(() => {
  ()();
}, []);

(...)
```

다음 코드는 위에 코드를 활용해서 실제로 api를 불러올때 쓴 코드입니다.

```typescript
import { useEffect } from 'react';

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch('https://lalala.com/api');
      const json = await response.json();
    })();
  }, []);
  return (
    // ...
  );
};

// ...

export default Coins;

```

저 위의 코드를 캡슐화도 할 수 있습니다.
fetch로 가져온 api 변수와 그것을 json으로 표현하는 변수를 하나로 합친 코드입니다.

```typescript
import { useEffect } from 'react';

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await (await fetch('https://lalala.com/api')).json();
    })();
  }, []);
  return (
    // ...
  );
};

// ...

export default Coins;

```

# 2022.9.29

axios라는 모듈을 가지고 api를 부르면 이것보다 더 쉽게 불러올 수 있습니다.

```typescript
import { useEffect } from 'react';
import axios from 'axios';

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const getCoins = async () => {
    const res = await axios('https://api.coinpaprika.com/v1/coins');
    // 표현되는 데이터 수 100개
    setCoins(res.data.slice(0, 100));
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    // ...
  );
};

// ...

export default Coins;
```

## 6. Nested Route

react router dom v6에서 중첩라우팅을 하는 방법은 크게 두가지입니다.

1. router.tsx에서 먼저 path의 맨 마지막에 /\* 를 넣어줍니다. 이것은 하위에 어떤 path가 들어가도 된다는 의미이기도 합니다.

```typescript
<Route path="/:coinId/*" element={<Coin />} />
```

Coin.tsx에서 기존 방식대로 Routes와 Route를 이용해서 라우팅을 해줍니다.

```typescript
<Routes>
  <Route path="chart" element={<Chart />} />
  <Route path="price" element={<Price />} />
</Routes>
```

Routes가 상대경로도 지원하기 때문에 path="chart"와 같이 써도 동작하게 됩니다.

2. 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법이 있습니다. v6에서 처음 선보인 Outlet이라는 기능입니다.  
   router.tsx에서 chart와 price 컴포넌트를 import하고 그리고 이 자식 Route들이 어디에 render 될지 부모의 element안에 Outlet을 이용해 표시합니다.

```typescript
//Router.tsx
<Route path="/:coinId" element={<Coin />}>
  <Route path="chart" element={<Chart />} />
  <Route path="price" element={<Price />} />
</Route>

// Coin.tsx
<Outlet />
```

## 7. React-Query

(임시)  
React-Query는 좀 더 쉬운 방법으로 API를 호출할 수 있는 라이브러리입니다.

1. api.ts 생성 (fetcher 함수)

```typescript
//일빈적인 방법
export async funtion fetchCoins() {
  const response = await fetch('https://lalala.com');
  const json = await response.json();
  return json;
}

// 조금 더 줄인다면...
export async funtion fetchCoins() {
  return fetch('https://lalala.com').then((response) => 
    response.json()
  );
}
```
그 다음 