import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CustomTheme from './CustomTheme';
import { UIProvider } from '../store/ui/uiContext';

const LayoutWrapper: React.FC = ({ children }) => {
  return (
    <UIProvider>
      <CustomTheme>
        <Router>{children}</Router>
      </CustomTheme>
    </UIProvider>
  );
};

export default LayoutWrapper;
