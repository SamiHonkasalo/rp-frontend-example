import React from 'react';
import { Grid } from '@material-ui/core';
import HarvesterCard from './HarvesterCard';

interface Props {
  harvesters: HarvesterType[];
  handleCardClick: (event: React.MouseEvent<unknown>, id: string) => void;
  handleButtonClick: (id: string) => void;
}

const HarvesterCards: React.FC<Props> = ({
  harvesters,
  handleCardClick,
  handleButtonClick,
}: Props) => {
  return (
    <Grid container spacing={3}>
      {harvesters.map((h) => (
        <Grid item xs={12} key={h.id}>
          <HarvesterCard
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
