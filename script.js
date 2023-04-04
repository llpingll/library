// Get variables
const firstName = document.querySelector("#firstName");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const checkbox = document.querySelector("#checkbox");
const submit = document.querySelector("#submit");
const modal = document.querySelector(".modalContainer");
const addBook = document.querySelector(".addBook");

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


// Function definitions
function addBookToLibrary(book) {
    
}