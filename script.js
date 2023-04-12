// Get variables
const form = document.querySelector(".card.modal");
const modal = document.querySelector(".modalContainer");
const addBook = document.querySelector("#addBook");
const display = document.querySelector(".display");

// SCRIPT
// List of books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book prototype
// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// }

// Events
addBook.addEventListener("click", (e) => {
    modal.classList.toggle("show");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.toggle("show");
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = getInputs();
    myLibrary.push(new Book(...inputs));
    modal.classList.toggle("show");
    addCard(inputs);
    addCardEvent();
    form.reset();
});


// Function definitions
function getInputs() {
    const inputs = [];
    inputs.push(document.querySelector("#title").value);
    inputs.push(document.querySelector("#author").value);
    inputs.push(document.querySelector("#pages").value);
    inputs.push(document.querySelector("#checkbox").checked);
    return inputs;
}

function addCard(inputs) {
    // Create and append div(card)
    const card = document.createElement("div");
    card.dataset.index = myLibrary.length;
    card.classList.add("card");
    display.appendChild(card);

    // Create and append card childeren(p & button)
    const classes = ["title", "author", "pages", "toggle", "remove"];
    for (let i = 0; i < inputs.length + 1; i++) {
        if (i < 3) {
            const p = document.createElement("p");
            p.className = classes[i];
            p.textContent = inputs[i];
            card.appendChild(p);
        }
        else {
            const b = document.createElement("button");
            b.className = classes[i];
            b.type = "button";
            if (i === 3) {
                b.textContent = inputs[i] ? "Read" : "Not Read";
                b.style.backgroundColor = inputs[i] ? "rgb(139, 252, 139)" : "rgb(252, 139, 139)";
            }
            else {
                b.textContent = "Remove";
            }
            card.appendChild(b);
        }
    }
}

function addCardEvent() {
    const cardButtons = document.querySelectorAll(".card:last-child > button");
    cardButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            (e.target.className === "toggle") ? toggleReadStatus(e) : removeCard(e);
        });
    });
}

function toggleReadStatus(e) {
    if (e.target.textContent === "Read") {
        e.target.style.backgroundColor = "rgb(252, 139, 139)";
        e.target.textContent = "Not Read";
        myLibrary[e.target.parentElement.dataset.index - 1]["read"] = false;
    }
    else {
        e.target.style.backgroundColor = "rgb(139, 252, 139)";
        e.target.textContent = "Read";
        myLibrary[e.target.parentElement.dataset.index - 1]["read"] = true;
    }
}

function removeCard(e) {
    // Remove element from DOM & List (If last card != 1 it will not be removed becuase dataset-index has not been reassigned)
    const index = e.target.parentElement.dataset.index;
    document.querySelector(`[data-index="${index}"]`).remove();
    myLibrary.splice(index - 1, 1);

    // Reassign index numbers
    if (myLibrary[index - 1]) {
        for (let i = index - 1; i < myLibrary.length; i++) {
            let div = document.querySelector(`[data-index="${i + 2}"]`);
            div.dataset.index = i + 1;
        }
    }
}