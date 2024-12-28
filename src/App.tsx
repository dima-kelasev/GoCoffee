import { Switch } from 'antd';
import './App.css';
import { Content } from './components/Content/content.component';
import { MenuModal } from './components/Menu-Modal/menu-modal.component';
import { useState } from 'react';
import { SwitcherContainer } from './app.styled';
import { YandexMap } from './components/Map/map.component';
import { getLocation } from './common/helpers/get-location.helper';

function App() {
  const [selectMainView, setSelectMainView] = useState<boolean>(true);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const Onchange = (checked: boolean) => {
    setSelectMainView(checked);
    getLocation(setLocation);
  };

  console.log('location', location);
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

      {selectMainView ? (
        <Content />
      ) : (
        <>
          <YandexMap location={location} />
        </>
      )}

      <MenuModal />
    </div>
  );
}

export default App;
