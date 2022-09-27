/**
 * @module styled-components
 */
import { useState } from "react";
import styled from "styled-components";

/**
 * @description interface는 객체형식으로 타입을 지정해줄 때 사용함.
 * @description borderColor 뒤에 ?는 optional props라는 의미!
 */

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

/**
 * @description TypeScript 입장에서는 Container 컴포넌트는 div로 인식함.
 * @description 그래서 styled.div 앞에 interface로 타입을 지정.
 * @description borderColor 뒤에 ?는 optional props라는 의미!
 * @description 즉, borderColor를 쓸 지 안쓸 지를 결정할 수 있음.
 */

interface ContainerProps {
  bgColor: string;
  borderColor?: string;
}

// borderColor props 안에 AND 연산자로 작성하면 조건부로 선의 컬러를 넣을 수 있음.
// useState 인자에 초기값을 넣어주게 되면 typescript가 자동으로 타입을 추론함.
/**
 * @todo TypeScript and State practice
 */
const Circle = ({ bgColor, borderColor }: CircleProps) => {
  const [value, setValue] = useState<number | string>(0);
  setValue(0)
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? bgColor}
    ></Container>
  );
};

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

export default Circle;
