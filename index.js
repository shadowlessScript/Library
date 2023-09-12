const libraryRepo = document.querySelector(".library-repo");
const newBookBtn = document.querySelector(".new-book-btn"); 
const newBookForm = document.querySelector(".new-book-form");
const addBookBtn = document.querySelector(".add-book-btn");
const formContainer = document.querySelector(".form-container");
const closeBtn = document.querySelector(".close-btn");
const myLibrary = [
    {
        title: "One Piece",
        author: "Eiichiro Oda",
        pages: "5000+",
        read: false,
        changeReadStatus: function () {
            this.read = true
        },
        coverImg: "https://c4.wallpaperflare.com/wallpaper/965/883/624/manga-one-piece-wallpaper-preview.jpg"
    },
    {
        title: "Naruto",
        author: "Masashi Kishimoto",
        pages: "192",
        read: false,
        changeReadStatus: function () {
            this.read = true
        },
        coverImg: "https://wallpapers.com/images/hd/naruto-and-teammates-fan-art-dbt18qjb7b1cstr1.webp"
    }
    
];

function Book(title, author, pages, coverImg) {
    //constructor
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false
    this.coverImg = coverImg
}
Book.prototype.changeReadStatus = function () {
    this.read = true
}
 

function addBookToLibrary(title, author, pages, coverImg) {
    // put logic for adding book to library
    const myBook = new Book(
        title,
        author,
        pages,
        coverImg,
    );
    myLibrary.push(myBook)
    showBook(myLibrary)
}


function showBook(array) {
    
    while (libraryRepo.firstChild) {
        libraryRepo.removeChild(libraryRepo.firstChild);
    }
    for (const book in array)
    {    
        let bookId = book
        createCard(
            array[book].title,
            array[book].author,
            array[book].pages,            
            bookId,
            array[book].read,
            array[book].coverImg,
        )

    }
}

function createCard(bookTitle, booksAuthor, booksPages, bookId, isRead, coverImage) {
    const card = document.createElement("div");
    card.classList.add("card", bookId)
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h4");
    const read = document.createElement("h5");
    const removeBookBtn = document.createElement("button");  
    removeBookBtn.classList.add("remove-book-btn");
    removeBookBtn.textContent = "Remove Book"
    const readBookBtn = document.createElement("button");
    readBookBtn.classList.add("read-book-btn")
    const coverImg = document.createElement("img")
    coverImg.src = coverImage
    readBookBtn.textContent = "Read"
    title.textContent = bookTitle
    author.textContent = booksAuthor
    pages.textContent = booksPages

    if (isRead)
    {
        read.textContent = "Read"
    } else
    {
        read.textContent = "Not read"
    }
    removeBookBtn.addEventListener("click", () => {
        delete myLibrary[bookId]
        showBook(myLibrary)

    });

    readBookBtn.addEventListener("click", () => {
        
        myLibrary[bookId].changeReadStatus();
        showBook(myLibrary)
        
    });
    card.append(coverImg,title, author, pages, read,removeBookBtn, readBookBtn)

    libraryRepo.append(card)
}

showBook(myLibrary)



newBookBtn.addEventListener("click", () => {
    formContainer.style.display = "flex"
});

closeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    formContainer.style.display = "none"
});

addBookBtn.addEventListener("click", (event) => {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const coverImg = document.querySelector("#img").value
    addBookToLibrary(title, author, pages, coverImg)
    event.preventDefault();
});