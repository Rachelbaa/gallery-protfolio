'use strict';

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(currLang) {
    var size = 100;
    // var currLang = onCurrLang();
    var words;
    if (currLang === 'en') {
        words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    } else if (currLang === 'ru') {
        words = ['Небо', 'над', 'порт', 'было', 'цвет телевидения', 'настроен', 'на', 'мертвый канал', '.', 'Все', 'это случилось ', ' более или менее ', '. ', ' Я ', ' имел ', ' историю ', ' по крупицам ', ' от разных людей ', ' и ', ' как правило ', ' случается ', 'в таких случаях', 'каждый раз', 'это', 'было', 'другая история', '.', 'это', 'было', 'удовольствие', 'чтобы', 'сжечь'];
    } else words = ['השמים', 'מעל', 'הנמל', 'היה', 'הצבע של הטלוויזיה', 'מכוון', 'ל', 'ערוץ מת', '.', 'הכל', 'זה קרה' , 'פחות או יותר', '.', 'לי', 'היה לי', 'הסיפור', 'מעט טיפין', 'מאנשים שונים', 'ו', 'באופן כללי', 'קורה', 'במקרים כאלה', 'כל פעם', 'זה', 'היה', 'סיפור אחר', '.', 'זה', 'היה', 'תענוג', 'אל', 'לשרוף'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}