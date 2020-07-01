type HarvesterType = {
  id: string;
  name: string;
  oilLevel: number;
  oilLimit: number;
  location: LocationType;
  route: LocationType[];
};

type LocationType = {
  lat: number;
  lng: number;
};
