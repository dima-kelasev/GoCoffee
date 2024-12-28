import { Map, Placemark } from '@pbe/react-yandex-maps';
import { Spin } from 'antd';
import { SHOP_LIST } from '../../common/conts/shops-list';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../store/modal-state';
import { TShopItem } from '../../common/types/shop-item.type';

type TLocation = {
  latitude: number;
  longitude: number;
};

type TYandexMap = {
  location: TLocation;
};

export const YandexMap = ({ location }: TYandexMap) => {
  const setOpenModal = useSetRecoilState(modalState);

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
    return <Spin tip="Loading" size="large" />;
  }
  return (
    <div>
      <Map
        defaultState={{ center: [45.0428, 41.9734], zoom: 13 }}
        width="100%"
        height={800}
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
