import api from '..';
import { ENDPOINTS } from '../../const/endpoints';

export const fetchPlaces = async () => {
  try {
    const response = await api.get(ENDPOINTS.getPlaces);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка кафе:', error);
    throw error;
  }
};
