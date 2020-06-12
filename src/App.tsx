import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './layout/Layout';
import CustomTheme from './layout/CustomTheme';
import { UIProvider } from './store/ui/uiContext';

function App() {
  const [themeMode, setThemeMode] = useState(false);

  const handleThemeSwitch = () => setThemeMode((prevMode) => !prevMode);
  return (
    <>
      <UIProvider>
        <CustomTheme themeMode={themeMode}>
          <Router>
            <div className="App">
              <Layout
                themeMode={themeMode}
                handleThemeSwitch={handleThemeSwitch}
              />
            </div>
          </Router>
        </CustomTheme>
      </UIProvider>
    </>
  );
}

export default App;
