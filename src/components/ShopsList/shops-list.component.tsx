import { SHOP_LIST } from '../../common/conts/shops-list';
import { ShopItem } from '../ShopItem/shop-item.component';
import { ShopsListContainer } from './shops-list.styled';

export const ShopsList = () => {
  return (
    <ShopsListContainer>
      {SHOP_LIST.map((shop) => {
        const isAvailableShop = shop.available;
        return isAvailableShop && <ShopItem shop={shop} key={shop.id} />;
      })}
    </ShopsListContainer>
  );
};
