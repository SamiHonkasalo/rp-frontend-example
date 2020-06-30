import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './dashboard/Dashboard';
import LayoutWrapper from './layout/LayoutWrapper';
import HarvesterList from './harvester-list/HarvesterList';

function App() {
  return (
    <LayoutWrapper>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/harvesters" exact>
              <HarvesterList />
            </Route>
            <Route path="/harvesters/:id" exact>
              <div>Single Harvester</div>
            </Route>
          </Switch>
        </Layout>
      </div>
    </LayoutWrapper>
  );
}

export default App;
