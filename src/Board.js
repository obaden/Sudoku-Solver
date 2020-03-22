import React from "react";
import "./Board.css";

class Board extends React.Component {
  // Returns a grid of Squares based on the 2D array props.numbers of the Board.
  makeBoard() {
    let rows = [];
    let items = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let displayClass = "square";
        let isActive = this.props.default[i][j] === "" && !this.props.solving;
        if (
          this.props.solvedBoard &&
          this.props.numbers[i][j] &&
          this.props.numbers[i][j] !== this.props.solvedBoard[i][j]
        ) {
          displayClass += " wrong";
        }
        // isActive = this.props.default[i][j] === "" && !this.props.solving;
        items.push(
          <Square
            key={j}
            update={val => {
              this.props.update(i, j, val);
            }}
            class={displayClass}
            active={isActive}
            val={this.props.numbers[i][j].toString()}></Square>
        );
      }
      rows.push(
        <div className="row" key={i}>
          {items}
        </div>
      );
      items = [];
    }
    return <div className="Board">{rows}</div>;
  }

  render() {
    return this.makeBoard();
  }
}

// A square has 2 properties:
//    props.active determines whether the square can be modified
//    props.val determines the value for the square to display
function Square(props) {
  // Restricts input to numbers 1-9 and updates state of Board if input is valid
  function handleInput(e) {
    var keycode = e.target.value.charCodeAt(0);
    if (keycode < 49 || keycode > 57) {
      e.target.value = "";
    } else {
      props.update(Number(e.target.value));
    }
  }
  return (
    <input
      value={props.val}
      disabled={!props.active}
      type="text"
      maxLength="1"
      onChange={handleInput}
      className={
        props.active ? props.class + " active" : props.class + " inactive"
      }></input>
  );
}

export default Board;
