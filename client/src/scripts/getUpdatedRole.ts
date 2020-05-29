import api from '../api';
import { Role } from '../types';
import getToken from './localStorage/getToken';

export default async () => {
  let role: Role = 'unlogged';
  const token = getToken();

  if (token) {
    const roleFromServer = await verify(token);

    if (roleFromServer !== undefined) {
      role = roleFromServer ? 'admin' : 'user';
    }
  }

  return role;
}

async function verify(token: string) {
  const result = await api.verify(token);

  return result?.data?.candidate?.role;
}
