class Solver {
  constructor(board, setBoard, setSolved) {
    this.board = board;
    this.setBoard = setBoard;
    this.setSolved = setSolved;
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  boardIsValid = () => {
    // Check rows
    for (let row = 0; row < 9; row++) {
      let entries = new Array(9).fill(false);
      for (let column = 0; column < 9; column++) {
        if (this.board[row][column] !== "") {
          let number = this.board[row][column] - 1;
          if (entries[number]) {
            return false;
          } else {
            entries[number] = true;
          }
        }
      }
    }
    // Check columns
    for (let column = 0; column < 9; column++) {
      let entries = new Array(9).fill(false);
      for (let row = 0; row < 9; row++) {
        if (this.board[row][column] !== "") {
          let number = this.board[row][column] - 1;
          if (entries[number]) {
            return false;
          } else {
            entries[number] = true;
          }
        }
      }
    }
    // Check Regions
    for (let region = 0; region < 9; region++) {
      let xStart = (region % 3) * 3;
      let yStart = Math.floor(region / 3) * 3;
      let entries = new Array(9).fill(false);
      // console.log(xStart, yStart);

      for (let i = 0; i < 9; i++) {
        let xPos = xStart + (i % 3);
        let yPos = yStart + Math.floor(i / 3);
        // console.log(xPos, yPos);

        if (this.board[xPos][yPos] !== "") {
          let number = this.board[xPos][yPos] - 1;
          if (entries[number]) {
            return false;
          } else {
            entries[number] = true;
          }
        }
      }
    }
    return true;
  };
}

export default Solver;
