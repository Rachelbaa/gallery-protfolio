'use strict'
console.log('book-controller');

function init() {
    var user = loadFromStorage('user');
    var strHTML = ''
    strHTML += `<div class="header"><div><span data-trans="subtitle">welcome </span><span class="userN"> ${user.userName}</span></div>
    <div class="lO"><button data-trans="b-logOut" class="logOut" onclick="onLogOut('${user.id}')">log Out</button></div></div>`
    document.querySelector('.body-header').innerHTML += strHTML
    createBooks()
    renderPagination();
    renderBooks()
    renderBookGeners()
}

function renderPagination() {
    var tablePage = ` <table class="page-table"><tr>`
    var pageCount = countPage()
    for (var i=0 ; i<=pageCount-1 ; i++) {
       tablePage +=  ` <th class="btn-next" onclick="onNextPage(${i})">${i+1}</th>`
    }
    tablePage += `</tr></table>`
    document.querySelector('.page-mover').innerHTML = tablePage;
}

function renderBookGeners() {
    var bookGeners = getBookGeners()
    var strHtmls = bookGeners.map(function (bookGener) {
        return `
        <option value="${bookGener}" data-trans="opt-${bookGener}">${bookGener}</option>
        `
    })
    document.querySelector('[name=bookGener-list]').innerHTML = strHtmls.join('')
}

function renderBooks() {
    var books = getBooks();
    var bookGeners = getBookGeners()
    var strHTML = books.map(function (book) {
        return `
        <div class="book-preview">
        <div class="img-box"><img class="card-img-top" src="img/${bookGeners[book.indexB]}.jpg" alt="card image cap"></div>
        <div class="card-body">
            <h4 class="card-title" data-trans="opt-${book.realName}">${book.name}</h4>
            <p class="card-text"><span data-trans="add-price-placeholder">price</span>: ${book.price}</p>
            <div class="card-links">
            <a href="#" onclick="onReadBook('${book.id}')"><span data-trans="li-detalis">Details</span></a>
            <a href="#" onclick="onUpdateBook('${book.id}')"><span data-trans="li-update">Update</span></a>
            </div>
        </div>
        <span class="delete-btn" onclick="onDeleteBook('${book.id}')">X</span>
        </div> `
    })
    document.querySelector('.books-container').innerHTML = strHTML.join('')
    doTrans();
}

function direction(dire) {
    var elBookPreview = document.querySelectorAll('.book-preview');
    elBookPreview.forEach(book => {
        book.style.flexDirection = dire;
    });
}

function onSetLang(lang) {
    setLang(lang);
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderPagination();
    renderBooks()
}

function onAddBook() {
    var currLang = onCurrLang();
    var bookGeners = getBookGeners()
    var elGener = document.querySelector('[name=bookGener-list]');
    var elPrice = document.querySelector('input[name=price]');
    var Gener = elGener.value;
    var Price = +elPrice.value;
    var indexOfB;
    for (let i = 0; i < bookGeners.length; i++) {
        if (bookGeners[i]===Gener) {
            indexOfB = i;
        }
    }
    if (Price > 200 || Price < 60) {
        if (currLang === 'en') {
            return alert ('The price you entered ist authorized on our site, please enter a price between 60-200 ');
        }else if (currLang === 'ru') {
            return alert ('Цена, которую вы ввели, не разрешена на нашем сайте, введите цену от 60 до 200');
        }else return alert ('המחיר שהזנת אינו מורשה באתר שלנו, נא להזין מחיר בין 60-200');
    }else {
        addBook(Gener,indexOfB, Price)
        renderPagination();
        elGener.value = '';
        elPrice.value = '';
        renderBooks()
    }
}


function onUpdateBook(bookId) {
    var currLang = onCurrLang();
    var newPrice;
    if (currLang === 'en') {
        newPrice = +prompt ('price?');
    }else if (currLang === 'ru') {
        newPrice = +prompt ('Цена?');
    }else newPrice = +prompt ('?מחיר');
    while (newPrice < 60 || newPrice > 200) {
        if (currLang === 'en') {
           newPrice = +prompt ('The price you entered ist authorized on our site, please enter a price between 60-200 ');
        }else if (currLang === 'ru') {
           newPrice = +prompt ('Цена, которую вы ввели, не разрешена на нашем сайте, введите цену от 60 до 200');
        }else newPrice = +prompt ('המחיר שהזנת אינו מורשה באתר שלנו, נא להזין מחיר בין 60-200');
    }
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId){
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').dataset.trans = `opt-${book.realName}`
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price
    elModal.querySelector('p').dataset.trans = `lorem`
    // elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false;
    doTrans()
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onNextPage(num) {
    nextPage(num);
    renderBooks();
}

function onLogOut() {
    logOut();
    localStorage.removeItem('user');
    window.location = 'index.html';
}