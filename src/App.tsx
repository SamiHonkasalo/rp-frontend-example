import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import MapContainer from './harvester-map/MapContainer';
import LayoutWrapper from './layout/LayoutWrapper';
import HarvesterList from './harvester-list/HarvesterList';
import SingleHarvester from './single-harvester/SingleHarvester';
import Login from './auth/Login';

function App() {
  return (
    <LayoutWrapper>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/" exact>
              <MapContainer />
            </Route>
            <Route path="/harvesters" exact>
              <HarvesterList />
            </Route>
            <Route path="/harvesters/:id" exact>
              <SingleHarvester />
            </Route>
          </Switch>
        </Layout>
      </div>
    </LayoutWrapper>
  );
}

export default App;
