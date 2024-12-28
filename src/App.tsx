import { Switch } from 'antd';
import './App.css';
import { Content } from './components/Content/content.component';
import { MenuModal } from './components/Menu-Modal/menu-modal.component';
import { SwitcherContainer } from './app.styled';
import { getLocation } from './common/helpers/get-location.helper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mapStore } from './store/map-state';
import { switchedStore } from './store/switched-view-state';

function App() {
  const [selectMainView, setSelectMainView] = useRecoilState(switchedStore);
  const setLocation = useSetRecoilState(mapStore);

  const Onchange = (checked: boolean) => {
    setSelectMainView(checked);
    getLocation(setLocation);
  };

  return (
    <div className="App">
      <SwitcherContainer>
        <Switch
          checkedChildren="Список"
          unCheckedChildren="Карта"
          checked={selectMainView}
          onChange={Onchange}
        />
      </SwitcherContainer>

      <Content />

      <MenuModal />
    </div>
  );
}

export default App;
