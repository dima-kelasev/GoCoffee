import { Dispatch, SetStateAction } from 'react';

export const getLocation = (
  setLocation: Dispatch<
    SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude }); // Сохраняем координаты в состоянии
      },
      (error) => {
        console.error('Ошибка получения местоположения: ', error);
      }
    );
  } else {
    console.log('Геолокация не поддерживается этим браузером.');
  }
};
