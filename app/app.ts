interface RGB {
  r?: number;
  g?: number;
  b?: number
}

class App {
  name: HTMLElement;
  input: HTMLElement;
  preview: HTMLElement;

  constructor() {
    this.name = document.getElementById('name');
    this.input = document.getElementById('input');
    this.preview = document.getElementById('preview');
  }

  init() {
    this.input.addEventListener('keyup', this.onKeyUp.bind(this, event));
  }

  onKeyUp(_, event) {
    const value = event.target.value
    if (value.indexOf('_') > -1) {
      this.decript(value)
    } else {
      this.encript(value)
    }
  }

  decript(value) {
    const encriptedColor: string = value.split('_')[1]
    if (!encriptedColor) {
      this.preview.style.background = ''
      this.name.innerHTML = ''
      return
    }

    const rgbColor: RGB = this.decriptColor(encriptedColor)

    if (rgbColor) {
      this.name.innerHTML = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')'
      this.preview.style.background = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')';
    }
  }

  encript(value) {
    const rgb: RGB = this.parseColor(value)
    if (!rgb) {
      this.preview.style.background = ''
      this.name.innerHTML = ''
      return
    }

    const encriptedColor = this.encriptColor(rgb)
    if (encriptedColor) {
      this.name.innerHTML = encriptedColor
      this.preview.style.background = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    }
  }

  parseColor(input) {
    let temp
    const value: string = input.toUpperCase().replace(/#|RGB|\(|\)|\s|;/g,'')
    const rgb: RGB = {}

    if (value.indexOf(',') > 0) {
      temp = value.split(',');
      if (temp.length === 3) {
        rgb.r = temp[0];
        rgb.g = +temp[1];
        rgb.b = +temp[2];
      }
   } else if (value.length === 3) {
     rgb.r = parseInt(value[0] + value[0], 16);
     rgb.g = parseInt(value[1] + value[1], 16);
     rgb.b = parseInt(value[2] + value[2], 16);
   } else if (value.length === 6) {
     rgb.r = parseInt(value[0] + value[1], 16);
     rgb.g = parseInt(value[2] + value[3], 16);
     rgb.b = parseInt(value[4] + value[5], 16);
   } else {
     return;
   }
   return rgb
  }

  decriptColor(decriptedColor: string) {
    const value = window.atob(decriptedColor)

    return {
      r: Number.parseInt(value[0] + value[1], 16),
      g: Number.parseInt(value[2] + value[3], 16),
      b: Number.parseInt(value[4] + value[5], 16)
    }
  }

  encriptColor(rgb: RGB) {
    let nameOfColor = '',
        red = rgb.r,
        green = rgb.g,
        blue = rgb.b,
        max = Math.max(red, green, blue),
        hash = window.btoa(red.toString(16) + green.toString(16) + blue.toString(16));

    if (max === red && max === green && max === blue) {
      if (max === 255) {
        nameOfColor = 'white';
      } else if (max === 0) {
        nameOfColor = 'black';
      } else {
        nameOfColor = 'grey';
      }
    } else if (max === red && max === green) {
      nameOfColor = 'yellow';
    } else if (max === red && max === blue) {
      nameOfColor = 'magenta';
    } else if (max === green && max === blue) {
      nameOfColor = 'cyan';
    } else if (max === red) {
      nameOfColor = 'red';
    } else if (max === green) {
      nameOfColor = 'green';
    } else if (max === blue) {
      nameOfColor = 'blue';
    }

    if (!nameOfColor.length) return
    return nameOfColor + '_' + hash
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const APP = new App();
  APP.init();
})
