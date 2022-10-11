import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from 'routes/Chart';
import Price from 'routes/Price';
import Coin from 'routes/Coin';
import Coins from 'routes/Coins';

interface IRouterProps {}

/**
 * @description react-router-dom v6 버전에서는 Switch 대신 Routes를 사용함.
 * @description Route 컴포넌트의 props에서 컴포넌트를 렌더링 시 element를 사용.
 * @description Route path에서 /*을 넣게 되면, route 내부에서 nested route가 렌더링 될 수 있음을 표시하고 자식 route를 부모 route의 element에 작성하게 됨.
 */
const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
