import sendRequest from "./send-request";
const BASE_URL = 'http://localhost:3001/api/users';

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

export async function addFavourite(coinName, userId) {
    return sendRequest(`${BASE_URL}/addFavorite`, 'POST', { coinName, userId });
}