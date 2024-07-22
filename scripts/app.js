const board = document.getElementById("board");
var cells = [];
var matrix = [];
let row;
let col;
renderBoard();


function renderBoard(cellWidth = 22) {
    row = Math.floor(board.clientHeight / cellWidth);
    col = Math.floor(board.clientHeight / cellWidth);
    cells = [];
    for (let i = 0; i < row; i++) {
        const rowArr = [];
        const rowElement = document.createElement('div');
        rowElement.setAttribute('id', `${i}`);
        rowElement.classList.add('row');
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
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * col);
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


// bfs

var visitedCell = [];
var pathToAnimate;
var visitedNodeSize = 0;
const btn = document.getElementById('submit');
const algorithm = document.getElementById('algorithm');
const visitedNode = document.getElementById("visited-node")
// console.log(typeof (algorithm.value));

// btn.addEventListener('click', () => {
//     // clearPath();
//     visitedCell = [];
//     pathToAnimate = [];

//     switch (algorithm.value) {
//         // case '': bfs(); break;
//         case '1': bfs(); break;
//         case '2':
//             if (dfs(source)) pathToAnimate.push(matrix[source.x][source.y])
//             break;
//         case '3': dijsktra(); break;
//         default: break;
//     }
//     animate(visitedCell, 'visited');
//     console.log("clicked")
//     setTimeout(() => {
//         visitedNode.innerHTML = visitedNodeSize;
//     }, 5000);
//     setTimeout(() => {
//         distance.innerHTML = cnt;
//     }, 5000);
// });

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
    if (algorithm.value === "2") {
        visitedCell = [];
        pathToAnimate = [];
        dfs(source);
        animate(visitedCell, 'visited');
        console.log("clicked")
        setTimeout(() => {
            visitedNode.innerHTML = cnt3;
        }, 5000);
        setTimeout(() => {
            distance.innerHTML = cnt2;
        }, 5000);
    }
    if (algorithm.value === "3") {
        visitedCell = [];
        pathToAnimate = [];
        dijsktra();
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
// dijsktra's algo

class PriorityQueue {
    constructor() {
        this.elements = [];
        this.length = 0;
    }
    push(data) {
        this.elements.push(data);
        this.length++;
        this.upHeapify(this.length - 1);
    }
    pop() {
        this.swap(0, this.length - 1);
        const popped = this.elements.pop();
        this.length--;
        this.downHeapify(0);
        return popped;
    }
    upHeapify(i) {
        if (i === 0) return;
        const parent = Math.floor((i - 1) / 2);
        if (this.elements[i].cost < this.elements[parent].cost) {
            this.swap(parent, i);
            this.upHeapify(parent);
        }
    }
    downHeapify(i) {
        let minNode = i;
        const leftChild = (2 * i) + 1;
        const rightChild = (2 * i) + 2;

        if (leftChild < this.length && this.elements[leftChild].cost < this.elements[minNode].cost) {
            minNode = leftChild;
        }
        if (rightChild < this.length && this.elements[rightChild].cost < this.elements[minNode].cost) {
            minNode = rightChild;
        }
        if (minNode !== i) {
            this.swap(minNode, i);
            this.downHeapify(minNode);
        }
    }
    isEmpty() {
        return this.length === 0;
    }
    swap(x, y) {
        [this.elements[x], this.elements[y]] = [this.elements[y], this.elements[x]];
    }
}

// const pq = new PriorityQueue();
// pq.push({ cost: 2 });
// pq.push({ cost: 1 });
// pq.push({ cost: 0 });

// console.log(pq.pop());
// console.log(pq.pop());
// console.log(pq.pop());


function dijsktra() {
    const pq = new PriorityQueue();
    const parent = new Map();
    const distance = [];
    for (let i = 0; i < row; i++) {
        const INF = [];
        for (let j = 0; j < col; j++) {
            INF.push(Infinity);
        }
        distance.push(INF);
    }
    distance[source.x][source.y] = 0;
    pq.push({ cordinate: source, cost: 0 });



    while (pq.length > 0) {
        const { cordinate: cur, cost: distance_so_far } = pq.pop();
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
            if (isValid(neighbour.x, neighbour.y) &&
                !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
                const edgeWeight = 1;
                const distanceToNeighbour = distance_so_far + edgeWeight;
                if (distanceToNeighbour < distance[neighbour.x][neighbour.y]) {
                    distance[neighbour.x][neighbour.y] = distanceToNeighbour;
                    pq.push({ cordinate: neighbour, cost: distanceToNeighbour });
                    parent.set(key, cur);
                }
            }
        }
        visitedNodeSize = visitedCell.length;
    }
}

// dfs
var cnt2 = 0;
var cnt3 = 0;
const visited = new Set();
function dfs(cur) {
    if (cur.x === target.x && cur.y === target.y) {
        return true;
    }
    visitedCell.push(matrix[cur.x][cur.y]);
    visited.add(`${cur.x}-${cur.y}`);
    const neighbours = [
        { x: cur.x - 1, y: cur.y },
        { x: cur.x, y: cur.y + 1 },
        { x: cur.x + 1, y: cur.y },
        { x: cur.x, y: cur.y - 1 }
    ];

    for (const neighbour of neighbours) {
        if (isValid(neighbour.x, neighbour.y) &&
            !visited.has(`${neighbour.x}-${neighbour.y}`) &&
            !matrix[neighbour.x][neighbour.y].classList.contains('wall')) {
            cnt3++;
            if (dfs(neighbour)) {
                pathToAnimate.push(matrix[neighbour.x][neighbour.y]);
                cnt2++;
                return true;
            }
        }
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

