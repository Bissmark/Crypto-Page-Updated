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
    return sendRequest(`${BASE_URL}/addFavourite`, 'POST', { coinName, userId });
}

export async function getUserFavourites(userId) {
    return sendRequest(`${BASE_URL}/favourites/${userId}`);
}

export async function removeFavourite(coinName, userId) {
    return sendRequest(`${BASE_URL}/removeFavourite`, 'POST', { coinName, userId });
}