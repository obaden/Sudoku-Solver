import React from "react";
import Board from "./Board";
import Backtracking from "./Algorithms/Backtracking";

const defaultBoards = [
  [
    ["", "", "", "", "", 6, 4, 8, 1],
    [8, "", 5, "", 9, 4, 2, "", ""],
    [1, "", 4, 7, "", 2, "", "", ""],
    ["", "", 6, "", "", "", 3, 1, 4],
    [5, "", 3, "", 1, 8, "", "", 6],
    ["", 9, 1, "", 4, 3, "", "", ""],
    ["", "", "", 4, "", "", "", 6, ""],
    [6, "", 9, "", 3, 1, 7, "", 2],
    ["", 1, "", "", "", "", "", 5, ""]
  ],
  [
    [5, 4, 3, "", "", "", "", "", ""],
    ["", "", "", "", "", "", 7, "", 9],
    [8, "", "", "", "", 2, 5, "", ""],
    ["", "", 9, 2, "", "", "", 5, ""],
    [6, 5, 4, "", "", "", "", "", ""],
    ["", "", "", 7, 6, "", "", "", ""],
    ["", "", "", 9, "", 3, "", "", ""],
    ["", "", "", "", "", "", 1, 3, ""],
    [2, "", 6, "", "", 4, "", 7, ""]
  ],
  [
    ["", "", 6, "", "", 4, "", "", ""],
    [3, "", "", 1, "", "", 8, "", ""],
    [1, "", "", "", "", "", 6, "", ""],
    ["", "", 7, "", 8, "", "", "", 3],
    ["", "", 1, "", 5, "", "", "", 9],
    ["", 8, "", 7, "", "", "", "", ""],
    ["", 7, "", "", "", 9, "", 4, ""],
    ["", "", "", "", "", 3, "", 9, ""],
    [4, "", "", "", 1, "", "", "", ""]
  ]
];

class SudokuController extends React.Component {
  constructor(props) {
    super(props);
    //initialises the current board to be a copy of the default board
    this.state = {
      solveSpeed: 50,
      solving: false,
      stopping: false,
      solved: false,
      Boards: [
        this.copyBoard(defaultBoards[0]),
        this.copyBoard(defaultBoards[1]),
        this.copyBoard(defaultBoards[2])
      ],
      SolvedBoard: null,
      boardID: 0,
      currentBoard: this.copyBoard(defaultBoards[0]),
      beforeSolve: null
    };
  }

  // makes a deep copy of a board
  copyBoard = board => {
    var newBoard = [];
    for (let i = 0; i < board.length; i++) {
      newBoard.push(board[i].slice());
    }
    return newBoard;
  };

  updateBoard = (x, y, val) => {
    if (this.state.stopping) {
      this.setState({ stopping: false, solving: false });
      return false;
    }
    if (this.state.SolvedBoard) {
      this.setState({ SolvedBoard: null });
    }
    let newBoard = this.state.currentBoard;
    newBoard[x][y] = val;
    this.setState({ currentBoard: newBoard });
    return true;
  };

  setSolved = () => {
    this.setState({ SolvedBoard: this.state.currentBoard });
  };

  solve = () => {
    this.setState(
      {
        currentBoard: this.copyBoard(defaultBoards[this.state.boardID]),
        stopping: false,
        solving: true,
        beforeSolve: this.copyBoard(this.state.currentBoard)
      },
      () => {
        let solver = new Backtracking(
          this.state.currentBoard,
          this.updateBoard,
          this.setSolved
        );
        solver.solve(this.state.solveSpeed);
      }
    );
  };

  unsolve = () => {
    this.setState({
      stopping: this.state.SolvedBoard ? false : true,
      solving: false,
      currentBoard: this.copyBoard(this.state.beforeSolve)
    });
  };

  changeBoard = board => {
    if (this.state.boardID !== board) {
      this.setState({ SolvedBoard: null });
      switch (this.state.boardID) {
        case 0:
          this.setState({
            Boards: [
              this.copyBoard(this.state.currentBoard),
              this.state.Boards[1],
              this.state.Boards[2]
            ]
          });
          break;
        case 1:
          this.setState({
            Boards: [
              this.state.Boards[0],
              this.copyBoard(this.state.currentBoard),
              this.state.Boards[2]
            ]
          });
          break;
        case 2:
          this.setState({
            Boards: [
              this.state.Boards[0],
              this.state.Boards[1],
              this.copyBoard(this.state.currentBoard)
            ]
          });
          break;
        default:
          break;
      }
      this.setState({
        currentBoard: this.copyBoard(this.state.Boards[board]),
        boardID: board,
        solving: false
      });
    }
  };

  clear = () => {
    this.setState({
      stopping: this.state.solving,
      solving: false,
      currentBoard: this.copyBoard(defaultBoards[this.state.boardID])
    });
  };

  render() {
    return (
      <div className="Sudoku">
        <Board
          solving={this.state.solving}
          solvedBoard={this.state.SolvedBoard}
          update={this.updateBoard}
          numbers={this.state.currentBoard}
          default={defaultBoards[this.state.boardID]}></Board>
        <div className="Buttons">
          <div className="difficulty">
            <h1>Board Select</h1>
            <button
              className={this.state.boardID === 0 ? "selected" : ""}
              disabled={this.state.solving || this.state.boardID === 0}
              onClick={() => this.changeBoard(0)}>
              Easy
            </button>
            <button
              className={this.state.boardID === 1 ? "selected" : ""}
              disabled={this.state.solving || this.state.boardID === 1}
              onClick={() => this.changeBoard(1)}>
              Medium
            </button>
            <button
              className={this.state.boardID === 2 ? "selected" : ""}
              disabled={this.state.solving || this.state.boardID === 2}
              onClick={() => this.changeBoard(2)}>
              Hard
            </button>
          </div>
          <div className="Control">
            <h2>Solve speed</h2>
            <select
              id="speed"
              disabled={this.state.solving}
              onChange={e => {
                this.setState({ solveSpeed: Number(e.target.value) });
              }}>
              <option value="50">Slow</option>
              <option value="10">Medium</option>
              <option value="1">Fast</option>
              <option value="0">Instant</option>
            </select>
            <button
              id="solve"
              onClick={this.state.solving ? this.unsolve : this.solve}>
              {this.state.solving ? "Return To Board" : "Solve"}
            </button>
            <button id="clear" onClick={this.clear}>
              Clear Board
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SudokuController;
