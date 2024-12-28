import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Spin } from 'antd';
import { SHOP_LIST } from '../../common/conts/shops-list';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../../store/modal-state';
import { TShopItem } from '../../common/types/shop-item.type';
import { mapStore } from '../../store/map-state';
import { SpinBox } from './map.styles';
import { spinStyle } from '../../common/conts/spin-style';

export const YandexMap = () => {
  const setOpenModal = useSetRecoilState(modalState);
  const location = useRecoilValue(mapStore);

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
    <div>
      <Map
        defaultState={{ center: [45.0428, 41.9734], zoom: 13 }}
        width="100%"
        height="65vh"
        modules={['templateLayoutFactory']}
      >
        {SHOP_LIST.map((shop) => (
          <Placemark
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            geometry={[shop.location.latitude, shop.location.longitude]}
            onClick={() => handleOpenModal(shop)}
            properties={{
              hintContent: `${shop.name}, адресс: ${shop.address}`,
            }}
          />
        ))}
      </Map>
    </div>
  );
};
