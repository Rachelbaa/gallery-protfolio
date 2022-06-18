export const Utils = {
    saveToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomId,
    getRandomBuliani
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}
function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


function getRandomId() {
    let pt1 = Date.now().toString(16);
    let pt2 = getRandomInt(1000, 9999).toString(16);
    let pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function getRandomInt(num1, num2) {
    let max = (num1 >= num2)? num1+1 : num2+1;
    let min = (num1 <= num2)? num1 : num2;
    return (Math.floor(Math.random()*(max - min)) + min);
}

function getRandomBuliani() {
    const num = 1;
    const num2 = 3;
    const rendomNum = Math.floor(Math.random()*(num2+1 - num)) + num
    const buliani = (rendomNum === 1) ? true : false ;
    return (buliani);
}