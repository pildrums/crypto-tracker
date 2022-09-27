# Crypto Tracker 실습

이 프로젝트는 노마드코더 강의를 보고 실습한 프로젝트입니다.  
향후에 배운 내용을 바탕으로 저만의 다양한 방식으로 새롭게 제작될 예정입니다.

# 2022.9.27

## 1. Interface

interface는 Object 형식으로 타입을 지정할 때 사용합니다.  
예를 들어 하나의 컴포넌트에 여러가지의 Props가 들어갈 때,  
그 props들의 타입을 한번에 묶어서 지정해줄 수 있습니다.

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

optional props는 반드시 required가 아니어도 되는 상황일 때  
쓸 수 있습니다. key 바로 뒤에 ?를 넣어주면됩니다.

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

Typescript로 만들어진 React Project는 useState 함수안에 인자에  
따라서 인자의 타입을 추론합니다.  
그래서 따로 타입을 명시해 줄 필요는 없습니다.  
다만 상황에 따라서는 타입을 두가지 이상 넣어줘야할 때가 있습니다.  
이를테면, state 초깃값이 number나 string을 줘야할 때는 OR 연산자로  
타입을 지정해주면 number나 string값 두개를 넣어도 에러를 발생시키지  
않습니다.

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
setValue("hello");
```

그러나 두번째 예시의 경우에는 잘 쓰이지 않습니다. state를 만들면 그 타입 그대로 쓰는 경우가 많아서 굳이 나눠서 쓸 필요는 없지만 혹시라도 사용해야하는 경우라면 알아두시는게 더 좋습니다.
