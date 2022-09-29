const BASE_URL = `https://api.coinpaprika.com/v1`;

/**
 * @returns Coin Data return
 */
export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

/**
 * 
 * @param coinId - coin id
 * @returns Coin Info Data return
 */
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  );
}

/**
 * 
 * @param coinId - coin id
 * @returns coin ticker data return
 */
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
}
