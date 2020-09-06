type HarvesterType = {
  id: string;
  name: string;
  oilLevel: number;
  oilLimit: number;
  location: LocationType;
  region: string;
  route: LocationType[];
  oilLevelHistory: OilLevelHistoryType[];
};

type LocationType = {
  lat: number;
  lng: number;
};

type OilLevelHistoryType = {
  time: Date;
  value: HarvesterType['oilLevel'];
};
