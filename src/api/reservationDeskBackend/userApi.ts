import axios from 'axios';
import { apiUserType } from '../../interfaces/User';

export const registerUserRequest = async (userData: apiUserType) => {
  try {
    const response = await axios.post('url', {
      headers: {},
      userData,
    });

    const data = response.data;

    return data;
  } catch (error) {}
  return;
};
