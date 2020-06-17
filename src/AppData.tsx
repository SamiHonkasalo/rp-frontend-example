import React from 'react';
import useHarvesters from './harvesters/getHarvesterData';

const AppData: React.FC = ({ children }) => {
  useHarvesters();
  return <>{children}</>;
};

export default AppData;
