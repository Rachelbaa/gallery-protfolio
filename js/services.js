var gProjs = [
    createProj('memorystone', 'Memory Stone', 'Classic memory card game', 'Classic memory game, you will have 5 seconds to memorize the cards', 'projs/test', '01 / 10 / 2021', 'First project,Game'),
    createProj('ballcollector', 'Ball-Collector', 'Ball collecting simulator', 'Unfinished revolutionary game', 'projs/test', '19 / 11 / 2021', 'Matrixes,Game,Amazing'),
    createProj('book-shop', 'Book Store', 'Best book store around', 'Simple book store managment system,image has to be in img folder to work ', 'projs/test', '30 / 12 / 2021', 'MVC,Store'),
    createProj('pacman', 'Pac-Man', 'No-shame copy of Pac-Man', 'Modern design of the classic pacman, truly amazing', 'projs/test', '10 / 01 / 2022', 'Matrixes,Game'),
    createProj('minesweeper', 'Mine Sweeper', 'Watch out from the mines!', 'An enhanced version of the classic minesweeper game', 'projs/test', '03 / 12 / 2021', 'Matrixes,Game,Classic'),
    createProj('map-Proj', 'Map Locations', 'Google Map API service', 'A google maps api interface, which lets you search and add locations', 'projs/test', '27 / 11 / 2021', 'API,Website,Google'),
    createProj('canvas', 'Meme Genarator', 'Google Map API service', 'Cool canvas with lalala', 'projs/test', '04 / 01 / 2022', 'API,Website,Google'),
]

function getPortCard(sentCardId) {
    return gProjs.find(card => card.id === sentCardId)
}

function createProj(id, name, title, desc, url, pubat, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: pubat,
        labels: labels,
    }
}

function getPortCards() {
    return gProjs
}