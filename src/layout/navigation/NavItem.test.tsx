import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { StaticRouter } from 'react-router-dom';
import NavItem from './NavItem';

test('renders correct text and title', () => {
  const component = render(
    <StaticRouter>
      <NavItem
        to="/harvesters"
        icon={<AssignmentIcon />}
        primaryText="Harvester list"
        exact={false}
      />
    </StaticRouter>
  );

  const primaryText = component.container.querySelector(
    '.MuiListItemText-primary'
  );
  const link = component.container.querySelector('a[href="/harvesters"]');

  expect(primaryText).toHaveTextContent('Harvester list');
  expect(link).toHaveAttribute('title', 'Harvester list');
});
