import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import TestRoute from './TestRoute';
import Dashboard from './dashboard/Dashboard';
import LayoutWrapper from './layout/LayoutWrapper';

function App() {
  return (
    <LayoutWrapper>
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
    </LayoutWrapper>
  );
}

export default App;
