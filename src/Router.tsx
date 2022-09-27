import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

/**
 * @description react-router-dom v6 버전에서는 Switch 대신 Routes를 사용함.
 * @description Route 컴포넌트의 props에서 컴포넌트를 렌더링 시 element를 사용.
 */
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
