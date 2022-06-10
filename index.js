import i18Obj from './js/translate.js';
var lang = 'en';
var theme = 'dark';


const hamburger = document.querySelector('.hamburger');
const navmenu = document.querySelector('.nav');
//const navlinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navmenu.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);


/*---- delegate 'remove class' event to parent ----*/
const navlist = document.querySelector('.nav-list');
function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        hamburger.classList.remove('open');
        navmenu.classList.remove('open');
    }
  }
navlist.addEventListener('click', closeMenu)

//====================== part #3 +=================================

// toggle portfolio images
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioBtns.forEach(btn => btn.addEventListener('click', (e) => {
      portfolioImages.forEach((img,i) => img.src = `./assets/img/jpg/${e.target.dataset.season}/${i+1}.jpg`);
      portfolioBtns.forEach(btn => btn.classList.add('inactive'))
      e.target.classList.toggle('inactive')
      
})
)
// cache portfolio images
function preloadImages() {
  portfolioBtns.forEach( btn => {
  portfolioImages.forEach((img,i) => {
    const preimg = new Image();
    preimg.src = `./assets/img/jpg/${btn.dataset.season}/${i+1}.jpg`;
    })
  })
}
preloadImages();

// switch active class on buttons


// buttons on mousedown/mouseup
const activableBtns = document.querySelectorAll( ".hero-button, .price-card-button, .message-button" );
activableBtns.forEach(btn => {
    btn.addEventListener('mousedown', () =>{btn.classList.add('active')});
    btn.addEventListener('mouseup', () => {btn.classList.remove('active')})
})


// langswitch on click

function getTranslate(lang) {
    document.querySelectorAll('[data-i18]').forEach(el => {
      if (el.dataset.i18) {
        if (el.placeholder) el.placeholder = i18Obj[lang][el.dataset.i18]
        else el.textContent = (i18Obj[lang][el.dataset.i18]);
      }
    });
}



const langswitchBtns = document.querySelectorAll('.langswitch-choice');
langswitchBtns.forEach(btn => btn.addEventListener('click', (e) =>{
    langswitchBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    lang = e.target.dataset.lang;
    getTranslate(lang)
}))

 

// themeswitch on click

const themeswitchButton = document.querySelector('.themeswitch-button');
const lightableDivs = document.querySelectorAll('.container, body')

themeswitchButton.addEventListener('click', (e) => {
  lightableDivs.forEach(el => el.classList.toggle('light-theme'));
  theme = (theme === 'dark') ? 'light' : 'dark';
  console.log(theme);
} )

//local storage
function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  }
  document.querySelector(`#lan_${lang}`).classList.add('active');
  getTranslate(lang);

  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    if (theme === 'light') {
      lightableDivs.forEach(el => el.classList.add('light-theme'))
    };
  }
}
window.addEventListener('load', getLocalStorage)

const precheck = `

  1. Смена изображений в секции portfolio +25

      при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20

      кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5

  2. Перевод страницы на два языка +25

      при клике по надписи ru англоязычная страница переводится на русский язык +10

      при клике по надписи en русскоязычная страница переводится на английский язык +10

      надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5

  3. Переключение светлой и тёмной темы +25

    На страницу добавлен переключатель при клике по которому:

        тёмная тема приложения сменяется светлой +10

        светлая тема приложения сменяется тёмной +10

        после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5

+ Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5

+ Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5`

console.log('Самооценка своей работы:  (75/75) \n ', precheck)