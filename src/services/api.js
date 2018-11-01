import axios from 'axios';
import User from './User';

export function api() {
  const headers = {};

  const user = User.getAuthenticatedUserInstance();
  const token = User.getAuthenticatedUserToken();

  if (token) {
    headers['Authorization'] = token;
  }

  return axios.create({
    baseURL: 'http://192.168.0.10:4050/',
    timeout: 30000,
    headers,
  });
}

export async function findOrCreateEmailAuthorization(email) {
  const params = { email };
  const { data } = await api().get('/auth/verification', { params });
  return data;
}

export async function verifyEmailAndCreateUser(email, code) {
  const body = { email, code };
  const { data } = await api().post('/auth/signup', body);
  return data;
}

export async function signInWithEmailAndPass(email, password) {
  const body = { email, password, provider: 'EMAIL' };
  const { data } = await api().post('/auth/signin', body);
  return data;
}

export async function patchUserDisplayName(userId, displayName) {
  const patch = { op: 'replace', path: '/displayName', value: displayName };
  const { data } = await api().patch(`/users/${userId}`, [patch]);
  return data;
}

export async function updatePassword(password) {
  const body = { password };
  const { data } = await api().put('/auth/password', body);
  return data;
}

export async function getWalletByUserId(userId) {
  try {
    const {data} = await api().get(`/users/${userId}/wallet`);
    return data.resources.wallet;
  } catch (e) {
    if (e.response.data.code !== "ERR_RESOURCE_NOT_FOUND") throw e;
    return null
  }
}

export async function getCardByUserId(userId) {
  try {
    const {data} = await api().get(`/users/${userId}/card`);
    return data.resources.card;
  } catch (e) {
    if (e.response.data.code !== "ERR_RESOURCE_NOT_FOUND") throw e;
    return null
  }
}

export async function createCardForUser(userId) {
  const { data } = await api().post('/cards', { userId });
  return data.resources.card;
}

export async function listUsers(next) {
  const { data } = await api().get('/users');
  return data.resources.users;
}

export async function createTransfer(transfer) {
  const { data } = await api().post('/transfers', transfer);
  return data.resources.transfer;
}

export async function listTransfersByUserId(userId) {
  const { data } = await api().get(`/transfers/user/${userId}`);
  return data.resources.transfers;
}