import React, { createContext, useState, useCallback } from 'react';

interface HarvesterContextInterface {
  harvesters: HarvesterType[];
  setHarvesters: (harvs: HarvesterType[]) => void;
  selectedHarvester: HarvesterType;
  setSelectedHarvester: (harvesterId: string) => void;
}

const emptyHarvester: HarvesterType = {
  id: '',
  name: '',
  location: {
    lat: 0,
    lng: 0,
  },
  route: [],
  oilLevel: 0,
};

const HarvesterContext = createContext<HarvesterContextInterface>({
  harvesters: [] as HarvesterType[],
  setHarvesters: () => null,
  selectedHarvester: emptyHarvester,
  setSelectedHarvester: () => null,
});

const HarvesterProvider: React.FC = ({ children }) => {
  const [harvesters, setHarvesters] = useState<HarvesterType[]>([]);
  const [selectedHarvester, setSelectedHarvester] = useState(emptyHarvester);

  const handleHarvesterSet = useCallback((harvs: HarvesterType[]) => {
    setHarvesters(harvs);
  }, []);

  const handleHarvesterSelect = useCallback(
    (harvId: string) => {
      // Find the selected harvester and if found, set as selected
      const harv = harvesters.find((h) => h.id === harvId);
      if (harv) {
        setSelectedHarvester(harv);
      } else {
        setSelectedHarvester(emptyHarvester);
      }
    },
    [harvesters]
  );

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
