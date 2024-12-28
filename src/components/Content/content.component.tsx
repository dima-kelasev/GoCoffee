import { useRecoilValue } from 'recoil';
import { switchedStore } from '../../store/switched-view-state';
import { YandexMap } from '../Map/map.component';
import { ShopsList } from '../ShopsList/shops-list.component';

export const Content = () => {
  const selectMainView = useRecoilValue(switchedStore);
  return selectMainView ? (
    <ShopsList />
  ) : (
    <>
      <YandexMap />
    </>
  );
};
