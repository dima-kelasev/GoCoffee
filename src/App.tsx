import { useState } from 'react';
import './App.css';
import { Content } from './components/Content/content.component';
import { MenuModal } from './components/Menu-Modal/menu-modal.component';
import { SplashScreen } from './components/Splash-Screen/splash-screen';

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <div className="App">
      {isSplashVisible ? (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      ) : (
        <>
          <Content />
          <MenuModal />
        </>
      )}
    </div>
  );
}

export default App;
