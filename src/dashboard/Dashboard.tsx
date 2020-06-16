import React from 'react';
import Map from './Map';

const Dashboard: React.FC = () => {
  return (
    <>
      <Map center={{ lat: 62.2518079, lng: 25.7671327 }} zoom={12} />
    </>
  );
};

export default Dashboard;
