const BASE_URL = `https://api.coinpaprika.com/v1`;
/**
 * @returns Coin Data return
 */
export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
/**
 *
 * @param coinId 코인 이름
 * @returns Coin Info Data return
 */
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  );
}
/**
 * @param coinId 코인 이름
 * @returns coin ticker data return
 */
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
}
/**
 *
 * @param coinId 코인 이름
 * @description coinpaprika OHLC API 유료화로 인한 API 변경(Nomadcoder 자체제작 API)
 * @returns coin history return
 */
export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초로 나타냄
  // const startDate = endDate - 60 * 60 * 24 * 7; // 현재 시간에서 1주 -1시간에 해당하는 초를 뺌
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`,
  ).then((response) => response.json());
}
