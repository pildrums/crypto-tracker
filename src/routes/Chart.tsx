import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from './api';

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

/**
 * @description Outlet을 사용할 시 useOutletContext 함수를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
 * @link https://velog.io/@qkr135qkr/react-router-dom-v6%EC%97%90%EC%84%9C-%EC%9E%90%EC%8B%9D-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EA%B2%8C-props%EB%A5%BC-%EC%A0%84%EB%8B%AC%ED%95%B4%EB%B3%B4%EC%9E%90
 */
const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              data: data?.map((price) => parseFloat(price.close)) ?? [],
              name: 'Price',
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            theme: {
              mode: 'dark',
            },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
