const board = document.getElementById("board");
var cells;
var matrix = [];
let row;
let col;
renderBoard();


function renderBoard(cellWidth = 10) {
    row = Math.floor(board.clientHeight / cellWidth);
    col = Math.floor(board.clientHeight / cellWidth);
    cells = [];
    for (let i = 0; i < row; i++) {
        const rowArr = [];
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        rowElement.setAttribute('id', `${i}`);
        for (let j = 0; j < col; j++) {
            const colElement = document.createElement('div');
            colElement.classList.add('col');
            colElement.setAttribute('id', `${i}-${j}`);
            cells.push(colElement);
            rowArr.push(colElement);

            rowElement.appendChild(colElement);
        }
        matrix.push(rowArr);
        board.appendChild(rowElement);
    }
}

// console.log(matrix); 


function boardInteraction(cells) {
    let draging = false;
    let drawing = false;
    let dragStart = null;
    cells.forEach((cell) => {
        const pointDown = (e) => {
            if (e.target.classList.contains('source')) {
                dragStart = 'source';
                draging = true;
            }
            else if (e.target.classList.contains('target')) {
                dragStart = 'target';
                draging = true;
            }
            else {
                drawing = true;
            }
        }

        const pointUp = () => {
            drawing = false;
            draging = false;
            dragStart = null;
            matrix[source.x][source.y].classList.remove('wall');
            matrix[target.x][target.y].classList.remove('wall');
        }

        const pointMove = (e) => {
            const triggerElement = document.elementFromPoint(e.clientX, e.clientY);
            if (triggerElement == null || !triggerElement.classList.contains('col')) return;
            cordinate = { ...triggerElement.id.split('-') };

            if (draging && dragStart) {

                cells.forEach(cell => {
                    cell.classList.remove(dragStart);
                })
                triggerElement.classList.add(dragStart);

                if (dragStart === 'source') {
                    source.x = Number(cordinate[0]);
                    source.y = Number(cordinate[1]);
                }
                else {
                    target.x = Number(cordinate[0]);
                    target.y = Number(cordinate[1]);
                }
            }


            else if (drawing) {
                if (triggerElement.classList.contains('source') || triggerElement.classList.contains('target'))
                    return;

                const x = Number(cordinate[0]);
                const y = Number(cordinate[1]);

                matrix[x][y].setAttribute('class', 'col wall');
            }
        }

        cell.addEventListener('pointerdown', pointDown);
        cell.addEventListener('pointermove', pointMove);
        cell.addEventListener('pointerup', pointUp);

        cell.addEventListener('click', () => {
            if (cell.classList.contains('source') || cell.classList.contains('target'))
                return;

            cell.classList.remove('visited', 'path');
            cell.classList.toggle('wall');
        })
    })

}

// board interactions
function isValid(x, y) {
    return (x >= 0 && y >= 0 && x < row && y < col);
}
function set(className, x = -1, y = -1) {
    if (isValid((x, y) && (x < 10) && y < 10)) {
        matrix[x][y].classList.add(className);
    }
    else {
        x = Math.floor(Math.random() * 5);
        y = Math.floor(Math.random() * 5);
        matrix[x][y].classList.add(className);
    }
    if (x === y) {
        y = x + 2;
    }
    // console.log(x, y);
    return { x, y };
}
let source = set('source');
let target = set('target');
let isDrawing = false;
let isDragging = false;
let dragPoint = null;
cells.forEach((cell) => {

    const pointerdown = (e) => {
        if (e.target.classList.contains('source')) {
            dragPoint = 'source';
            isDragging = true;
        }
        else if (e.target.classList.contains('target')) {
            dragPoint = 'target';
            isDragging = true;
        }
        else {
            isDrawing = true;
        }
    }
    const pointermove = (e) => {
        if (isDrawing) {
            e.target.classList.add('wall');
        }
        else if (dragPoint && isDragging) {
            cells.forEach(cell => {
                cell.classList.remove(`${dragPoint}`);
            })
            e.target.classList.add(`${dragPoint}`);
            cordinate = e.target.id.split('-');

            if (dragPoint === 'source') {
                source.x = +cordinate[0];
                source.y = +cordinate[1];
            }
            else {
                target.x = +cordinate[0];
                target.y = +cordinate[1];
            }
        }
    }
    const pointerup = () => {
        isDragging = false;
        isDrawing = false;
        dragPoint = null;
    }

    cell.addEventListener('pointerdown', pointerdown);
    cell.addEventListener('pointermove', pointermove);
    cell.addEventListener('pointerup', pointerup);
    cell.addEventListener('click', () => {
        cell.classList.toggle('wall');
    })
})



// bfs

var visitedCell = [];
var pathToAnimate;
var visitedNodeSize = 0;
const btn = document.getElementById('submit');
const algorithm = document.getElementById('algorithm');
const visitedNode = document.getElementById("visited-node")
// console.log(typeof (algorithm.value));

btn.addEventListener('click', () => {
    if (algorithm.value === "1") {
        visitedCell = [];
        pathToAnimate = [];
        bfs();
        animate(visitedCell, 'visited');
        console.log("clicked")
        setTimeout(() => {
            visitedNode.innerHTML = visitedNodeSize;
        }, 5000);
        setTimeout(() => {
            distance.innerHTML = cnt;
        }, 5000);
    }
})

const clearBtn = document.getElementById("clear");

function clearBoard() {
    cells.forEach(cell => {
        cell.classList.remove('visited');
        cell.classList.remove('wall');
        cell.classList.remove('path');
        visitedNode.innerHTML = 0;
        distance.innerHTML = 0;
    })
}

clearBtn.addEventListener('click', clearBoard);

function bfs() {
    const queue = [];
    const visited = new Set();
    const parent = new Map();

    queue.push(source);
    visited.add(`${source.x}-${source.y}`);


    while (queue.length > 0) {
        const cur = queue.shift();
        visitedCell.push(matrix[cur.x][cur.y]);

        if (cur.x === target.x && cur.y === target.y) {
            getPath(parent, target);
            return;
        }

        const neighbours = [
            { x: cur.x - 1, y: cur.y },
            { x: cur.x, y: cur.y + 1 },
            { x: cur.x + 1, y: cur.y },
            { x: cur.x, y: cur.y - 1 }
        ];

        for (const neighbour of neighbours) {
            const key = `${neighbour.x}-${neighbour.y}`;
            if (isValid(neighbour.x, neighbour.y) && !visited.has(key) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                queue.push(neighbour);
                visited.add(key);
                parent.set(key, cur);
            }
        }
        visitedNodeSize = visitedCell.length;
    }
}

// animation

function animate(elements, className) {
    let delay = 10;
    if (className === 'path') {
        delay *= 4;
    }
    for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
            elements[i].classList.remove('visited');
            elements[i].classList.add(className);
            if (i === elements.length - 1 && className === 'visited') {
                animate(pathToAnimate, 'path');
            }
        }, delay * i)
    }
}
var cnt = 0;
const distance = document.getElementById("distance");
function getPath(parent, target) {
    if (!target) {
        return;
    }
    cnt++;
    pathToAnimate.push(matrix[target.x][target.y]);

    const p = parent.get(`${target.x}-${target.y}`);
    getPath(parent, p);
}
