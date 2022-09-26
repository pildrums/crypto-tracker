# Crypto Tracker 실습

이 프로젝트는 노마드코더 강의를 보고 실습한 프로젝트입니다.  
향후에 배운 내용을 바탕으로 저만의 다양한 방식으로 새롭게  
제작될 예정입니다.

# 2022.9.27

## 1. Interface

interface는 Object 형식으로 타입을 지정할 때 사용합니다.  
 예를 들어 하나의 컴포넌트에 여러가지의 Props가 들어갈 때,  
 그 props들의 타입을 한번에 묶어서 지정해줄 수 있습니다.

```javascript
interface ComponentProps {
  name: string;
  age: number;
}

function sayHello({name, age}: ComponentProps) {
  `Hello My name is ${name}! I'm ${age} years old.`
}

sayHello({name: Pildrum, age: 100});
```

## 2. Optional Props

optional props는 반드시 required가 아니어도 되는 상황일 때  
 쓸 수 있습니다. key 바로 뒤에 ?를 넣어주면됩니다.

```javascript
interface ComponentProps {
  name: string;
  age?: number;
}

function sayHello({name, age}: ComponentProps) {
  `Hello My name is ${name}! I'm ${age} years old.`
}

sayHello({name: Pildrum});
```
