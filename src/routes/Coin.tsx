import { useParams } from "react-router-dom";

/**
 * @description 세부 컴포넌트
 */
const Coin = () => {
  const { coinId } = useParams();
  console.log(coinId);
  return <div>Coin</div>;
};

export default Coin;
