const cells = document.querySelectorAll('.cell');

const p1 = {
    text: "X",
    cells:[],
}
const p2 = {
    text: "O",
    cells:[],
}
let currentPlayer= p1;

function switchPlayer() {
    currentPlayer = currentPlayer.text === p1.text ? p2 : p1;
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.classList.contains('taken')) {
        return;
      }

    cell.textContent = currentPlayer.text;
    cell.classList.add('taken');
    currentPlayer.cells.push(cell);

if (isDraw()) {
    drawAction();
    return
}

   if( isWonCombination(currentPlayer.cells)) {
    winAction();
    return
   };
    switchPlayer();
}

cells.forEach((cell,index) => {
    cell.id=index;
    cell.addEventListener('click', handleCellClick);
  });


  function isWonCombination(cells) {
   const ids =  cells.map(cell=>Number.parseInt(cell.id)).sort();
    const winLineCombos =[[0,1,2],[3,4,5],[6,7,8]]
    const winRowCombos =[[0,3,6],[1,4,7],[2,5,8]]
    const winDiagonals = [[0,4,8],[2,4,6]]
    const winCombos = winLineCombos.concat(winRowCombos).concat(winDiagonals);

    return winCombos.some(winCombo => 
        winCombo.every(num => ids.includes(num))
    );
  }

  const menu = document.getElementById('menu');
  const winnerText = document.getElementById('winner-text');
  function winAction() {
    menu.style.display='flex';
    let text ="Победили ";
    text +=currentPlayer.text === p1.text ? "крестики!" : "Нолики!";
    winnerText.textContent =  text;
  }

  const resetButton = document.getElementById('restart-button');
  function restart() {
    winAction.textContent ="";
    p1.cells =[];
    p2.cells=[];

    cells.forEach(cell=>{
        cell.classList.remove('taken');
        cell.textContent=""
    })
    menu.style.display='none';
  }

  resetButton.addEventListener('click',restart)

  function isDraw() {
    let takenCount=0
cells.forEach(cell=>{
    if (cell.classList.contains('taken')) {
        takenCount++;
    }
})   
return takenCount ===9;
  }

  function drawAction() {
    menu.style.display='flex';
    let text ="Ничья!";
    
    winnerText.textContent =  text;
  }