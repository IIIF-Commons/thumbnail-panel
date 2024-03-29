import '@testing-library/jest-dom';

import { afterEach, expect } from 'vitest';

import { cleanup } from '@testing-library/react';
import { fetch } from 'cross-fetch';
import matchers from '@testing-library/jest-dom/matchers';

global.fetch = fetch;

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
