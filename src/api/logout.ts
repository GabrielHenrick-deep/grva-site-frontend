import { Cookie } from 'lucide-react';
import axios from './axios';

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post(
      '/logout',
      {},
      {
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(`antes ${token}`);
    localStorage.removeItem('token');
    
     console.log(`depois ${token}`);
    console.log('Logout feito com sucesso!');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }finally{
    localStorage.removeItem('token');
  }
};
