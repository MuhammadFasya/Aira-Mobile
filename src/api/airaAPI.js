import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:5000',
});

export const sendMessage = async message => {
  try {
    const res = await API.post('/chat', { message });
    return res.data.response;
  } catch (error) {
    console.error('Aira API error:', error);
    return '⚠️ Aira gagal nyambung ke server.';
  }
};
