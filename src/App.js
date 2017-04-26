import React, { Component } from 'react';
import Board from './components/board';
import Square from './components/square';
import PlayAgain from './components/play_again';
import {
  winArr,
  initialState,
  randomChoice
} from './utils';

import './App.css';


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
  

  computerTurn() {
    let id;
    setTimeout(() => {
      
      id = this.state.computerMarkArr.length < 3 ?
        randomChoice(this.state.corners, this.state) :
        randomChoice(this.state.openSpaces, this.state);
      
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
          <div className="tilt-header">
            <p className="tilt-left">TIC</p>
            <i className="fa fa-circle" aria-hidden="true"/>
            <p className="tilt-right">TAC</p>
            <i className="fa fa-circle" aria-hidden="true"/>
            <p className="tilt-left">TOE</p>
          </div>
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
        
        <div className="github">
          <a href="https://github.com/blehr/tic-tac-toe-react" >
            <i className="fa fa-github" aria-hidden="true"/></a>
        </div>
        
      </div>
    );
  }
}

export default App;
