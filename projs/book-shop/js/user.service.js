'use strict'
console.log('user-service');
var gUsers = _createUsers();

function _createUsers() {
    var users = loadFromStorage('users')
    if (!users || !users.length) {
        var userInfo = [
            { userName: 'rachel', password: 'f', time: createdAt(), admin: true },
            { userName: 'yasha', password: 'z', time: createdAt(), admin: false },
            { userName: 'z', password: 'z', time: createdAt(), admin: false },
            { userName: 'Guest', password: 'Guest', time: createdAt(), admin: true }
        ];
        users = userInfo.map(_createUser);
        saveToStorage('users', users)
    }
    return users
}

function _createUser(userInfo) {
    return {
        id: makeId(),
        userName: userInfo.userName,
        password: userInfo.password,
        time: userInfo.time,
        admin: userInfo.admin
    }
}


function createdAt() {
    var today = new Date();
    var time = today.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    return time;
}

function doLogin(Guest) {
    var currLang = onCurrLang();
    var loginName = document.querySelector('.userName');
    console.log('loginName:',loginName.value);
    var loginPass = document.querySelector('.password');
    console.log('loginPass:',loginPass.value);
    var currUser = gUsers.find(function (user) {
        if (user.userName === loginName.value && user.password === loginPass.value) return user;
    })
    if (Guest) {
        currUser = gUsers[3];
        // console.log(currUser,'test1');
        // console.log(gUsers[3],'test2');
    }
    if(!currUser){
        loginPass.value = '';
        var popWrong = document.querySelector('.pop-wrong');
        if (currLang === 'he') {
         popWrong.innerHTML = `אחת מהקלטות שלך שגויות! <br> נסה שוב`;  
        }else if (currLang === 'ru') {
         popWrong.innerHTML = `Один из ваших входов неверен! <br> Попробуйте еще раз`;
        }
        popWrong.style.display = 'block';
        setTimeout(() => {
            popWrong.style.display = 'none';
        }, 3000);
        return false;
    }
    currUser.time = createdAt();
    console.log('its a rigth log in!!!', currUser)
    return currUser;
}

