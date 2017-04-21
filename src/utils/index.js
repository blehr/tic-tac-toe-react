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

export const cornerSpacesIds = [1, 3, 7, 9];
export const spacesIds = [1,2,3,4,5,6,7,8,9];
export const computerMarkArr = [];
export const playerMarkArr = [];

export const spacesArr = [
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


/********
 * 
 * 
 * 
 * *******/
 
 
const tempArr = [];
let beatPos = '';
// let mark = '';
let blockPos = '';
let turn = false;
 
function beatPlayer() {
  winArr.forEach(function(win) {
    tempArr.length = 0;
    computerMarkArr.forEach(function(pos) {
      if (win.indexOf(pos) !== -1) {
        tempArr.push(pos);
        if (tempArr.length === 2) {
          win.forEach(function(winPos) {
            if (tempArr.indexOf(winPos) === -1) {
              if (spacesIds.indexOf(winPos) !== -1) {
                beatPos = winPos;
                return true;
              }
            }
          });
        }
      }
    });
  });
}
 
 
 
function blockPlayer() {
  winArr.forEach(function(win) {
    tempArr.length = 0;
    playerMarkArr.forEach(function(pos) {
      if (win.indexOf(pos) !== -1) {
        tempArr.push(pos);
        if (tempArr.length === 2) {
          win.forEach(function(winPos) {
            if (tempArr.indexOf(winPos) === -1) {
              if (spacesIds.indexOf(winPos) !== -1) {
                blockPos = winPos;
                return true;
              }
            }
          });
        }
      }
    });
  });
}

function usedSpaces(space) {
 
  
  const index = spacesIds.indexOf(space);
  const cornerIndex = cornerSpacesIds.indexOf(space);
  
  spacesIds.splice(index, 1);
  
  // const newSpacesIds = [
  //   ...spacesIds.slice(0, index),
  //   ...spacesIds.slice(index + 1)
  // ];
  
  if (cornerIndex !== -1) {
    cornerSpacesIds.splice(cornerIndex, 1);
    // const newCornerSpacesIds = [
    //   ...cornerSpacesIds.slice(0, cornerIndex),
    //   ...cornerSpacesIds.slice(cornerIndex + 1)
    // ];
  }
  
}
 
export function victory() {
  console.log('victory');
}

export function showTie() {
  console.log('tie');
}
 
function checkForWin(arr) {
  winArr.forEach(function(win) {
    if (arr.indexOf(win[0]) !== -1 && arr.indexOf(win[1]) !== -1 && arr.indexOf(win[2]) !== -1) {
      victory();
      return;
    }
  });
  if (!turn && spacesArr.length === 0) {
    showTie();
  } else {
    if (turn) {
      turn = false;
    }
  }
}
 
 
 
 
function randomChoice(arr) {
  let mark;
  var markDelay = setTimeout(function() {
    beatPlayer();
    if (beatPos !== "") {
      mark = beatPos;
    } else {
      blockPlayer();
      if (blockPos !== "") {
        mark = blockPos;
      } else {
        var arrPos = Math.floor(Math.random() * (arr.length - 1 - 0 + 1)) + 0;
        mark = arr[arrPos];
      }
    }
    
    
    computerMarkArr.push(mark);
    usedSpaces(mark);
    checkForWin(computerMarkArr);
    turn = true;
    
    return mark;
    

  }, 1200);
}

 
 
 
 
 
 export function computerTurn() {
   console.log('computerTurn');

   if (computerMarkArr.length < 3) {
      return randomChoice(cornerSpacesIds);
    }
    return randomChoice(spacesArr);
    
 }