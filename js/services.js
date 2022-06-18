var gProjs = [
    createProj('mister-toy', 'Toy Store', 'Go and buy some toys (:', 'Used VueJS-3 with mongoDB, cloudinary, SCSS, Node-JS, Element Plus, socket.io and more , admin middle-ware (admin-username: rachel, admin-password: 111)', 'https://rachel-toys.herokuapp.com/', '18 / 06 / 2022', 'VueJs, Mongo-DB, cloudinary'),
    createProj('miss-keep', 'Notes Maker', 'Make your daily notes', 'Used VueJs to make this project, here you can create different types of notes ,includes a lot of features', null, '01 / 06 / 2022', 'VueJs, Notes, Productivity'),
    createProj('minesweeper', 'Mine Sweeper', 'Watch out from the mines!', 'An enhanced version of the classic minesweeper game', null, '05 / 04 / 2022', 'Matrixes,Game,Classic'),
    createProj('canvas', 'Meme Genarator', 'Create your Memes', 'a canvas painter, you can save and downlound them', null, '15 / 05 / 2022', 'Canvas,Painter,Cool'),
    createProj('miss-book', 'Books Collection', 'Leave a Review (:', 'Used VueJs and google books API, use CRUD on books and manage your collection', null, '10 / 06 / 2022', 'VueJs, API, Collection'),
    createProj('map-Proj', 'Map Locations', 'Google Map API service', 'A google maps api interface, which lets you search and add locations', null, '25 / 04 / 2022', 'API,Website,Google'),
    createProj('pacman', 'Pac-Man', 'No-shame copy of Pac-Man', 'Modern design of the classic pacman, truly amazing', null, '14 / 03 / 2022', 'Matrixes,Game'),
    createProj('ballcollector', 'Ball-Collector', 'Ball collecting simulator', 'Unfinished revolutionary game', null, '15 / 02 / 2022', 'Matrixes,Game,Amazing'),
    createProj('memorystone', 'Memory Stone', 'Classic memory card game', 'Classic memory game, you will have 5 seconds to memorize the cards', null, '01 / 02 / 2022', 'First project,Game'),
    createProj('book-shop', 'Book Store', 'Best book store around', 'Simple book store managment system,image has to be in img folder to work ', null, '02 / 03 / 2022', 'MVC,Store'),
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