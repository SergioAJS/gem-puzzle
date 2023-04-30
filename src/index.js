import './index.html';
import './index.scss';
import shuffle from './assets/sounds/mixkit-retro-game-notification-212-AudioTrimmer2.wav';
import clickButton from './assets/sounds/27-107947-AudioTrimmer.mp3';
import winSound from './assets/sounds/winbandoneon-96337.mp3'

const body = document.querySelector('body');
const container = document.createElement('div');
const h1 = document.createElement('h1');
const buttonsContainer = document.createElement('div');
const startButton = document.createElement('button');
const stopButton = document.createElement('button');
const saveButton = document.createElement('button');
const loadButton = document.createElement('button');
const resultsButton = document.createElement('button');
const soundButton = document.createElement('div');

const fieldChoose = document.createElement('div');
const threeButton = document.createElement('div');
const fourButton = document.createElement('div');
const fiveButton = document.createElement('div');
const sixButton = document.createElement('div');
const sevenButton = document.createElement('div');
const eighthButton = document.createElement('div');

const countersContainer = document.createElement('div');
const movesContainer = document.createElement('div');
const timeContainer = document.createElement('div');
const movesTitle = document.createElement('div');
const timeTitle = document.createElement('div');
let movesCount = document.createElement('div');
let timeCount = document.createElement('div');
const gameField = document.createElement('div');
const congrats = document.createElement('div');
const winMessage = document.createElement('h2');
const results = document.createElement('div');
const resultsContainer = document.createElement('div');
const resultsTitle = document.createElement('h3');
const closeResults = document.createElement('button');
const saveMessage = document.createElement('saveMessage');

// Default game parameters
let field = 16;
let square;
let blankSquare = 16;
let dimension = '4 x 4';

// Create array to compare with game result
let winArray = new Array(field).fill(0).map((el, index) => index + 1);

// Save to and get from localStorage sorted by moves amount results of the game
let input;
let output = [];
let resultText = '';
let isAdd = false;
let f = [];

function checkResultsInLocalStorage() {
    if (localStorage.getItem('input') === null) {
        input = [];
    } else {
        input = JSON.parse(localStorage.getItem('input'));
    }
}

window.addEventListener('load', getResults);

function addNewResult() {
    resultsContainer.innerHTML = '';
    isAdd = true;
    resultText = `Moves: ${count + 1} Time: ${result} Dimension: ${dimension}`;
    sortResults(output, resultText);
    f.forEach((el) => {
        const gameResult = document.createElement('div');
        gameResult.classList.add('gameResult');
        gameResult.innerText = el;
        // console.log(el)
        resultsContainer.append(gameResult);
    })

    saveLocalResults(resultText);
}

function getResults() {
    checkResultsInLocalStorage();
    sortResults(input)
    output.forEach(function(res) {
        const gameResult = document.createElement('div');
        gameResult.classList.add('gameResult');
        gameResult.innerText = res;
        resultsContainer.append(gameResult);
    })
}

function saveLocalResults(res) {
    isAdd = false;
    checkResultsInLocalStorage();
    sortResults(input, res)
    input.push(res);
    localStorage.setItem('input', JSON.stringify(input));
}

// Sort and remove results
function sortResults(x, w) {
    f = [];
    let y = [];

    if (isAdd) {
        for (let i = 0; i < x.length; i++) {
            y.push(x[i].split(' '));
            y[i].shift();
        }

        if (resultText) {
            y.push(resultText.split(' '));
        }
        y.sort((a, b) => {
            return a[1] - b[1];
        })

        for (let j = 0; j < y.length; j++) {
            f.push(`${j + 1}. ${y[j].join(' ')}`);
        }
        if (f.length >= 10) {
            f.splice(10, f.length - 10);
        }
        return f;
    } else {
        output = [];
        for (let i = 0; i < x.length; i++) {
            y.push(x[i].split(' '));
        }
        if (resultText) {
            y.push(resultText.split(' '));
        }
        y.sort((a, b) => {
            return a[1] - b[1];
        })
        for (let j = 0; j < y.length; j++) {
            output.push(`${j + 1}. ${y[j].join(' ')}`);
        }
        if (output.length >= 10) {
            output.splice(10, output.length - 10);
        }
        return output;
    }
}

winMessage.classList.add('winMessage');
congrats.classList.add('hide');
results.classList.add('results');
resultsContainer.classList.add('resultsContainer');
saveMessage.classList.add('saveMessage');

body.append(congrats);
body.append(results);
results.append(resultsContainer);
congrats.append(winMessage);
body.append(saveMessage);

resultsContainer.before(resultsTitle);
resultsTitle.innerText = 'Results';

closeResults.classList.add('button')
resultsContainer.after(closeResults);
closeResults.innerText = 'Close';

let isPlay = false;
let isMuted = false;

body.classList.add('body');

container.classList.add('container');
body.append(container);

h1.classList.add('title');
h1.innerHTML = 'The Gem Puzzle';
container.append(h1);

buttonsContainer.classList.add('buttonsContainer');
container.append(buttonsContainer);

startButton.classList.add('button');
stopButton.classList.add('button');
saveButton.classList.add('button');
loadButton.classList.add('button');
resultsButton.classList.add('button');
soundButton.classList.add('soundOn');

startButton.innerHTML = 'Start';
stopButton.innerHTML = 'Pause';
saveButton.innerHTML = 'Save';
loadButton.innerHTML = 'Load';
resultsButton.innerHTML = 'Results';

buttonsContainer.append(startButton);
buttonsContainer.append(stopButton);
buttonsContainer.append(saveButton);
buttonsContainer.append(loadButton);
buttonsContainer.append(resultsButton);
buttonsContainer.append(soundButton);

let buttons = document.querySelectorAll('.button');
const audioButton = new Audio(clickButton);
audioButton.volume = 0.7;

buttons.forEach(el => el.addEventListener('click', () => {
    if (!isMuted) {
        audioButton.play();
    }
}));

countersContainer.classList.add('countersContainer');
container.append(countersContainer);

movesTitle.classList.add('moves');
movesTitle.innerHTML = 'Moves: ';

timeTitle.classList.add('time');
timeTitle.innerHTML = 'Time: ';

movesCount.classList.add('movesCount');
movesCount.innerHTML = '0';

timeCount.classList.add('timeCount');
timeCount.innerHTML = '00:00';

countersContainer.append(movesContainer);
countersContainer.append(timeContainer);

movesContainer.classList.add('movesContainer');
movesContainer.append(movesTitle);
movesContainer.append(movesCount);

timeContainer.classList.add('timeContainer');
timeContainer.append(timeTitle);
timeContainer.append(timeCount);

gameField.classList.add('gameField');
container.append(gameField);

fieldChoose.classList.add('buttonsContainer')
container.append(fieldChoose);

threeButton.classList.add('button');
fourButton.classList.add('button');
fiveButton.classList.add('button');
sixButton.classList.add('button');
sevenButton.classList.add('button');
eighthButton.classList.add('button');

threeButton.innerText = '3x3';
fourButton.innerText = '4x4';
fiveButton.innerText = '5x5';
sixButton.innerText = '6x6';
sevenButton.innerText = '7x7';
eighthButton.innerText = '8x8';

fieldChoose.append(threeButton);
fieldChoose.append(fourButton);
fieldChoose.append(fiveButton);
fieldChoose.append(sixButton);
fieldChoose.append(sevenButton);
fieldChoose.append(eighthButton);

threeButton.addEventListener('click', () => {
    field = 9;
    blankSquare = field;
    dimension = '3 x 3';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

fourButton.addEventListener('click', () => {
    field = 16;
    blankSquare = field;
    dimension = '4 x 4';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

fiveButton.addEventListener('click', () => {
    field = 25;
    blankSquare = field;
    dimension = '5 x 5';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

sixButton.addEventListener('click', () => {
    field = 36;
    blankSquare = field;
    dimension = '6 x 6';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

sevenButton.addEventListener('click', () => {
    field = 49;
    blankSquare = field;
    dimension = '7 x 7';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

eighthButton.addEventListener('click', () => {
    field = 64;
    blankSquare = field;
    dimension = '8 x 8';
    winArray = new Array(field).fill(0).map((el, index) => index + 1);
    if (!isMuted) {
        audioButton.play();
    }
    startGame();
})

resultsButton.addEventListener('click', () => {
    results.classList.remove('results');
    results.classList.add('hideResults');
})

closeResults.addEventListener('click', () => {
    results.classList.remove('hideResults');
    results.classList.add('results');
})

// create tiles for the game
let dragStartIndex;
let squares;
let items = [];

function createSquares() {
    items = [];
    for (let i = 1; i <= field; i++) {
        square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.className = 'square';

        let div = document.createElement('div');
        div.setAttribute('data-index', i - 1);
        div.className = 'dragContainer';
        gameField.appendChild(div);

        div.appendChild(square);

        if (field === 16) {
            square.style.width = '24.35%';
            square.style.height = '24.35%';
        } else if (field === 9) {
            square.style.width = '32.4%';
            square.style.height = '32.4%';
        } else if (field === 25) {
            square.style.width = '19.5%';
            square.style.height = '19.5%';
        } else if (field === 36) {
            square.style.width = '16.25%';
            square.style.height = '16.25%';
        } else if (field === 49) {
            square.style.width = '14%';
            square.style.height = '14%';
        } else if (field === 64) {
            square.style.width = '12.2%';
            square.style.height = '12.2%';
        }

        square.innerText = i;
            square.classList.add(`num${i}`);
        items.push(square)
    }
}

// Drag and Drop realization
function dragStart() {
    dragStartIndex = + this.closest('.dragContainer').getAttribute('data-index');
}

function dragOver(event) {
    event.preventDefault();
}

function dragDrop() {
    swapItems(dragStartIndex);
}

function swapItems(fromIndex) {
    if (isPlay) {
        const squareNode = squares[fromIndex];

        if (!squareNode) {
            return;
        }
        const squareNumber = +squareNode.innerHTML;
        const squarePosition = findPositionBySquareNumber(squareNumber, matrix);
        const blankSquarePosition = findPositionBySquareNumber(blankSquare, matrix);
        const isValid = isValidForSwap(squarePosition, blankSquarePosition);

        if (isValid) {
            squares[fromIndex].style.transition = 'transform 0s';
            squares[field - 1].style.transition = 'transform 0s';

            swap(squarePosition, blankSquarePosition, matrix);
            setPositionItems(matrix);
            if (!isMuted) {
                shuffleSound.play();
            }
            count++;
            movesCount.innerText = count;
        }
    }
}

// add listeners to tiles for drag and drop
function addEventListeners() {
    const draggables = document.querySelectorAll('.square');
    const squareContainers = document.querySelectorAll('.dragContainer');

    draggables.forEach(draggable => {
        if (+ draggable.innerText !== field ) {
            draggable.addEventListener('dragstart', dragStart);
        }
    })

    squareContainers[field - 1].addEventListener('dragover', dragOver);
    squareContainers[field - 1].addEventListener('drop', dragDrop);
}

// Game duration timer
let count;
const shuffleSound = new Audio(shuffle);
shuffleSound.volume = 0.7;
let startTimer;
let id;
let result;
let pausedTime;

function timer(start) {
    clearTimeout(id);
    let delta = Date.now() - start;
    let time = (Math.floor(delta / 1000));
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    result = `${minutes}:${seconds}`;
    timeCount.innerText = result;
    id = setTimeout(function () {
        timer(start)
    }, 200);
}

function pauseTimer() {
    result = timeCount.textContent;
    clearTimeout(id);
}

function resumeTimer() {
    pausedTime = result.split(':');
    pausedTime = parseInt(pausedTime[0]) * 60 + parseInt(pausedTime[1]);
    pausedTime = Date.now() - pausedTime * 1000;
    timer(pausedTime);
}

// Starting the game
let startButtonClickCount = 0;
let isPausable = true;
let squareArray = new Array;
let matrix = new Array;

function startGame() {
    gameField.innerHTML = '';
    createSquares();
    squares = document.querySelectorAll('.square');
    squareArray = Array.from(squares);
    matrix = getMatrix(squareArray.map((item) => + item.innerHTML));
    setPositionItems(matrix);

    isPausable = true;
    startButtonClickCount++;
    squares.forEach(el => {
        el.style.display = 'flex';
        if (el.innerText !== `${field}`) {
            el.style.opacity = null;
        }
        if (el.innerText === `${field}`) {
            el.style.opacity = '0';
        }
        el.style.color = 'black';
    });
    addEventListeners();
    movesCount.innerText = 0;
    isPlay = true;
    stopButton.innerHTML = 'Pause';
    mix();
    count = 0;
    startTimer = Date.now();
    timer(startTimer);
}

startButton.addEventListener('click', startGame);

stopButton.addEventListener('click', () => {
    if (stopButton.innerHTML === 'Pause' && startButtonClickCount > 0 && isPausable) {
        stopButton.innerHTML = 'Continue';
        isPlay = false;
        squares.forEach(el => {
            el.style.color = 'rgb(233, 168, 224)';
            el.style.opacity = 0.2;
        });
        pauseTimer();
    } else if (startButtonClickCount > 0 && isPausable) {
        stopButton.innerHTML = 'Pause';
        isPlay = true;
        squares.forEach(el => {
            el.style.display = 'flex';
            el.style.color = 'black';
            if (el.innerText === `${field}`) {
                el.style.opacity = '0';
            }
            if (el.innerText !== `${field}`) {
                el.style.opacity = null;
            }
        });
        resumeTimer();
    }
})

soundButton.addEventListener('click', () => {
    soundButton.classList.toggle('soundOn');
    soundButton.classList.toggle('soundOff');
    if (soundButton.classList.contains('soundOn')) {
        isMuted = false;
    } else {
        isMuted = true;
    }
})

// create 2D matrix
function getMatrix(arr) {
    let matrix = new Array;
    // let matrix = Array.from(Array(Math.sqrt(field)), () => new Array());
    let j = 0;
    if (field === 16) {
        matrix = [[], [], [], []];
        j = 4;
    } else if (field === 9) {
        matrix = [[], [], []];
        j = 3;
    } else if (field === 25) {
        matrix = [[], [], [], [], []];
        j = 5;
    } else if (field === 36) {
        matrix = [[], [], [], [], [], []];
        j = 6;
    } else if (field === 49) {
        matrix = [[], [], [], [], [], [], []];
        j = 7;
    } else {
        matrix = [[], [], [], [], [], [], [], []];
        j = 8;
    }

    let x = 0;
    let y = 0;

    for (let i = 0; i < arr.length; i++) {
        if (x >= j) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix;
}

// positioning tiles on the game field
function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = squareArray[value - 1];
            setNodeStyles(node, x, y);
        }
    }
}

// add styles ti tiles for positioning
function setNodeStyles(node, x ,y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`
}

// mix tiles and set them on the board if combination can be solved
function mix() {
    const flatMatrix = matrix.flat();
    const mixedArray = mixArray(flatMatrix);
    matrix = getMatrix(mixedArray);
    setPositionItems(matrix);
    if (!isSolvable(matrix)) {
        inv = 0;
        mix();
    }
}

// mix tiles
function mixArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
}

// swap tiles on click
function swapListener(event) {
    if (isPlay) {
        const squareNode = event.target.closest('.square');
        if (!squareNode) {
            return;
        }
        const squareNumber = +squareNode.innerHTML;
        const squarePosition = findPositionBySquareNumber(squareNumber, matrix);
        const blankSquarePosition = findPositionBySquareNumber(blankSquare, matrix);
        const isValid = isValidForSwap(squarePosition, blankSquarePosition);

        if (isValid) {
            squareNode.style.transition = 'transform 0.5s';

            swap(squarePosition, blankSquarePosition, matrix);
            setPositionItems(matrix);
            if (!isMuted) {
                shuffleSound.play();
            }
            count++;
            movesCount.innerText = count;
        } else {
        }
    }
}

gameField.addEventListener('click', swapListener)

// add coordinates to each tile
function findPositionBySquareNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) {
                return {x, y};
            }
        }
    }
    return null;
}

// check if is tiles can be swapped
function isValidForSwap(position1, position2) {
    const diffX = Math.abs(position1.x - position2.x);
    const diffY = Math.abs(position1.y - position2.y);

    return (diffX === 1 || diffY === 1) && (position1.x === position2.x || position1.y === position2.y);
}

// swap tiles and compare result position with winning position
function swap(position1, position2, matrix) {
    const position1Number = matrix[position1.y][position1.x];
    matrix[position1.y][position1.x] = matrix[position2.y][position2.x];
    matrix[position2.y][position2.x] = position1Number;

    if (isWin(matrix)) {
            addNewResult();
            addWinClass();
    }
}

// check for win
function isWin(matrix) {
    const flatMatrix = matrix.flat();
    for (let i = 0; i < flatMatrix.length; i++) {
        if (flatMatrix[i] !== winArray[i]) {
            isPausable = true;
            return false;
        }
    }
    isPausable = false;
    return true;
}

const WIN = new Audio(winSound);
WIN.volume = 0.7;
let message;

// show congratulations
function addWinClass() {
    pauseTimer();
    isPlay = false;
    message = setTimeout(() => {
        if (!isMuted) {
            WIN.play();
        }
        winMessage.innerText = `Hooray! You solved the puzzle in ${result} and ${count} moves!`;
        congrats.classList.toggle('show');
        body.classList.toggle('transparent');
    }, 200);
    setTimeout(() => {
        congrats.classList.toggle('show');
        body.classList.toggle('transparent');
    }, 4000);
}

// check combination inversions
let inv = 0;

function isSolvable(matrix) {
    let splitter = 0;
    let mat = matrix.flat();
    for (let i = 0; i < field; i++) {
        if (mat[i] !== field) {
            for (let j = 0; j < i; j++) {
                    if ((mat[j] > mat[i]) && mat[j] !== field) {
                        ++inv;
                    }
                }
            }
        }
    for (let u = 0; u < field; u++) {
        if (mat[u] === field) {
            if (field === 16) {
                splitter = 4;
                inv = inv + 1 + Math.floor(u / splitter);
            } else if (field === 9) {
                splitter = 3;
                inv = inv;
            } else if (field === 25) {
                splitter = 5;
                inv = inv;
            } else if (field === 36) {
                splitter = 6;
                inv = inv + 1 + Math.floor(u / splitter);
            } else if (field === 49) {
                splitter = 7;
                inv = inv;
            } else if (field === 64) {
                splitter = 8;
                inv = inv + 1 + Math.floor(u / splitter);
            }
        }
    }
    if (inv % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

// save position to and load position from localStorage
function setLocalStorage() {
    localStorage.setItem('matrix', matrix);
    localStorage.setItem('count', count);
    localStorage.setItem('time', result);
    localStorage.setItem('field', field);
    localStorage.setItem('blankSquare', blankSquare);
    setTimeout(() => {
        saveMessage.innerText = 'Game has been saved';
        saveMessage.classList.toggle('show');
    }, 200);
    setTimeout(() => {
        saveMessage.classList.toggle('show');
    }, 2000);
}

saveButton.addEventListener('click', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('count') === null) {
        setTimeout(() => {
            saveMessage.innerText = 'No saved games';
            saveMessage.classList.toggle('show');
        }, 200);
        setTimeout(() => {
            saveMessage.classList.toggle('show');
        }, 2000);
        return;
    } else {
        count = localStorage.getItem('count');
        movesCount.innerHTML = count;
        result = localStorage.getItem('time');
        resumeTimer();
        field = parseInt(localStorage.getItem('field'));
        blankSquare = parseInt(localStorage.getItem('blankSquare'));
        gameField.innerHTML = '';
        createSquares();
        squares = document.querySelectorAll('.square');

        squareArray = Array.from(squares);

        let arr = localStorage.getItem('matrix').replace(/,/g, ' ').split(' ');
        arr = arr.map(el => + el);
        matrix = getMatrix(arr);
        stopButton.innerHTML = 'Pause';
        isPlay = true;
        isPausable = true;
        startButtonClickCount = 1;
        squares.forEach(el => {
            if (el.innerText !== `${field}`) {
                el.style.display = 'flex';
                el.style.opacity = null;
            }
            if (el.innerText === `${field}`) {
                el.style.display = 'flex';
                el.style.opacity = '0';
            }
            el.style.color = 'black';
        });
        addEventListeners();
        setPositionItems(matrix);
        winArray = new Array(field).fill(0).map((el, index) => index + 1);
        if (field === 9) {
            dimension = '3 x 3';
        } else if (field === 16) {
            dimension = '4 x 4';
        } else if (field === 25) {
            dimension = '5 x 5';
        } else if (field === 36) {
            dimension = '6 x 6';
        } else if (field === 49) {
            dimension = '7 x 7';
        } else if (field === 64) {
            dimension = '8 x 8';
        }
    }
}

loadButton.addEventListener('click', getLocalStorage);