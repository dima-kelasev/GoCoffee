import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Spin } from 'antd';
import { SHOP_LIST } from '../../common/conts/shops-list';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../../store/modal-state';
import { TShopItem } from '../../common/types/shop-item.type';
import { mapStore } from '../../store/map-state';
import { MapContainer, SpinBox } from './map.styles';
import { spinStyle } from '../../common/conts/spin-style';
import { useEffect } from 'react';
// import { getUserLocation } from '../../common/helpers/get-location.helper';

export const YandexMap = () => {
  const setOpenModal = useSetRecoilState(modalState);
  const location = useRecoilValue(mapStore);
  const setLocation = useSetRecoilState(mapStore);

  useEffect(() => {
    const mockCoords = { latitude: 45.0428, longitude: 41.9734 };
    setLocation(mockCoords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (shop: TShopItem) => {
    const cafeInfo = {
      name: shop.name,
      address: shop.address,
      menu: shop.menu,
      id: shop.id,
    };
    setOpenModal({ isOpen: true, cafeInfo });
  };

  if (!location.latitude && !location.longitude) {
    const content = <div style={spinStyle} />;
    return (
      <SpinBox>
        <Spin tip="Загрузка карты" size="large">
          {content}
        </Spin>
      </SpinBox>
    );
  }
  return (
    <MapContainer>
      <Map
        defaultState={{ center: [45.0428, 41.9734], zoom: 13 }}
        width="100%"
        height="100vh"
        modules={['templateLayoutFactory']}
      >
        {SHOP_LIST.map((shop) => (
          <Placemark
            key={shop.id}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            geometry={[shop.location.latitude, shop.location.longitude]}
            onClick={() => handleOpenModal(shop)}
            properties={{
              hintContent: `${shop.name}, адресс: ${shop.address}`,
            }}
          />
        ))}
      </Map>
    </MapContainer>
  );
};
