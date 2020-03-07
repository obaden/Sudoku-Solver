import Solver from "./Solver";

class Backtracking extends Solver {
  async solve(speed) {
    let positionsToChange = [];
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (this.board[row][column] === "") {
          positionsToChange.push([row, column]);
        }
      }
    }
    let position = 0;
    while (position < positionsToChange.length && position >= 0) {
      let x = positionsToChange[position][0];
      let y = positionsToChange[position][1];
      let newVal = this.board[x][y] === "" ? 1 : this.board[x][y] + 1;
      if (newVal === 10) {
        position--;
        if (!this.setBoard(x, y, "")) return;
        continue;
      } else {
        if (!this.setBoard(x, y, newVal)) return;
        if (this.boardIsValid()) {
          position++;
        }
      }
      if (speed > 0) {
        await this.sleep(speed);
      }
    }
    // await this.sleep(5);
    // this.solveToggle();
    this.setSolved();
  }
}

export default Backtracking;
