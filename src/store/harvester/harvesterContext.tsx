import React, { createContext, useState, useCallback } from 'react';

interface HarvesterContextInterface {
  harvesters: HarvesterType[];
  setHarvesters: (harvs: HarvesterType[]) => void;
}

const HarvesterContext = createContext<HarvesterContextInterface>({
  harvesters: [] as HarvesterType[],
  setHarvesters: () => null,
});

const HarvesterProvider: React.FC = ({ children }) => {
  const [harvesters, setHarvesters] = useState<HarvesterType[]>([]);

  const handleHarvesterSet = useCallback((harvs: HarvesterType[]) => {
    setHarvesters(harvs);
  }, []);

  return (
    <HarvesterContext.Provider
      value={{ harvesters, setHarvesters: handleHarvesterSet }}
    >
      {children}
    </HarvesterContext.Provider>
  );
};

export { HarvesterProvider, HarvesterContext };
