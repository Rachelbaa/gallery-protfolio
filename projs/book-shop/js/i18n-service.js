var gTrans = {
    title: {
        en: 'Book Shop',
        ru: 'книжный магазин',
        he: 'חנות ספרים'
    },
    subtitle: {
        en: 'wellcome',
        ru: 'добро пожаловать',
        he: 'ברוך שובך',
    },
    'b-logOut': {
        en: 'log Out',
        ru: 'выйти',
        he: 'להתנתק',
    },
    'row-direction': {
        en: 'row',
        ru: 'ряд',
        he: 'שורה'
    },
    'col-direction': {
        en: 'col',
        ru: 'колонка',
        he: ' טור',
    },
    'opt-action': {
        en: 'action',
        ru: 'боевик',
        he: 'פעולה',
    },
    'opt-adventure': {
        en: 'adventure',
        ru: 'приключение',
        he: 'הַרפַּתקָה',
    },
    'opt-fantasy': {
        en: 'fantasy',
        ru: 'фантазия',
        he: 'פנטזיה',
    },
    'opt-comic': {
        en: 'comic',
        ru: 'комический',
        he: 'קומיקס',
    },
    'opt-mystery': {
        en: 'mystery',
        ru: 'тайна',
        he: 'מִסתוֹרִין',
    },
    'opt-horror': {
        en: 'horror',
        ru: 'ужасов',
        he: 'חֲרָדָה',
    },
    'li-detalis': {
        en: 'Detalis',
        ru: 'Детали',
        he: 'פרטים',
    },
    'li-update': {
        en: 'Update',
        ru: 'Обновить',
        he: 'עדכון',
    },
    add: {
        en: 'Add',
        ru: 'добавлять',
        he: 'הוסף',
    },
    'b-close': {
        en: 'close',
        ru: 'закрыт',
        he: 'לסגור',
    },
    'lorem': {
        en: makeLorem('en'),
        ru: makeLorem('ru'),
        he: makeLorem('he'),
    },
    'login': {
        en: 'Log In',
        ru: 'вход',
        he: 'התחברות',
    },
    'password': {
        en: 'Password',
        ru: 'пароль',
        he: 'סיסמה',
    },
    'userName': {
        en: 'User Name',
        ru: 'имя пользователя',
        he: 'שם משתמש',
    },
    'add-price-placeholder': {
        en: 'price',
        ru: 'чена',
        he: 'מחיר'
    },
    'skip': {
        en: 'skip',
        ru: 'пропустить',
        he: 'דלג'
    }
}

var gCurrLang = 'en';

function onCurrLang() {
    return gCurrLang;
}

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    // If translation not found - use english
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i=0; i < els.length; i++){
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}


function relativeTime(ts) {
    return moment(ts).fromNow();
}