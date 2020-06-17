type HarvesterType = {
  id: string;
  location: LocationType;
  route: LocationType[];
};

type LocationType = {
  lat: number;
  lng: number;
};
