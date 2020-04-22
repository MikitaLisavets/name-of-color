import { IState, ICity } from './interfaces';
const cities = require('cities.json');

const state: IState = {
  titleEl:   null,
  inputEl:   null,
  previewEl: null
};

const COLOR_PREFIXES = [
  'white',
  'black',
  'grey',
  'yellow',
  'magenta',
  'cyan',
  'red',
  'green',
  'blue'
];

document.addEventListener('DOMContentLoaded', () => {
  state.titleEl = document.getElementById('title');
  state.previewEl = document.getElementById('preview');
  state.inputEl = document.getElementById('input');

  state.inputEl?.addEventListener('keyup', changeInputHandler);

  console.log('DOMContentLoaded');
});

function changeInputHandler(event: Event) {
  const targetEl = event.target as HTMLInputElement;
  const inputValue = targetEl.value.toLowerCase();
  let previewValue = '';
  let titleValue = '';
  if (!inputValue) return;

  if (isColorName(inputValue)) {
    const hash = getHashFromColorName(inputValue);
    previewValue = hash;
    titleValue = hash;
  } else if (isHash(inputValue)) {
    const colorName = getColorNameFromHash(inputValue);
    previewValue = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
    titleValue = colorName;
  }

  if (state.previewEl) updatePreview(state.previewEl, previewValue);
  if (state.titleEl) updateTitle(state.titleEl, titleValue);
}

function isColorName(value: string): boolean {
  return COLOR_PREFIXES.some(prefix => value.startsWith(prefix));
}

function isHash(value: string): boolean {
  return value.startsWith('#') || value.length === 3 || value.length === 6;
}

function updatePreview(previewEl: HTMLElement, previewValue: string = ''): void {
  previewEl.style.background = previewValue;
}

function updateTitle(titleEl: HTMLElement, titleValue: string = ''): void {
  titleEl.innerHTML = titleValue;
}

function getHashFromColorName(value: string): string {
  const separatedСolorName = value.split('-');
  separatedСolorName.shift();
  const index = Number(separatedСolorName.pop());
  const cityName = separatedСolorName.join(' ');
  const cityIndex = cities.findIndex((city: ICity) => city.name.toLowerCase() === cityName);
  const decimal = index * cities.length + cityIndex;
  const hex = decimal.toString(16);

  return `#${hex}`;
}

function getColorNameFromHash(value: string): string {
  const hex = value.replace('#', '');
  const fullHex = hex.length === 6 ? hex : fillHex(hex);
  const prefix = getPrefix(fullHex);
  const decimal = parseInt(fullHex, 16);
  const index = Math.floor(decimal / cities.length);
  const name = cities[decimal % cities.length].name.toLowerCase().replace(/\s/g, '-');
  return `${prefix}-${name}-${index}`;
}

function fillHex(hex: string): string {
  return hex.split('').reduce((acc, el) => acc + el + el, '');
}

function getPrefix(fullHex: string): string {
  const red = parseInt(fullHex.slice(0, 2), 16);
  const green = parseInt(fullHex.slice(2, 4), 16);
  const blue = parseInt(fullHex.slice(4, 6), 16);
  const max = Math.max(red, green, blue);

  if (max === red && max === green && max === blue) {
    if (max === 255) {
      return 'white';
    } else if (max === 0) {
      return 'black';
    } else {
      return 'grey';
    }
  }

  if (max === red && max === green) {
    return 'yellow';
  } else if (max === red && max === blue) {
    return 'magenta';
  } else if (max === green && max === blue) {
    return 'cyan';
  } else if (max === red) {
    return 'red';
  } else if (max === green) {
    return 'green';
  } else {
    return 'blue';
  }
}
