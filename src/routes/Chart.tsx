import { useQuery } from '@tanstack/react-query';
import { useOutletContext, useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';

type IChartProps = {
  coinId: string;
};

/**
 * @description Outlet을 사용할 시 useOutletContext 함수를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
 * @link https://velog.io/@qkr135qkr/react-router-dom-v6%EC%97%90%EC%84%9C-%EC%9E%90%EC%8B%9D-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EA%B2%8C-props%EB%A5%BC-%EC%A0%84%EB%8B%AC%ED%95%B4%EB%B3%B4%EC%9E%90
 */
const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>()
  const { isLoading, data } = useQuery(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );
  console.log(coinId);
  return <div>Chart</div>;
};

export default Chart;
