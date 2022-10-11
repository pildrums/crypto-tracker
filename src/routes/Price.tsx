import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinTickers } from './api';

interface IPriceProps {
  coinId: string;
}

interface IPriceData {
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

const Price = () => {
  const { coinId } = useOutletContext<IPriceProps>();
  const { isLoading, data } = useQuery<IPriceData>(
    ['ohlcv', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    },
  );
  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <PriceContainer>
          <PriceList>
            <PriceItem>
              <span>30m</span>
              <span>{data?.quotes.USD.percent_change_30m}%</span>
            </PriceItem>
            <PriceItem>
              <span>12h</span>
              <span>{data?.quotes.USD.percent_change_12h}%</span>
            </PriceItem>
            <PriceItem>
              <span>24h</span>
              <span>{data?.quotes.USD.percent_change_24h}%</span>
            </PriceItem>
            <PriceItem>
              <span>7d</span>
              <span>{data?.quotes.USD.percent_change_7d}%</span>
            </PriceItem>
            <PriceItem>
              <span>30d</span>
              <span>{data?.quotes.USD.percent_change_30d}%</span>
            </PriceItem>
          </PriceList>
        </PriceContainer>
      )}
    </>
  );
};

const PriceContainer = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 480px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
`;

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 10px 20px;
  span {
    font-size: 1rem;
    &:first-child {
      color: ${(props) => props.theme.accentColor};
      font-weight: 700;
    }
  }
`;

export default Price;
