import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import 'mutationobserver-shim';

import HarvesterItem from './HarvesterItem';
import testHarvesters from '../harvesters/testHarvester';

global.MutationObserver = window.MutationObserver;

test('renders content', () => {
  const component = render(
    <HarvesterItem
      loading={false}
      harvester={testHarvesters[0]}
      handleButtonClick={() => null}
    />
  );

  expect(component.container).toHaveTextContent(testHarvesters[0].name);
  expect(component.container).toHaveTextContent(testHarvesters[0].id);

  const reg = component.container.querySelector("input[name='region']");
  expect(reg).toHaveValue(testHarvesters[0].region);

  const oilLimit = component.container.querySelector("input[name='oilLimit']");
  expect(oilLimit).toHaveValue(50);
});

test('shows region loading', () => {
  const component = render(
    <HarvesterItem
      loading
      harvester={testHarvesters[0]}
      handleButtonClick={() => null}
    />
  );

  expect(component.container).toHaveTextContent(testHarvesters[0].name);
  expect(component.container).toHaveTextContent(testHarvesters[0].id);

  const reg = component.container.querySelector("input[name='region']");
  expect(reg).toBeNull();

  const oilLimit = component.container.querySelector("input[name='oilLimit']");
  expect(oilLimit).toHaveValue(50);
});
