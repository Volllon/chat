import api from '../api';
import getToken from './localStorage/getToken';
import { ContextType } from '../context/types';

export default async (): Promise<ContextType | null> => {
  const token = getToken();

  if (token) {
    const result = await api.verify(token);
    const candidate = result?.data?.candidate;

    if (candidate) {
      return {
        userName: `${ candidate.firstName } ${ candidate.lastName }`,
        role: candidate.role
      }
    }
  }

  return null;
}
