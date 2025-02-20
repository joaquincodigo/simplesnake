window.addEventListener("load", () => {
  //  ==================== VARIABLES ====================
  let SNAKE = {
    body: [
      { x: 13, y: 10 },
      { x: 12, y: 10 },
      { x: 11, y: 10 },
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
    ],

    get head() {
      return this.body[0];
    },

    get tail() {
      return this.body[this.body.length - 1];
    },
  };

  let MOVING_DIRECTION = "east";
  let FRUIT_CELL = { x: 1, y: 2 }; // ToDo: Get a random cell coordiantes for a fruit
  let GRID_DIMENTIONS = { x: 20, y: 15 };

  //  ==================== FUNCTIONS ====================
  function mountHtmlGrid() {
    let gridXSize = GRID_DIMENTIONS.x;
    let gridYSize = GRID_DIMENTIONS.y;

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
    // console.log("renderFrame() called.");

    // Delete current snake body
    for (const bodyChunk of SNAKE.body) {
      let oldSnakeCell = document.getElementById(
        `${bodyChunk.x},${bodyChunk.y}`
      );
      oldSnakeCell.classList.remove("snake");
      oldSnakeCell.classList.remove("head");
    }

    // Update snake body
    moveSnake(MOVING_DIRECTION);

    // Render new snake body
    for (let i = 0; i < SNAKE.body.length; i++) {
      const bodyChunk = SNAKE.body[i];

      let newSnakeCell = document.getElementById(
        `${bodyChunk.x},${bodyChunk.y}`
      );
      newSnakeCell.classList.add("snake");
      if (i === 0) {
        newSnakeCell.classList.add("head");
      }
    }
  }

  function moveSnake() {
    /* The movement of the snake is an ilussion caused by
    removing its tail and adding a new head in the square
    to which the snake is moving to.  */

    // Remove the tail
    SNAKE.body.pop();

    switch (MOVING_DIRECTION) {
      // Add the new head in the corresponding direction

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
          if (MOVING_DIRECTION != "south") {
            MOVING_DIRECTION = "north";
          }
          break;

        case "ArrowRight":
          if (MOVING_DIRECTION != "west") {
            MOVING_DIRECTION = "east";
          }
          break;

        case "ArrowDown":
          if (MOVING_DIRECTION != "north") {
            MOVING_DIRECTION = "south";
          }
          break;

        case "ArrowLeft":
          if (MOVING_DIRECTION != "east") {
            MOVING_DIRECTION = "west";
          }
          break;
      }
    });
  }

  function handleCollision() {
    const isWallColission = () => {
      return (
        SNAKE.head.y === 0 || // Top wall
        SNAKE.head.x === 0 || // Left wall
        SNAKE.head.y === GRID_DIMENTIONS.y || // Bottom wall
        SNAKE.head.x === GRID_DIMENTIONS.x // Right wall
      );
    };

    const isSelfColission = () => {
      // TODO
    };

    const isFruitColission = () => {
      return SNAKE.head === FRUIT_CELL;
    };

    // Testing Testing Testing Testing Testing Testing
    if (isWallColission()) {
      console.error("WALL HIT");
    }

    // if (isSelfColission()) {
    //   console.error("SELF HIT");
    // }

    if (isFruitColission()) {
      console.error("Fruit Colided");
    }
    // Testing Testing Testing Testing Testing Testing
  }

  function createNewFruit() {
    // TODO
  }

  function main() {
    mountHtmlGrid();
    initializeKeyHandling();

    setInterval(() => {
      renderFrame();
      handleCollision();
    }, 500);
  }

  //  ==================== START ====================
  main();
});
