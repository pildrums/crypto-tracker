import styled from 'styled-components';

/**
 * @description 메인 컴포넌트
 */
const Coins = () => {
  return <Title>코인</Title>;
};

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

export default Coins;
