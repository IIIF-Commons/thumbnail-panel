export function writeToTheDom(thumbItem: string) {
  // Do we want to build nested DOM elements here?
  const imgEl = document.createElement('img');
  imgEl.src = thumbItem;
  imgEl.width = 300;
  document.getElementById('root')?.append(imgEl);
}
