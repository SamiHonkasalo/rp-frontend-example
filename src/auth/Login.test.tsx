import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import 'mutationobserver-shim';

import Login from './Login';

global.MutationObserver = window.MutationObserver;

test('renders correct form fields and button', () => {
  const component = render(<Login />);

  const email = component.container.querySelector('#email');
  expect(email).not.toBeNull();

  const password = component.container.querySelector('#password');
  expect(password).not.toBeNull();

  const button = component.container.querySelector('button[type="submit"]');
  expect(button).not.toBeNull();
});

test('allows entering text', () => {
  const component = render(<Login />);

  const email = component.container.querySelector('#email');
  expect(email).not.toBeNull();
  expect(email).toBeEmpty();
  if (email) {
    fireEvent.change(email, { target: { value: 'test@test.com' } });
    expect(email).toHaveValue('test@test.com');
  }

  const password = component.container.querySelector('#password');
  expect(password).not.toBeNull();
  expect(password).toBeEmpty();
  if (password) {
    fireEvent.change(password, { target: { value: '123' } });
    expect(password).toHaveValue('123');
  }
});
