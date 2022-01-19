'use strict'
console.log('user-controller');

function onInit() {  

}

function onSetLang(lang) {
    setLang(lang);
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}

function onDoLogin(isGuest) {
    var user = doLogin(isGuest)
    console.log('there is user:',user);
    if(user) { 
        saveToStorage('user',user);
        window.location = 'bookShop.html';
    };
}