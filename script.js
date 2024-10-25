window.addEventListener("load", (event) => {
  let boardElem = document.getElementById("board");
  let board = Array.from({ length: 20 }, () => Array(20).fill(0));

	function createRow() {
		let row = document.createElement("div")
		row.className = "row"
		return row
	}

	function createCell() {
		let cell = document.createElement("div")
		cell.className = "cell"
		return cell
	}

	function renderBoard() {
		for (let row = 0; row < board.length; row++) {
			const rowElem = createRow();
			boardElem.appendChild(rowElem);
			
			for (let cell = 0; cell < board[row].length; cell++) {
				rowElem.appendChild(createCell());
			}
		}
	}

	// 0 = Empty Space
	// 1 = Snake
	// 2 = Food
	
	
	renderBoard()
});
