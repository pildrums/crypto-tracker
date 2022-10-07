import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinTickers } from './api';

interface IPriceProps {
  coinId: string;
}

const Price = () => {
  const { coinId } = useOutletContext<IPriceProps>();
  console.log(fetchCoinTickers(coinId));
  
  return <PriceContainer></PriceContainer>;
};

const PriceContainer = styled.div``;

export default Price;
