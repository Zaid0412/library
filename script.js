const addBookBtn = document.querySelector(".add-new-book-btn");
const modal = document.querySelector("dialog");
const xBtn = document.querySelector(".x-icon");
const submitBook = document.querySelector("#sub");
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const readInput = document.querySelector("#morning");
const library = document.querySelector(".library");
let isReadBtn = document.querySelectorAll(".read");
const deleteBtn = document.querySelectorAll(".delete");

let bookTitle, bookAuthor, bookPages, bookIsRead;
let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Create new book
function createBook() {
  bookTitle = titleInput.value;
  bookAuthor = authorInput.value;
  bookPages = pagesInput.value;
  bookIsRead = readInput.checked;

  myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookIsRead));
}

// Display books
function displayBooks() {
  library.innerHTML = "";

  for (const book of myLibrary) {
    let text;
    if (book.isRead) {
      text = "Read";
    } else if (!book.isRead) {
      text = "Not Read";
    }
    const html = `<div class="book">
      <h1 class="title">${book.title}</h1>
      <h2>By ${book.author}</h2>
      <h2>Pages: ${book.pages}</h2>
      <button class="read">${text}</button>
      <button class="delete">Remove</button>
    </div>
  `;
    library.insertAdjacentHTML("beforeend", html);
  }
}

function submitBook1() {
  createBook();
  displayBooks();
  isReadBtn = document.querySelectorAll(".read");
}

addBookBtn.addEventListener("click", () => {
  modal.showModal();

  // Clearing input
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
});

xBtn.addEventListener("click", () => {
  modal.close();
});

submitBook.addEventListener("click", submitBook1);

// Toggle isRead
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("read")) {
    if (e.target.textContent == "Read") {
      e.target.textContent = "Not Read";
      e.target.style.backgroundColor = "#ff9c9c";
      e.target.style.padding = " 10px 70px 10px 70px";
    } else if (e.target.textContent == "Not Read") {
      e.target.textContent = "Read";
      e.target.style.backgroundColor = "#9fff9c";
      e.target.style.padding = " 10px 90px 10px 90px";
    }
  }
});

// Delete book
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    // Removing the book from the DOM
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // Removing it from myLibrary array
    myLibrary = myLibrary.filter(
      (book) => !(book.title == e.target.parentNode.children[0].textContent)
    );
  }
});
