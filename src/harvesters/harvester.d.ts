type HarvesterType = {
  id: string;
  name: string;
  oilLevel: number;
  location: LocationType;
  route: LocationType[];
};

type LocationType = {
  lat: number;
  lng: number;
};
