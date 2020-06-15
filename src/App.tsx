import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import CustomTheme from './layout/CustomTheme';
import { UIProvider } from './store/ui/uiContext';
import TestRoute from './TestRoute';
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <UIProvider>
      <CustomTheme>
        <Router>
          <div className="App">
            <Layout>
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/test" exact>
                  <TestRoute />
                </Route>
              </Switch>
            </Layout>
          </div>
        </Router>
      </CustomTheme>
    </UIProvider>
  );
}

export default App;
