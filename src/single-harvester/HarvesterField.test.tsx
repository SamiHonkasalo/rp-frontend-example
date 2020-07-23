import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import testHarvesters from '../harvesters/testHarvester';
import HarvesterField from './HarvesterField';

test('renders correct data', () => {
  const component = render(
    <HarvesterField
      harvester={testHarvesters[1]}
      name="region"
      label="Region"
      type="text"
    />
  );

  const input = component.container.querySelector('input[name="region"]');
  expect(input).toHaveValue('Central Finland');
});

test('editable field has underline', () => {
  const component = render(
    <HarvesterField
      harvester={testHarvesters[1]}
      name="region"
      label="Region"
      type="text"
      editable
    />
  );

  const input = component.container.querySelector('input[name="region"]');
  const div = component.container.querySelector('.MuiInput-underline');
  expect(input).toHaveValue('Central Finland');
  expect(div).not.toBeNull();
});

test('field in edit mode is not readonly', () => {
  const component = render(
    <HarvesterField
      harvester={testHarvesters[1]}
      name="region"
      label="Region"
      type="text"
      editable
      edit
    />
  );

  const input = component.container.querySelector('input[name="region"]');
  const div = component.container.querySelector('.MuiInput-underline');
  expect(input).toHaveValue('Central Finland');
  expect(input).not.toHaveAttribute('readonly');
  expect(div).not.toBeNull();
});
