import { api } from '../lib/api';

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
