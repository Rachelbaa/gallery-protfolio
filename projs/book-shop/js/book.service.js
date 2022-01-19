'use strict'
console.log('book-service');
const KEY ='books';
var gBooks;
var gGeners = ['action','adventure','comic','fantasy','mystery','horror']
const PAGE_SIZE = 4;
var gPageIdx = 0;
var booksCount = getBooksCount();
var pageMover = Math.ceil(booksCount/PAGE_SIZE);

function countPage() {
    booksCount = getBooksCount();
    pageMover = Math.ceil(booksCount/PAGE_SIZE)
    return pageMover;
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        var price = null;
        books = []
        for (var i = 0 ; i < booksCount ; i++) {
            var indexOfB = getRandomIntInclusive(0, gGeners.length-1)
            var bookGener = gGeners[indexOfB]
            books.push(_createBook(bookGener, indexOfB, price))
        }
    }
    gBooks = books;
    saveToStorage(KEY, gBooks)
}

function getBooks() {
    var startIdx = gPageIdx*PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function hasNext() {
    return (gPageIdx+1) * PAGE_SIZE < gBooks.length
}

function nextPage(num) {
    gPageIdx = num;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function _createBook(bookGener, indexOfB, price) {
    if (!price) price = getRandomIntInclusive(60, 200);
    return {
        id: makeId(),
        indexB: indexOfB,
        name: bookGener,
        realName: gGeners[indexOfB],
        price: price,
        desc: makeLorem(),
        imgUrl: bookGener
    }
}

function deleteBook(bookId){
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1);
    saveToStorage(KEY, gBooks);
}

function addBook(gener,indexOfB, price) {
    var book = _createBook(gener,indexOfB, price)
    gBooks.unshift(book)
    renderBooks()
    saveToStorage(KEY, gBooks);
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function(book){
        return book.id === bookId;
    })
    book.price = newPrice;
    saveToStorage(KEY, gBooks);
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function logOut() {
    var currentUser = loadFromStorage('user');
    currentUser.time = createdAt();
    return currentUser;
}

function getBookGeners() {
    return gGeners;
}

function getBooksCount() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        return 20;
    }
    return books.length;
}