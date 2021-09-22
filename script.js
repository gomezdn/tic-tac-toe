
const Gameboard = (() => {
    
    const cells = [   
        "", "", "",
        "", "", "",
        "", "", ""
    ]

    const winnerRows = "012345678036147258048246"

    return {cells, winnerRows}
})()


const Players = (() => {
    let player1;
    let player2;
    const createPlayer = (name, mark, game) => {
        return {name, mark, game}
    }
    return {player1, player2, createPlayer}
})()

const DisplayController = (() => {

    const gameBoardNode = document.querySelector("#gameBoard");
    let gameBoardDivs;
    let currentPlayer;

    const movingBackground = (() => {
        const xAndO = ["X", "O"]
        return setInterval(() => {
            gameBoardDivs.forEach(div => {
                div.innerText = xAndO[Math.floor(Math.random() * 2)]
            })
        }, 1000)
    })()

    const toggleCurrentPlayer = () => {
        currentPlayer = currentPlayer == Players.player1 ? Players.player2 : Players.player1
    }

    const clearBoardAndDisplay = () => {
        Gameboard.cells.forEach((cell, index) => {
            Gameboard.cells[index] = ""
        })
        while (gameBoardNode.firstChild) {
            gameBoardNode.removeChild(gameBoardNode.firstChild)
        }
    }
    const displayBoard = () => {
        clearBoardAndDisplay();
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
            if (!Gameboard.cells[+div.getAttribute("index")]) {
                Gameboard.cells[+div.getAttribute("index")] = currentPlayer.mark;
                div.innerText = Gameboard.cells[+div.getAttribute("index")];
                currentPlayer.game += div.getAttribute("index");
                toggleCurrentPlayer();
            }
        }))
    }

    const newGame = () => {
        const name1 = document.querySelector("#p1Name")
        const name2 = document.querySelector("#p2Name")
        const mark1 = document.querySelector("#p1Symbol")
        const mark2 = document.querySelector("#p2Symbol")
        name1.innerText = Players.player1.name;
        name2.innerText = Players.player2.name;
        mark1.innerText = Players.player1.mark;
        mark2.innerText = Players.player2.mark;
        Gameboard.cells.forEach(cell => cell = "")
        clearInterval(movingBackground);
        displayBoard();
        makeBoardPlayable();
        currentPlayer = Players.player1;
    }

    const checkWinner = () => {
        return Gameboard.winnerRows.indexOf(currentPlayer.game)
    }
    return {displayBoard, makeBoardPlayable, newGame, toggleCurrentPlayer, checkWinner}
})()

const Interface = (() => {

    const playersForm = document.querySelector("#playersForm");
    const newGameButton = document.querySelector("#newGameButton");
    const closeFormButton = document.querySelector("#closeFormButton");
    const body = document.body;
    

    const openForm = () => {
        playersForm.style.transition = "all 0.5s";
        body.style.backgroundColor = "rgb(78, 76, 76)";
        document.getElementById("p1Name").style.color = "black"
        document.getElementById("p2Name").style.color = "black"
        playersForm.classList.add("playersFormOpen");
    }
    const closeForm = () => {
        body.style.backgroundColor = "rgb(253, 224, 185)"
        document.getElementById("p1Name").style.color = "rgb(3, 105, 128)"
        document.getElementById("p2Name").style.color = "rgb(175, 72, 3)"
        playersForm.style.transition = "all 0s";
        playersForm.classList.remove("playersFormOpen");
        playersForm.reset();
    }

    newGameButton.addEventListener("click", openForm)
    closeFormButton.addEventListener("click", closeForm)

    playersForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let player2Mark = e.target.symbolSelect.value == "X" ? "O" : "X"
        Players.player1 = Players.createPlayer(e.target.inputName1.value, e.target.symbolSelect.value, "");
        Players.player2 = Players.createPlayer(e.target.inputName2.value, player2Mark, "")
        closeForm();
        DisplayController.newGame();
    })
})()

DisplayController.displayBoard();

