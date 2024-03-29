import { useQuery } from '@tanstack/react-query';
import { isDarkAtom } from 'atoms';
import Button from 'components/common/Button';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from './api';
import { FaMoon, FaSun } from 'react-icons/fa';

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// interface ICoinsProps {}

/**
 * @description 메인 컴포넌트
 * @todo price 기능(price 데이터를 구체적으로)
 * @todo line chart -> candlechart
 */
const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins);
  const isIconAtom = useRecoilValue(isDarkAtom);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Button onClick={toggleDarkAtom}>
          {isIconAtom ? <FaSun /> : <FaMoon />}
        </Button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coinIcon"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
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
  button {
    position: absolute;
    right: 80px;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: transform 0.5s ease-in-out;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.5s ease-in;
  }
  &:hover {
    transform: translateX(16px);
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default Coins;
