import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/Layout';
import CustomTheme from './layout/CustomTheme';

function App() {
  const [themeMode, setThemeMode] = useState(false);

  const handleThemeSwitch = () => setThemeMode((prevMode) => !prevMode);
  return (
    <>
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
    </>
  );
}

export default App;
