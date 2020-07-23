import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import testHarvesters from '../harvesters/testHarvester';
import HarvesterTable from './HarvesterTable';

test('renders both harvesters', () => {
  const component = render(
    <HarvesterTable
      loading={false}
      harvesters={testHarvesters}
      handleRowClick={() => null}
      handleButtonClick={() => null}
    />
  );

  const name1 = component.container.querySelector('#name-0');
  expect(name1).toHaveTextContent(testHarvesters[0].name);

  const name2 = component.container.querySelector('#name-1');
  expect(name2).toHaveTextContent(testHarvesters[1].name);

  const id1 = component.container.querySelector('#id-0');
  expect(id1).toHaveTextContent(testHarvesters[0].id);

  const id2 = component.container.querySelector('#id-1');
  expect(id2).toHaveTextContent(testHarvesters[1].id);

  const region1 = component.container.querySelector('#region-0');
  expect(region1).toHaveTextContent(testHarvesters[0].region);

  const region2 = component.container.querySelector('#region-1');
  expect(region2).toHaveTextContent(testHarvesters[1].region);
});

test('shows region loading', () => {
  const component = render(
    <HarvesterTable
      loading
      harvesters={testHarvesters}
      handleRowClick={() => null}
      handleButtonClick={() => null}
    />
  );

  const name1 = component.container.querySelector('#name-0');
  expect(name1).toHaveTextContent(testHarvesters[0].name);

  const name2 = component.container.querySelector('#name-1');
  expect(name2).toHaveTextContent(testHarvesters[1].name);

  const id1 = component.container.querySelector('#id-0');
  expect(id1).toHaveTextContent(testHarvesters[0].id);

  const id2 = component.container.querySelector('#id-1');
  expect(id2).toHaveTextContent(testHarvesters[1].id);

  const region1 = component.container.querySelector('#region-0');
  expect(region1).not.toHaveTextContent(testHarvesters[0].region);

  const region2 = component.container.querySelector('#region-1');
  expect(region2).not.toHaveTextContent(testHarvesters[1].region);
});
