export const winArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]  
];

const cornerSpacesIds = [1, 3, 7, 9];
const spacesIds = [1,2,3,4,5,6,7,8,9];
const spacesArr = [
  {
    id: 1,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 2,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 3,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 4,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 5,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 6,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 7,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 8,
    played: false,
    image: '',
    owned: null
  },
  {
    id: 9,
    played: false,
    image: '',
    owned: null
  }
];

export const initialState = {
  spaces: spacesArr,
  openSpaces: spacesIds,
  corners: cornerSpacesIds,
  turn: false,
  computerMarkArr: [],
  playerMarkArr: [],
  tie: false,
  win: false,
  start: false
};

export function beatPlayer(state) {
  let tempArr = [];
  let beatPos = '';
  winArr.forEach(win => {
    tempArr.length = 0;
    state.computerMarkArr.forEach(pos => {
      if (win.indexOf(pos) !== -1) {
        tempArr.push(pos);
        if (tempArr.length === 2) {
          win.forEach(winPos => {
            if (tempArr.indexOf(winPos) === -1) {
              if (state.openSpaces.indexOf(winPos) !== -1) {
                beatPos = winPos;
              }
            }
          });
        }
      }
    });
  });
  return beatPos;
}

export function blockPlayer(state) {
  let tempArr = [];
  let blockPos = '';
  winArr.forEach(win => {
    tempArr.length = 0;
    state.playerMarkArr.forEach(pos => {
      if (win.indexOf(pos) !== -1) {
        tempArr.push(pos);
        if (tempArr.length === 2) {
          win.forEach(winPos => {
            if (tempArr.indexOf(winPos) === -1) {
              if (state.openSpaces.indexOf(winPos) !== -1) {
                blockPos = winPos;
              }
            }
          });
        }
      }
    });
  });
  return blockPos;
}
  
export function randomChoice(arr, state) {
  let mark;
  const beatPos = beatPlayer(state);
  const blockPos = blockPlayer(state);
  if (beatPos) {
    mark = beatPos;
  } else {
    
    if (blockPos) {
      mark = blockPos;
    } else {
      var arrPos = Math.floor(Math.random() * (arr.length - 1 - 0 + 1)) + 0;
      mark = arr[arrPos];
    }
  }
  return mark;
}
