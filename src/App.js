import React, { Component } from 'react';
import Board from './components/board';
import Square from './components/square';
import PlayAgain from './components/play_again';
import './App.css';


const winArr = [
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

const initialState = {
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


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = initialState;
    
    this.handleClick = this.handleClick.bind(this);
  }

  resetState() {
    this.setState(Object.assign({}, initialState, { start: true }), this.computerTurn);
  }
  
  startGame() {
    this.setState({
      start: true
    }, this.computerTurn);
  }
  
  beatPlayer() {
    let tempArr = [];
    let beatPos = '';
    winArr.forEach(win => {
      tempArr.length = 0;
      this.state.computerMarkArr.forEach(pos => {
        if (win.indexOf(pos) !== -1) {
          tempArr.push(pos);
          if (tempArr.length === 2) {
            win.forEach(winPos => {
              if (tempArr.indexOf(winPos) === -1) {
                if (this.state.openSpaces.indexOf(winPos) !== -1) {
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
   
  blockPlayer() {
    let tempArr = [];
    let blockPos = '';
    winArr.forEach(win => {
      tempArr.length = 0;
      this.state.playerMarkArr.forEach(pos => {
        if (win.indexOf(pos) !== -1) {
          tempArr.push(pos);
          if (tempArr.length === 2) {
            win.forEach(winPos => {
              if (tempArr.indexOf(winPos) === -1) {
                if (this.state.openSpaces.indexOf(winPos) !== -1) {
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
  
  checkForWin(arr) {
    winArr.forEach(win => {
      if (
          arr.indexOf(win[0]) !== -1 &&
          arr.indexOf(win[1]) !== -1 &&
          arr.indexOf(win[2]) !== -1
        ) 
      {
        this.setState({
          win: true
        });

      }
    });
    
    if (!this.state.win && arr.length === 5) {
      this.setState({
        tie: true
      });
    }
  }
  
  randomChoice(arr) {
    let mark;
    const beatPos = this.beatPlayer();
    const blockPos = this.blockPlayer();
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

  computerTurn() {
    let id;
    setTimeout(() => {
      
      id = this.state.computerMarkArr.length < 3 ?
        this.randomChoice(this.state.corners) :
        this.randomChoice(this.state.openSpaces);
      
      this.setState({
        spaces: [
         ...this.state.spaces.map(sp => {
            if (sp.id === id) {
             return { ...sp, image: 'tick', played: true, owned: 'computer' };
            }
            return sp;
          })
        ],
        computerMarkArr: [ ...this.state.computerMarkArr, id ],
        openSpaces: [ ...this.state.openSpaces.filter(sp => sp !== id) ],
        corners: [ ...this.state.corners.filter(sp => sp !== id) ],
        turn: true
      }, this.checkForWin([ ...this.state.computerMarkArr, id ]));
      
    }, 1200);
   
  }
  
  handleClick(space) {
    if (this.state.turn && !space.played) {
      const updatedSpace = Object.assign({}, space, { played: true, image: 'toe', owned: 'player' });
      this.setState({
        spaces: [ ...this.state.spaces.filter(sp => sp.id !== space.id), updatedSpace ],
        openSpaces: [ ...this.state.openSpaces.filter(sp => sp !== space.id ) ],
        corners: [ ...this.state.corners.filter(sp => sp !== space.id ) ],
        playerMarkArr: [ ...this.state.playerMarkArr, space.id ],
        turn: false
      }, this.computerTurn);

    }
  }
  
  render() {
    const { win, tie, start } = this.state;
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <p className="App-intro">
          Please play responsibly. Keep hands and feet inside the ride at all times. May not be suitable for pregnant or nursing mothers. In case of rectal bleeding, discontinue use immediately. 
        </p>
        
        <Board>
        
          <PlayAgain
            message={tie ? 'Tie!' : win ? 'You Lose!' : 'Ready?'}
            activeClass={tie || win || !start ? 'play-again active' : 'play-again'}
            handleClick={!start ? this.startGame.bind(this) : this.resetState.bind(this)}
            buttonMessage="Play"
          />
          
          {
            this.state.spaces
              .sort((a, b) => a.id - b.id)
              .map(sp => (
                <Square
                  key={sp.id}
                  id={'sp' + sp.id}
                  handleClick={this.handleClick}
                  image={sp.image}
                  space={sp}
                />
              ))
          }
          
          
        </Board>
        
      </div>
    );
  }
}

export default App;
