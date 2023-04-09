// Get variables
const form = document.querySelector(".card.modal");
const modal = document.querySelector(".modalContainer");
const addBook = document.querySelector(".addBook");
const display = document.querySelector(".display");

console.log(form);
// SCRIPT
// List of books
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book prototype
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

// Events
addBook.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.classList.remove("show");
    }
});

form.addEventListener("submit", (e) => {
    let inputs = getInputs();
    myLibrary.push(new Book(...inputs));
    e.preventDefault();
    modal.classList.remove("show");
    addCard(inputs);
    form.reset();
});


// Function definitions
function getInputs() {
    let inputs = [];
    inputs.push(document.querySelector("#title").value);
    inputs.push(document.querySelector("#author").value);
    inputs.push(document.querySelector("#pages").value);
    inputs.push(document.querySelector("#checkbox").checked);
    console.log(inputs)
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
            let p = document.createElement("p");
            p.className = classes[i];
            p.textContent = inputs[i];
            card.appendChild(p);
        }
        else {
            let b = document.createElement("button");
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