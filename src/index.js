import './index.scss';

export default class TextEmotion {
  constructor(opt) {
    this.wrapper = typeof opt.wrapper === 'object' ?
      opt.wrapper :
      document.querySelector(opt.wrapper);
    this.emotion = opt.emotion;
    this.delay = opt.delay;
    this.loop = opt.loop;
    this.symbol = {
      face: {
        round: ['( ', ' )'],
        roundLeft: ['( ', ' '],
        roundRight: [' ', ' )'],
        square: ['[ ', ' ]'],
        squareLeft: ['[ ', ' '],
        squareRight: [' ', ' ]']
      },
      eyes: {
        plus: ['+', '+'],
        min: ['—', '—'],
        accent: ['^', '^'],
        not: ['-¬', '-¬'],
        tilde: ['~', '~'],
        arrow: ['>', '<']
      },
      mouth: {
        triangle: ['∆'],
        kiss: ['3'],
        poker: ['_'],
        vi: ['v']
      },
      hands: {
        slash: ['\'', '/'],
        slashLeft: ['\'', ''],
        slashRight: ['', '/'],
        squareUp: ['⎣', '⎦'],
        squareDown: ['⎡', '⎤'],
        handDown: ['⎛', '⎞'],
        handWhat: ['⎞', '⎛'],
        handUp: ['⎝', '⎠'],
        none: ['', '']
      }
    };
    this.emotionConfig = {
      test1: ['mouth:poker', 'eyes:accent', 'face:round', 'hands:none'],
      test2: ['mouth:poker', 'eyes:arrow', 'face:round', 'hands:handUp']
    };
    this.bracket = [];

    this.emotion.map(item => {
      const result = this.create(this.emotionConfig[item]);

      this.bracket.push(result);
    });

    if (this.bracket) {
      this.wrapper.innerHTML = this.bracket[0];
    }

    if (this.delay) {
      let index = 0;

      const animate = () => {
        this.wrapper.innerHTML = this.bracket[index];

        if (index === this.bracket.length - 1) {
          index = 0;
        } else {
          index += 1;
        }

        setTimeout(() => {
          requestAnimationFrame(animate);
        }, this.delay[index]);
      };

      requestAnimationFrame(animate);

    }
  }

  create(config) {
    const face = [];

    config.map(item => {
      const value = item.split(':');

      if (!value[0]) throw Error('Symbol position isn\'t defined');
      if (!value[1]) throw Error('Face symbol isn\'t defined');

      const faceSymbol = this.symbol[value[0]][value[1]];

      if (faceSymbol.length > 1) {
        face.unshift(faceSymbol[0]);
        face[face.length + 1] = faceSymbol[1];
      } else {
        face.push(faceSymbol.join(''));
      }
    });

    return face.join('');
  }
}
