// Cache
const form = document.querySelector(".card.modal");
const modal = document.querySelector(".modalContainer");
const addBook = document.querySelector("#addBook");
const display = document.querySelector(".display");

// SCRIPT
class Library {
    constructor() {
        this.books = [];
    }

    addCard(inputs) {
        // Create and append div(card)
        const card = document.createElement("div");
        card.dataset.index = this.books.length;
        card.classList.add("card");
        display.appendChild(card);
    
        // Create and append card children(p & button)
        const classes = ["title", "author", "pages", "toggle", "remove"];
        for (let i = 0; i < inputs.length + 1; i++) {
            if (i < 3) {
                const p = document.createElement("p");
                p.className = classes[i];
                (i === 2) ? p.textContent += `${inputs[i]} Pages` : p.textContent = inputs[i];
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

    toggleRead(e) {
        const i = e.target.parentElement.dataset.index - 1;
        (this.books[i].read === true) ? this.books[i].read = false : this.books[i].read = true;
    }

    toggleReadStatus(e) {
        if (e.target.textContent === "Read") {
            e.target.style.backgroundColor = "rgb(252, 139, 139)";
            e.target.textContent = "Not Read";
            this.toggleRead(e);
        }
        else {
            e.target.style.backgroundColor = "rgb(139, 252, 139)";
            e.target.textContent = "Read";
            this.toggleRead(e);
        }
    }

    removeCard(e) {
        // Remove element from DOM & List
        const index = e.target.parentElement.dataset.index;
        document.querySelector(`[data-index="${index}"]`).remove();
        this.books.splice(index - 1, 1);
    
        // Reassign index numbers
        if (this.books[index - 1]) {
            for (let i = index - 1; i < this.books.length; i++) {
                let div = document.querySelector(`[data-index="${i + 2}"]`);
                div.dataset.index = i + 1;
            }
        }
    }

}

class Book {
    constructor(title = "title", author = "author", pages = 1, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const myLibrary = new Library();

// Function definitions
function getInputs() {
    const inputs = [];
    inputs.push(document.querySelector("#title").value);
    inputs.push(document.querySelector("#author").value);
    inputs.push(document.querySelector("#pages").value);
    inputs.push(document.querySelector("#checkbox").checked);
    return inputs;
}

function addCardEvent() {
    const cardButtons = document.querySelectorAll(".card:last-child > button");
    cardButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            (e.target.className === "toggle") ? myLibrary.toggleReadStatus(e) : myLibrary.removeCard(e);
        });
    });
}

// Events
addBook.addEventListener("click", () => {
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
    myLibrary.books.push(new Book(...inputs));
    modal.classList.toggle("show");
    myLibrary.addCard(inputs);
    addCardEvent();
    form.reset();
});