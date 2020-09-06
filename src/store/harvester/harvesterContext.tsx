import React, { createContext, useState, useCallback } from 'react';

interface HarvesterContextInterface {
  harvesters: HarvesterType[];
  setHarvesters: (harvs: HarvesterType[]) => void;
  selectedHarvester: string;
  setSelectedHarvester: (harvesterId: string) => void;
}

const HarvesterContext = createContext<HarvesterContextInterface>({
  harvesters: [] as HarvesterType[],
  setHarvesters: () => null,
  selectedHarvester: '',
  setSelectedHarvester: () => null,
});

const HarvesterProvider: React.FC = ({ children }) => {
  const [harvesters, setHarvesters] = useState<HarvesterType[]>([]);
  const [selectedHarvester, setSelectedHarvester] = useState('');

  const handleHarvesterSet = useCallback((harvs: HarvesterType[]) => {
    setHarvesters(harvs);
  }, []);

  const handleHarvesterSelect = useCallback((harvId: string) => {
    setSelectedHarvester(harvId);
  }, []);

  return (
    <HarvesterContext.Provider
      value={{
        harvesters,
        setHarvesters: handleHarvesterSet,
        selectedHarvester,
        setSelectedHarvester: handleHarvesterSelect,
      }}
    >
      {children}
    </HarvesterContext.Provider>
  );
};

export { HarvesterProvider, HarvesterContext };
