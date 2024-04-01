import sendRequest from './send-request';
const BASE_URL = 'http://localhost:3001/api/coins';

export function createCoin(coinData) {
    return sendRequest(BASE_URL, 'POST', coinData);
}

export function getAllCoins() {
    return sendRequest(BASE_URL);
}

export async function addFavourite(coinName, userId) {
    return sendRequest(`${BASE_URL}/addFavourite`, 'POST', { coinName, userId });
}