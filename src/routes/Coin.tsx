import { useQuery } from '@tanstack/react-query';
import Button from 'components/common/Button';
import { Helmet } from 'react-helmet-async';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from './api';

interface RouterState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

type TParams = {
  coinId: string;
};

// interface ICoinProps {}

/**
 * @description 세부 컴포넌트
 * @description secret 창에서 url을 입력했을 때 loading 문구 처리 - Done
 * @todo UI 변경, 한국어화
 */
const Coin = () => {
  const { coinId } = useParams() as TParams; // coinId 파라미터
  const { state } = useLocation() as RouterState; // 현재 URL 정보
  const navigate = useNavigate();
  const chartMatch = useMatch('/:coinId/chart');
  const priceMatch = useMatch('/:coinId/price');
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    },
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ICoinData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
  );
  const loading = infoLoading || tickersLoading;
  const goHome = () => {
    navigate('/');
  };
  // render
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {/*
            state.name이 true면 state.name이 나오고 false인 경우에는
            다시 loading이 참일 때, 'Loading...'이라는 문구가 나오고
            false이면 info.name이 나옴.
            즉, 메인화면에서 오는 경우가 아니어도 상단에 코인의 이름이 나오게 됨.
          */}
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <Button onClick={goHome}>홈</Button>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export default Coin;
