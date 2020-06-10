import React, { useState } from 'react';
import Layout from './layout/Layout';
import CustomTheme from './layout/CustomTheme';

function App() {
  const [themeMode, setThemeMode] = useState(false);

  const handleThemeSwitch = () => setThemeMode((prevMode) => !prevMode);
  return (
    <>
      <CustomTheme themeMode={themeMode}>
        <div className="App">
          <Layout handleThemeSwitch={handleThemeSwitch} />
        </div>
      </CustomTheme>
    </>
  );
}

export default App;
