import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface RouterState {
  state: {
    name: string;
  };
}

/**
 * @description 세부 컴포넌트
 * @description 현재 secret 창에서 직접 url을 열어보면 에러 발생!
 * @todo secret 창에서 url을 직접 입력했을 때 발생하는 에러 처리.
 */
const Coin = () => {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as RouterState;
  return (
    <Container>
      <Header>
        <Title>{state?.name}</Title>
      </Header>
      {loading && <Loader>Loading...</Loader>}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 480px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export default Coin;
