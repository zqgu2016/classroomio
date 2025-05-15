export const themeImages = {
  standard: {
    card: '/standard-quiz-card.svg',
    editor: '/standard-quiz-editor.svg',
    play: '/standard-quiz-play.svg'
  },
  mainland: {
    card: '/mainstream-quiz-card.svg',
    editor: '/mainstream-quiz-editor.svg',
    play: '/mainstream-quiz-play.svg'
  }
};

export const defOption = {
  id: 1,
  label: '',
  options: []
};

export const optionImage = {
  circle: '/circle.svg',
  spade: '/spade.svg',
  square: '/square.svg',
  pentagon: '/pentagon.svg',
  hexagon: '/hexagon.svg',
  triangle: '/triangle.svg'
};

export const allOptions = [
  {
    id: 'circle',
    label: '',
    isCorrect: false
  },
  {
    id: 'triangle',
    label: '',
    isCorrect: false
  },
  {
    id: 'spade',
    label: '',
    isCorrect: false
  },
  {
    id: 'square',
    label: '',
    isCorrect: false
  },
  {
    id: 'pentagon',
    label: '',
    isCorrect: false
  },
  {
    id: 'hexagon',
    label: '',
    isCorrect: false
  }
];
export const booleanOptions = [
  {
    id: 'triangle',
    label: 'True',
    image: '/triangle.svg'
  },
  {
    id: 'square',
    label: 'False',
    image: '/square.svg'
  }
];
export const allThemes = [
  {
    id: 'standard',
    label: 'Standard'
  },
  {
    id: 'mainland',
    label: 'Mainland Bridge'
  }
];

export const defQuestion = {
  id: new Date().getTime(),
  title: '',
  type: 'multichoice',
  options: [],
  timelimit: '10s'
};

export const STEPS = {
  CONNECT_TO_PLAY: 'CONNECT_TO_PLAY',
  WAIT_FOR_PLAYERS: 'WAIT_FOR_PLAYERS',
  SHOW_NEXT_QUESTION: 'SHOW_NEXT_QUESTION',
  SCOREBOARD: 'SCOREBOARD',
  PODIUM: 'PODIUM'
};
