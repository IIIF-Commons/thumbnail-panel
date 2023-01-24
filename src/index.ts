import { css } from '@acab/ecsstatic';

console.log('Thumbnail panel.');

export const test = 'thumbnail panel'


export const exampleClassName = css`
  background: red;
  
  @media (min-width: 200px) {
    background: blue;
  }
`;
