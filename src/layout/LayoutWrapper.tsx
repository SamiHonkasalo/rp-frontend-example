import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CustomTheme from './CustomTheme';
import { UIProvider } from '../store/ui/uiContext';
import { HarvesterProvider } from '../store/harvester/harvesterContext';
import AppData from '../AppData';
import { AuthProvider } from '../store/auth/authContext';

const LayoutWrapper: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <UIProvider>
        <HarvesterProvider>
          <CustomTheme>
            <AppData>
              <Router>{children}</Router>
            </AppData>
          </CustomTheme>
        </HarvesterProvider>
      </UIProvider>
    </AuthProvider>
  );
};

export default LayoutWrapper;
