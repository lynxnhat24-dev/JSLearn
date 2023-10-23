
let draggableObjects;
let dropPoints;

const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
    "belgium",
    "bhutan",
    "brazil",
    "china",
    "cuba",
    "ecuador",
    "georgia",
    "germany",
    "hong-kong",
    "india",
    "iran",
    "myanmar",
    "norway",
    "spain",
    "sri-lanka",
    "sweden",
    "switzerland",
    "united-states",
    "uruguay",
    "wales",
];

let deviceType = "";
let initialX = 0, initialY = 0;
let currentElement = "";
let moveElement = false;

// Detect touch device 
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

let count = 0;

const randomValueGenerator = () => {
    return data[Math.floor(Math.random() * data.length)];
};

const stopGame = () => {
    controls.classList.remove("hide");
    startButton.classList.remove("hide");
};

function dragStart(e) {
    if (isTouchDevice()) {

        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;

        moveElement = true;
        currentElement = e.target;
    } else {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function dragOver(e) {
    e.preventDefault();
}

const touchMove = (e) => {
    if (moveElement) {
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;

        let currentSelectedElement = document.getElementById(e.target.id);

        currentSelectedElement.parentElement.style.top =
            currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left =
            currentSelectedElement.parentElement.offsetLeft -
            (initialX - newX) +
            "px";
        initialX = newX;
        initialY = newY;
    }
};

const drop = (e) => {
    e.preventDefault();

    if (isTouchDevice()) {
        moveElement = false;

        const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);

        const currentDropBound = currentDrop.getBoundingClientRect();

        if (
            initialX >= currentDropBound.left &&
            initialX <= currentDropBound.right &&
            initialY >= currentDropBound.top &&
            initialY <= currentDropBound.bottom
        ) {
            currentDrop.classList.add("dropped");
            currentElement.classList.add("hide");
            currentDrop.innerHTML = ``;
            currentDrop.insertAdjacentHTML(
                "afterbegin",
                `<img src = "img/${currentElement.id}.png">`
            );
            count += 1;
        }
    } else {
        const draggedElementData = e.dataTransfer.getData("text");
        const droppableElementData = e.target.getAttribute("data-id");

        if (draggedElementData === droppableElementData) {
            const draggedElement = document.getElementById(draggedElementData);

            e.target.classList.add("dropped");
            draggedElement.classList.add("hide");
            draggedElement.setAttribute("draggable", "false");
            e.target.innerHTML = ``;

            e.target.insertAdjacentHTML(
                "afterbegin",
                `<img src = "img/${draggedElementData.id}.png">`
            );
            count += 1;
        }
    }

    if (count == 3) {
        result.innerText = `You Won!`;
        stopGame();
    }
};

const creator = () => {
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    let randomData = [];

    for (let i = 1; i <= 3; i++) {
        let randomValue = randomValueGenerator();
        if (!randomData.includes(randomValue)) {
            randomData.push(randomValue);
        } else {
            i -= 1;
        }
    }

    for (let i of randomData) {
        let flagDiv = document.createElement("div");

        flagDiv.classList.add("draggable-image");
        flagDiv.setAttribute("draggable", true);
        
        if (isTouchDevice()) {
            flagDiv.style.position = "absolute";
        }

        flagDiv.innerHTML = `<img src="img/${i}.png" id="${i}">`;

        dragContainer.appendChild(flagDiv);
    }

    randomData = randomData.sort(() => 0.5 - Math.random());
    for (let i of randomData) {
        const countryDiv = document.createElement("div");
        countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
        ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
        </div>
        `;
        dropContainer.appendChild(countryDiv);
    }
};

startButton.addEventListener(
"click",
 (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");

    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((element) => {
        element.addEventListener("dragstart", dragStart);

        element.addEventListener("touchstart", dragStart);
        element.addEventListener("touchend", drop);
        element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
}));