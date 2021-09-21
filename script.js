
const DomElements = (() => {
    let player1NameInput = document.querySelector("#name1");
    let player2NameInput = document.querySelector("#name2");
    
})()



const Gameboard = (() => {
    
    const cells = [   
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const winnerRows = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    const startGame = () => {

        DisplayController.displayBoard();
        const player1 = Player()

    }

    return {cells, winnerRows}
})()


const Player = (name, symbol) => {
    return {name, symbol}
}

const gameBoardNode = document.querySelector("#gameBoard");
let   gameBoardDivs;



const DisplayController = (() => {
    const displayBoard = () => {
        while (gameBoardNode.firstChild) {
            gameBoardNode.removeChild(gameBoardNode.firstChild)
        }
        Gameboard.cells.forEach((cell, index) => {
            let div = document.createElement("div");
            div.classList.add("gameDiv");
            div.innerText = cell;
            div.setAttribute("index", `${index}`)
            gameBoardNode.appendChild(div)
        })
        gameBoardDivs = gameBoardNode.querySelectorAll("div")
    }
 
    const makeBoardPlayable = () => {
        gameBoardDivs.forEach(div => div.addEventListener("click", () => {
            Gameboard.cells[+div.getAttribute("index")] = 2;
            div.innerText = Gameboard.cells[+div.getAttribute("index")];
        }))
    }

    return {displayBoard, makeBoardPlayable}
})()



DisplayController.displayBoard();
DisplayController.makeBoardPlayable()



document.querySelector("#startButton").addEventListener("click", () => {
    document.body.style.backgroundColor = "rgb(78, 76, 76)"
    document.querySelector("#playersForm").classList.add("playersFormOpen")
})