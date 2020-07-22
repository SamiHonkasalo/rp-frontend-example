import React from 'react';
import { Grid } from '@material-ui/core';
import HarvesterCard from './HarvesterCard';

interface Props {
  harvesters: HarvesterType[];
  loading: boolean;
  handleCardClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleButtonClick: (id: string) => void;
}

const HarvesterCards: React.FC<Props> = ({
  harvesters,
  loading,
  handleCardClick,
  handleButtonClick,
}: Props) => {
  return (
    <Grid container spacing={3}>
      {harvesters.map((h) => (
        <Grid item xs={12} key={h.id}>
          <HarvesterCard
            loading={loading}
            harvester={h}
            handleCardClick={handleCardClick}
            handleButtonClick={handleButtonClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HarvesterCards;
