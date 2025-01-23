window.addEventListener("load", () => {
  //  ==================== VARIABLES ====================
  // let screenHTML = document.getElementById("game-screen");
  let SNAKE = {
    body: [
      { x: 7, y: 10 },
      { x: 8, y: 10 },
      { x: 9, y: 10 },
      { x: 10, y: 10 },
      { x: 11, y: 10 },
      { x: 12, y: 10 },
      { x: 13, y: 10 },
    ],

    get head() {
      return this.body[0];
    },

    get tail() {
      return this.body[this.body.length - 1];
    },
  };

  MOVING_DIRECTION = "east";

  //  ==================== FUNCTIONS ====================

  function mountHtmlGrid() {
    let gridYSize = 15;
    let gridXSize = 20;

    for (let i = 0; i <= gridYSize; i++) {
      // Create a row
      let row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j <= gridXSize; j++) {
        // Create a cell
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", `${j},${i}`); // Id for editing contents

        // Mount a cell
        row.appendChild(cell);
      }

      // Mount a row
      document.getElementById("game-grid-container").appendChild(row);
    }
  }

  function renderFrame() {
    // Delete current snake body
    for (const bodyChunk of SNAKE.body) {
      let oldSnakeCell = document.getElementById(
        `${bodyChunk.x},${bodyChunk.y}`
      );
      oldSnakeCell.classList.remove("snake");
    }
    // Update snake body
    moveSnake(MOVING_DIRECTION);

    // Render new snake body
    for (const bodyChunk of SNAKE.body) {
      let newSnakeCell = document.getElementById(
        `${bodyChunk.x},${bodyChunk.y}`
      );
      newSnakeCell.classList.add("snake");
    }
  }

  function moveSnake() {
    // Remove the tail
    SNAKE.body.pop();

    switch (MOVING_DIRECTION) {
      // Add the new head

      case "north":
        SNAKE.body.unshift({ x: SNAKE.head.x, y: SNAKE.head.y - 1 });
        break;

      case "east":
        SNAKE.body.unshift({ x: SNAKE.head.x + 1, y: SNAKE.head.y });
        break;

      case "south":
        SNAKE.body.unshift({ x: SNAKE.head.x, y: SNAKE.head.y + 1 });
        break;

      case "west":
        SNAKE.body.unshift({ x: SNAKE.head.x - 1, y: SNAKE.head.y });
        break;
    }
  }

  function initializeKeyHandling() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          console.log("arrow up!");

          MOVING_DIRECTION = "north";
          break;

        case "ArrowRight":
          MOVING_DIRECTION = "east";
          break;

        case "ArrowDown":
          MOVING_DIRECTION = "south";
          break;

        case "ArrowLeft":
          MOVING_DIRECTION = "west";
          break;
      }
    });
  }

  function main() {
    mountHtmlGrid();
    initializeKeyHandling();
    setInterval(() => {
      renderFrame();
    }, 300);
  }
  //  ==================== START ====================

  main();
});
