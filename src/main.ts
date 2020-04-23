import { IState } from './interfaces';

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
});

function changeInputHandler(event: Event) {
  const targetEl = event.target as HTMLInputElement;
  const inputValue = targetEl.value;
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
  const name = value.slice(value.indexOf('-') + 1);
  const fullHex = window.atob(name);

  return `#${fullHex}`;
}

function getColorNameFromHash(value: string): string {
  const hex = value.replace('#', '');
  const fullHex = hex.length === 6 ? hex : fillHex(hex);
  const name = window.btoa(fullHex.toUpperCase());
  const prefix = getPrefix(fullHex);

  return `${prefix}-${name}`;
}

function fillHex(hex: string): string {
  return hex.split('').reduce((acc, el) => acc + el + el, '');
}

function restoreHex(hex: string): string {
  return '000000'.split('').map((_, i) => hex[hex.length - 1 - i] || 0).reverse().join('');
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
