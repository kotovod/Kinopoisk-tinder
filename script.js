'use strict';

// Массивы для хранения лайков пользователей
let user1Likes = [];
let user2Likes = [];
let user1SuperLikes = []; // Массив для хранения суперлайков первого пользователя
let user2SuperLikes = []; // Массив для хранения суперлайков второго пользователя
let currentUser = 1; // По умолчанию первый пользователь
const PERFECT_MATCH_THRESHOLD = 5; // Количество совпадений для "идеального фильма"

// Функция для сохранения данных в localStorage
function saveToLocalStorage() {
  localStorage.setItem('user1Likes', JSON.stringify(user1Likes));
  localStorage.setItem('user2Likes', JSON.stringify(user2Likes));
  localStorage.setItem('user1SuperLikes', JSON.stringify(user1SuperLikes));
  localStorage.setItem('user2SuperLikes', JSON.stringify(user2SuperLikes));
  localStorage.setItem('currentUser', currentUser);
  
  // Сохраняем текущие фильтры
  localStorage.setItem('moodFilter', moodSelect.value);
  localStorage.setItem('genreFilter', genreSelect.value);
  localStorage.setItem('durationFilter', durationSelect.value);
}

// Функция для загрузки данных из localStorage
function loadFromLocalStorage() {
  if (localStorage.getItem('user1Likes')) {
    user1Likes = JSON.parse(localStorage.getItem('user1Likes'));
  }
  if (localStorage.getItem('user2Likes')) {
    user2Likes = JSON.parse(localStorage.getItem('user2Likes'));
  }
  if (localStorage.getItem('user1SuperLikes')) {
    user1SuperLikes = JSON.parse(localStorage.getItem('user1SuperLikes'));
  }
  if (localStorage.getItem('user2SuperLikes')) {
    user2SuperLikes = JSON.parse(localStorage.getItem('user2SuperLikes'));
  }
  if (localStorage.getItem('currentUser')) {
    currentUser = parseInt(localStorage.getItem('currentUser'));
  }
  
  // Загружаем сохраненные фильтры
  if (localStorage.getItem('moodFilter')) {
    moodSelect.value = localStorage.getItem('moodFilter');
  }
  if (localStorage.getItem('genreFilter')) {
    genreSelect.value = localStorage.getItem('genreFilter');
  }
  if (localStorage.getItem('durationFilter')) {
    durationSelect.value = localStorage.getItem('durationFilter');
  }
}

// Данные о фильмах
const moviesData = [
  {
    id: 1,
    title: "Интерстеллар",
    year: 2014,
    genres: ["фантастика", "драма"],
    mood: ["exciting"],
    duration: 169, // в минутах
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/258687.jpg",
    rating: 8.2,
    description: "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, чтобы найти планету с подходящими для человечества условиями."
  },
  {
    id: 2,
    title: "Побег из Шоушенка",
    year: 1994,
    genres: ["драма"],
    mood: ["sad", "exciting"],
    duration: 142,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/326.jpg",
    rating: 9.1,
    description: "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки."
  },
  {
    id: 3,
    title: "Властелин колец: Братство Кольца",
    year: 2001,
    genres: ["фэнтези", "приключения"],
    mood: ["exciting"],
    duration: 178,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/328.jpg",
    rating: 8.6,
    description: "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал власть над всеми живыми тварями, но был обязан служить злу."
  },
  {
    id: 4,
    title: "Начало",
    year: 2010,
    genres: ["фантастика", "боевик"],
    mood: ["exciting"],
    duration: 148,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/447301.jpg",
    rating: 8.5,
    description: "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим."
  },
  {
    id: 5,
    title: "Темный рыцарь",
    year: 2008,
    genres: ["боевик", "триллер"],
    mood: ["exciting"],
    duration: 152,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/111543.jpg",
    rating: 8.3,
    description: "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы от преступности. Сотрудничество оказывается эффективным, но скоро они обнаружат себя посреди хаоса, развязанного восходящим криминальным гением Джокером."
  },
  {
    id: 6,
    title: "1+1",
    year: 2011,
    genres: ["драма", "комедия", "биография"],
    mood: ["fun", "sad"],
    duration: 112,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/535341.jpg",
    rating: 8.8,
    description: "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы."
  },
  {
    id: 7,
    title: "Зеленая миля",
    year: 1999,
    genres: ["драма", "криминал", "фэнтези"],
    mood: ["sad"],
    duration: 189,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/435.jpg",
    rating: 9.1,
    description: "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока."
  },
  {
    id: 8,
    title: "Форрест Гамп",
    year: 1994,
    genres: ["драма", "мелодрама"],
    mood: ["sad", "romantic"],
    duration: 142,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/448.jpg",
    rating: 8.9,
    description: "От лица главного героя Форреста Гампа, слабоумного безобидного человека с благородным и открытым сердцем, рассказывается история его необыкновенной жизни."
  },
  {
    id: 9,
    title: "Титаник",
    year: 1997,
    genres: ["мелодрама", "драма"],
    mood: ["romantic", "sad"],
    duration: 194,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/2213.jpg",
    rating: 8.4,
    description: "В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера."
  },
  {
    id: 10,
    title: "Один дома",
    year: 1990,
    genres: ["комедия", "семейный"],
    mood: ["fun"],
    duration: 103,
    image: "https://kinopoiskapiunofficial.tech/images/posters/kp/8124.jpg",
    rating: 8.3,
    description: "Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома... одного из своих детей. Юное создание, однако, не теряется и демонстрирует чудеса изобретательности. И когда в дом залезают грабители, им приходится не раз пожалеть о встрече с милым крошкой."
  }
];

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var superlike = document.getElementById('superlike');
var applyFiltersBtn = document.getElementById('apply-filters');
var moodSelect = document.getElementById('mood');
var genreSelect = document.getElementById('genre');
var durationSelect = document.getElementById('duration');

// Массив для хранения отфильтрованных фильмов
let filteredMovies = [...moviesData];

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(action) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];
    const movieId = parseInt(card.dataset.id);

    card.classList.add('removed');

    if (action === 'love') {
      // Обычный лайк
      addToLikes(movieId, false);
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else if (action === 'superlike') {
      // Суперлайк
      addToLikes(movieId, true);
      card.style.transform = 'translate(0, -' + moveOutWidth + 'px) rotate(0deg)';
    } else {
      // Дизлайк
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener('nope');
var loveListener = createButtonListener('love');
var superlikeListener = createButtonListener('superlike');

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
superlike.addEventListener('click', superlikeListener);

// Функция для создания карточек фильмов
function createMovieCards(movies) {
  // Очищаем контейнер с карточками
  const cardsContainer = document.querySelector('.tinder--cards');
  cardsContainer.innerHTML = '';
  
  // Создаем карточки для каждого фильма
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'tinder--card';
    card.dataset.id = movie.id;
    
    const durationClass = movie.duration <= 100 ? 'short' : movie.duration <= 140 ? 'medium' : 'long';
    card.dataset.duration = durationClass;
    card.dataset.genres = movie.genres.join(',');
    card.dataset.mood = movie.mood.join(',');
    
    // Проверяем, есть ли фильм в списке суперлайков
    const isSuperliked = (currentUser === 1 && user1SuperLikes.includes(movie.id)) ||
                         (currentUser === 2 && user2SuperLikes.includes(movie.id));
    
    // Добавляем индикатор суперлайка, если фильм был суперлайкнут
    const superlikeIndicator = isSuperliked ? `<div class="superliked"><i class="fa fa-star"></i></div>` : '';
    
    card.innerHTML = `
      <img src="${movie.image}" onerror="this.src='https://via.placeholder.com/600x900?text=Нет+изображения'">
      ${superlikeIndicator}
      <div class="movie-rating">
        <span class="rating">${movie.rating}</span>
      </div>
      <h3>${movie.title}</h3>
      <p class="movie-info">${movie.year}, ${movie.genres.join(', ')}</p>
      <p>${movie.description}</p>
      
      <!-- Добавляем overlay с текстом при наведении -->
      <div class="card-overlay">
        <h3>${movie.title}</h3>
        <p class="movie-info">${movie.year}, ${movie.genres.join(', ')}</p>
        <p>${movie.description}</p>
      </div>
    `;
    
    cardsContainer.appendChild(card);
  });
  
  // Обновляем список карточек и инициализируем их
  allCards = document.querySelectorAll('.tinder--card');
  initCards();
  
  // Добавляем обработчики событий для новых карточек
  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);
    
    hammertime.on('pan', function (event) {
      el.classList.add('moving');
    });
    
    hammertime.on('pan', function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;
      
      tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
      tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);
      
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;
      
      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });
    
    hammertime.on('panend', function (event) {
      el.classList.remove('moving');
      tinderContainer.classList.remove('tinder_love');
      tinderContainer.classList.remove('tinder_nope');
      
      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
      
      event.target.classList.toggle('removed', !keep);
      
      if (keep) {
        event.target.style.transform = '';
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
        
        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        initCards();
      }
    });
  });
}

// Функция для фильтрации фильмов
function filterMovies() {
  const moodValue = moodSelect.value;
  const genreValue = genreSelect.value;
  const durationValue = durationSelect.value;
  
  // Сохраняем фильтры в localStorage
  saveToLocalStorage();
  
  filteredMovies = moviesData.filter(movie => {
    // Фильтр по настроению
    if (moodValue !== 'all' && !movie.mood.includes(moodValue)) {
      return false;
    }
    
    // Фильтр по жанру
    if (genreValue !== 'all' && !movie.genres.includes(genreValue)) {
      return false;
    }
    
    // Фильтр по длительности
    if (durationValue !== 'all') {
      if (durationValue === 'short' && movie.duration > 100) {
        return false;
      } else if (durationValue === 'medium' && (movie.duration <= 100 || movie.duration > 140)) {
        return false;
      } else if (durationValue === 'long' && movie.duration <= 140) {
        return false;
      }
    }
    
    return true;
  });
  
  // Создаем карточки для отфильтрованных фильмов
  createMovieCards(filteredMovies);
}

// Функция для добавления фильма в список лайков текущего пользователя
function addToLikes(movieId, isSuperlike) {
  if (currentUser === 1) {
    if (!user1Likes.includes(movieId)) {
      user1Likes.push(movieId);
    }
    if (isSuperlike && !user1SuperLikes.includes(movieId)) {
      user1SuperLikes.push(movieId);
    }
  } else {
    if (!user2Likes.includes(movieId)) {
      user2Likes.push(movieId);
    }
    if (isSuperlike && !user2SuperLikes.includes(movieId)) {
      user2SuperLikes.push(movieId);
    }
  }
  
  // Сохраняем данные в localStorage
  saveToLocalStorage();
  
  // Обновляем список совпадений
  updateMatches();
}

// Функция для обновления списка совпадений
function updateMatches() {
  // Находим совпадения между лайками пользователей
  const matches = user1Likes.filter(movieId => user2Likes.includes(movieId));
  
  // Если есть совпадения, показываем их
  if (matches.length > 0) {
    const matchedMovies = moviesData.filter(movie => matches.includes(movie.id));
    
    // Сортируем фильмы по весу (суперлайки имеют больший вес)
    matchedMovies.sort((a, b) => {
      const aWeight = (user1SuperLikes.includes(a.id) ? 2 : 1) + (user2SuperLikes.includes(a.id) ? 2 : 1);
      const bWeight = (user1SuperLikes.includes(b.id) ? 2 : 1) + (user2SuperLikes.includes(b.id) ? 2 : 1);
      return bWeight - aWeight; // Сортировка по убыванию веса
    });
    
    showMatches(matchedMovies);
  }
}

// Функция для отображения совпадений
function showMatches(matchedMovies) {
  // Проверяем, существует ли уже контейнер для совпадений
  let matchesContainer = document.querySelector('.matches-container');
  
  // Если контейнера нет, создаем его
  if (!matchesContainer) {
    matchesContainer = document.createElement('div');
    matchesContainer.className = 'matches-container';
    document.querySelector('.tinder').appendChild(matchesContainer);
    
    const matchesTitle = document.createElement('h2');
    matchesTitle.textContent = 'Совпадения';
    matchesTitle.className = 'matches-title';
    matchesContainer.appendChild(matchesTitle);
    
    // Добавляем счетчик совпадений
    const matchesCounter = document.createElement('div');
    matchesCounter.className = 'matches-counter';
    matchesContainer.appendChild(matchesCounter);
    
    // Добавляем прогресс-бар
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    matchesContainer.appendChild(progressContainer);
    
    // Добавляем сообщение об идеальном совпадении
    const perfectMatch = document.createElement('div');
    perfectMatch.className = 'perfect-match';
    perfectMatch.textContent = 'Поздравляем! Вы нашли идеальный фильм для совместного просмотра!';
    matchesContainer.appendChild(perfectMatch);
    
    const matchesList = document.createElement('div');
    matchesList.className = 'matches-list';
    matchesContainer.appendChild(matchesList);
    
    // Добавляем кнопку для режима монетки, если есть хотя бы 2 совпадения
    if (matchedMovies.length >= 2) {
      const coinFlipButton = document.createElement('button');
      coinFlipButton.textContent = 'Режим монетки для тай-брейка';
      coinFlipButton.className = 'coin-button';
      coinFlipButton.addEventListener('click', () => {
        startCoinFlip(matchedMovies);
      });
      matchesContainer.appendChild(coinFlipButton);
    }
    
    // Добавляем кнопку "Скопировать список"
    if (matchedMovies.length > 0) {
      const copyListButton = document.createElement('button');
      copyListButton.textContent = 'Скопировать список';
      copyListButton.className = 'copy-list-button';
      copyListButton.addEventListener('click', () => {
        copyMatchedMoviesList(matchedMovies);
      });
      matchesContainer.appendChild(copyListButton);
    }
    
    // Добавляем кнопку для закрытия списка совпадений
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.className = 'close-matches-button';
    closeButton.addEventListener('click', () => {
      matchesContainer.style.display = 'none';
    });
    matchesContainer.appendChild(closeButton);
  } else {
    // Если контейнер уже существует, показываем его
    matchesContainer.style.display = 'block';
    const matchesList = matchesContainer.querySelector('.matches-list');
    matchesList.innerHTML = '';
    
    // Обновляем кнопку для режима монетки
    let coinFlipButton = matchesContainer.querySelector('.coin-button');
    if (matchedMovies.length >= 2) {
      if (!coinFlipButton) {
        coinFlipButton = document.createElement('button');
        coinFlipButton.textContent = 'Режим монетки для тай-брейка';
        coinFlipButton.className = 'coin-button';
        coinFlipButton.addEventListener('click', () => {
          startCoinFlip(matchedMovies);
        });
        matchesContainer.insertBefore(coinFlipButton, matchesContainer.querySelector('.close-matches-button'));
      }
    } else if (coinFlipButton) {
      coinFlipButton.remove();
    }
    
    // Обновляем кнопку "Скопировать список"
    let copyListButton = matchesContainer.querySelector('.copy-list-button');
    if (matchedMovies.length > 0) {
      if (!copyListButton) {
        copyListButton = document.createElement('button');
        copyListButton.textContent = 'Скопировать список';
        copyListButton.className = 'copy-list-button';
        copyListButton.addEventListener('click', () => {
          copyMatchedMoviesList(matchedMovies);
        });
        matchesContainer.insertBefore(copyListButton, matchesContainer.querySelector('.close-matches-button'));
      }
    } else if (copyListButton) {
      copyListButton.remove();
    }
  }
  
  // Обновляем счетчик совпадений
  const matchesCounter = matchesContainer.querySelector('.matches-counter');
  matchesCounter.textContent = `Найдено совпадений: ${matchedMovies.length} из ${moviesData.length}`;
  
  // Обновляем прогресс-бар
  const progressBar = matchesContainer.querySelector('.progress-bar');
  const progressPercentage = (matchedMovies.length / PERFECT_MATCH_THRESHOLD) * 100;
  progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
  
  // Проверяем, достигнут ли порог "идеального фильма"
  const perfectMatch = matchesContainer.querySelector('.perfect-match');
  if (matchedMovies.length >= PERFECT_MATCH_THRESHOLD) {
    perfectMatch.classList.add('active');
  } else {
    perfectMatch.classList.remove('active');
  }
  
  // Заполняем список совпадений
  const matchesList = matchesContainer.querySelector('.matches-list');
  matchedMovies.forEach(movie => {
    const isSuperlikedByUser1 = user1SuperLikes.includes(movie.id);
    const isSuperlikedByUser2 = user2SuperLikes.includes(movie.id);
    const weight = (isSuperlikedByUser1 ? 2 : 1) + (isSuperlikedByUser2 ? 2 : 1);
    
    const matchItem = document.createElement('div');
    matchItem.className = 'match-item';
    
    // Добавляем индикаторы суперлайков
    let superlikeIndicators = '';
    if (isSuperlikedByUser1) {
      superlikeIndicators += '<span class="superlike-indicator">Суперлайк от Пользователя 1</span>';
    }
    if (isSuperlikedByUser2) {
      superlikeIndicators += '<span class="superlike-indicator">Суперлайк от Пользователя 2</span>';
    }
    
    matchItem.innerHTML = `
      <img src="${movie.image}" onerror="this.src='https://via.placeholder.com/600x900?text=Нет+изображения'">
      <div class="match-info">
        <h3>${movie.title}</h3>
        <p class="movie-info">${movie.year}, ${movie.genres.join(', ')}</p>
        <div class="movie-rating">
          <span class="rating">${movie.rating}</span>
        </div>
        <div class="match-weight">Вес совпадения: ${weight}</div>
        ${superlikeIndicators}
      </div>
    `;
    matchesList.appendChild(matchItem);
  });
}

// Функция для переключения пользователя
function switchUser() {
  currentUser = currentUser === 1 ? 2 : 1;
  const userIndicator = document.querySelector('.user-indicator');
  userIndicator.textContent = `Пользователь ${currentUser}`;
}

// Функция для запуска режима монетки
function startCoinFlip(matchedMovies) {
  // Выбираем два случайных фильма из списка совпадений
  if (matchedMovies.length < 2) return;
  
  // Перемешиваем массив фильмов
  const shuffledMovies = shuffleArray(matchedMovies);
  const movie1 = shuffledMovies[0];
  const movie2 = shuffledMovies[1];
  
  // Создаем контейнер для режима монетки
  const coinFlipContainer = document.createElement('div');
  coinFlipContainer.className = 'coin-flip-container';
  document.body.appendChild(coinFlipContainer);
  
  // Создаем монетку
  const coin = document.createElement('div');
  coin.className = 'coin';
  
  // Создаем стороны монетки
  const heads = document.createElement('div');
  heads.className = 'coin-side heads';
  heads.textContent = '1';
  
  const tails = document.createElement('div');
  tails.className = 'coin-side tails';
  tails.textContent = '2';
  
  coin.appendChild(heads);
  coin.appendChild(tails);
  coinFlipContainer.appendChild(coin);
  
  // Создаем элемент для отображения результата
  const coinResult = document.createElement('div');
  coinResult.className = 'coin-result';
  coinFlipContainer.appendChild(coinResult);
  
  // Создаем контейнер для фильмов
  const coinMovies = document.createElement('div');
  coinMovies.className = 'coin-movies';
  
  // Добавляем информацию о первом фильме
  const movie1Container = document.createElement('div');
  movie1Container.className = 'coin-movie';
  movie1Container.innerHTML = `
    <img src="${movie1.image}" onerror="this.src='https://via.placeholder.com/600x900?text=Нет+изображения'">
    <div class="coin-movie-info">
      <h3>${movie1.title}</h3>
      <p>${movie1.year}, ${movie1.genres.join(', ')}</p>
    </div>
  `;
  
  // Добавляем информацию о втором фильме
  const movie2Container = document.createElement('div');
  movie2Container.className = 'coin-movie';
  movie2Container.innerHTML = `
    <img src="${movie2.image}" onerror="this.src='https://via.placeholder.com/600x900?text=Нет+изображения'">
    <div class="coin-movie-info">
      <h3>${movie2.title}</h3>
      <p>${movie2.year}, ${movie2.genres.join(', ')}</p>
    </div>
  `;
  
  coinMovies.appendChild(movie1Container);
  coinMovies.appendChild(movie2Container);
  coinFlipContainer.appendChild(coinMovies);
  
  // Создаем кнопки
  const coinButtons = document.createElement('div');
  coinButtons.className = 'coin-buttons';
  
  const flipAgainButton = document.createElement('button');
  flipAgainButton.className = 'coin-button';
  flipAgainButton.textContent = 'Подбросить еще раз';
  flipAgainButton.addEventListener('click', () => {
    // Удаляем старую монетку и создаем новую
    coin.remove();
    const newCoin = document.createElement('div');
    newCoin.className = 'coin';
    newCoin.appendChild(heads.cloneNode(true));
    newCoin.appendChild(tails.cloneNode(true));
    coinFlipContainer.insertBefore(newCoin, coinResult);
    
    // Запускаем анимацию и определяем результат
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 1 : 2;
      const winningMovie = result === 1 ? movie1 : movie2;
      coinResult.textContent = `Победитель: ${winningMovie.title}`;
      
      // Подсвечиваем победителя
      if (result === 1) {
        movie1Container.style.boxShadow = '0 0 20px #ff6d00';
        movie2Container.style.boxShadow = 'none';
      } else {
        movie2Container.style.boxShadow = '0 0 20px #ff6d00';
        movie1Container.style.boxShadow = 'none';
      }
    }, 2000);
  });
  
  const closeButton = document.createElement('button');
  closeButton.className = 'coin-button secondary';
  closeButton.textContent = 'Закрыть';
  closeButton.addEventListener('click', () => {
    coinFlipContainer.remove();
  });
  
  coinButtons.appendChild(flipAgainButton);
  coinButtons.appendChild(closeButton);
  coinFlipContainer.appendChild(coinButtons);
  
  // Запускаем анимацию и определяем результат
  setTimeout(() => {
    const result = Math.random() < 0.5 ? 1 : 2;
    const winningMovie = result === 1 ? movie1 : movie2;
    coinResult.textContent = `Победитель: ${winningMovie.title}`;
    
    // Подсвечиваем победителя
    if (result === 1) {
      movie1Container.style.boxShadow = '0 0 20px #ff6d00';
    } else {
      movie2Container.style.boxShadow = '0 0 20px #ff6d00';
    }
  }, 2000);
}

// Функция для копирования списка фильмов в буфер обмена
function copyMatchedMoviesList(matchedMovies) {
  // Формируем текст для копирования
  const moviesList = matchedMovies.map(movie => {
    const isSuperlikedByUser1 = user1SuperLikes.includes(movie.id);
    const isSuperlikedByUser2 = user2SuperLikes.includes(movie.id);
    const superlikeInfo = [];
    
    if (isSuperlikedByUser1) {
      superlikeInfo.push('Суперлайк от Пользователя 1');
    }
    if (isSuperlikedByUser2) {
      superlikeInfo.push('Суперлайк от Пользователя 2');
    }
    
    const superlikeText = superlikeInfo.length > 0 ? ` (${superlikeInfo.join(', ')})` : '';
    return `${movie.title} (${movie.year}) - Рейтинг: ${movie.rating}${superlikeText}`;
  }).join('\n');
  
  // Копируем текст в буфер обмена
  navigator.clipboard.writeText(moviesList)
    .then(() => {
      // Показываем уведомление об успешном копировании
      const notification = document.createElement('div');
      notification.className = 'copy-notification';
      notification.textContent = 'Список скопирован в буфер обмена!';
      document.body.appendChild(notification);
      
      // Удаляем уведомление через 2 секунды
      setTimeout(() => {
        notification.remove();
      }, 2000);
    })
    .catch(err => {
      console.error('Ошибка при копировании: ', err);
      alert('Не удалось скопировать список. Попробуйте еще раз.');
    });
}

// Функция для сброса фильтров
function resetFilters() {
  // Сбрасываем значения селектов
  moodSelect.value = 'all';
  genreSelect.value = 'all';
  durationSelect.value = 'all';
  
  // Перемешиваем все фильмы для рандомного показа
  filteredMovies = shuffleArray(moviesData);
  
  // Создаем карточки для всех фильмов
  createMovieCards(filteredMovies);
}

// Функция для перемешивания массива (алгоритм Фишера-Йейтса)
function shuffleArray(array) {
  const newArray = [...array]; // Создаем копию массива
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Меняем элементы местами
  }
  return newArray;
}

// Обработчик события для кнопки "Применить"
applyFiltersBtn.addEventListener('click', filterMovies);

// Создаем кнопку сброса фильтров
const resetFiltersBtn = document.createElement('button');
resetFiltersBtn.id = 'reset-filters';
resetFiltersBtn.className = 'reset-filters-button';
resetFiltersBtn.textContent = 'Сбросить фильтры';
resetFiltersBtn.addEventListener('click', resetFilters);

// Функция для обработки нажатия клавиш
function handleKeyDown(e) {
  if (e.key === 'ArrowLeft') {
    // Имитируем нажатие кнопки "Не нравится"
    nopeListener(new Event('click'));
  } else if (e.key === 'ArrowRight') {
    // Имитируем нажатие кнопки "Нравится"
    loveListener(new Event('click'));
  } else if (e.key === 'ArrowUp') {
    // Имитируем нажатие кнопки "Суперлайк"
    superlikeListener(new Event('click'));
  }
}

// Добавляем обработчик нажатия клавиш
document.addEventListener('keydown', handleKeyDown);

// Добавляем класс loaded после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    tinderContainer.classList.add('loaded');
    
    // Создаем индикатор текущего пользователя
    const userIndicator = document.createElement('div');
    userIndicator.className = 'user-indicator';
    userIndicator.textContent = `Пользователь ${currentUser}`;
    document.querySelector('.header').appendChild(userIndicator);
    
    // Добавляем кнопку для переключения пользователя
    const switchUserBtn = document.createElement('button');
    switchUserBtn.className = 'switch-user-button';
    switchUserBtn.textContent = 'Сменить пользователя';
    switchUserBtn.addEventListener('click', switchUser);
    document.querySelector('.header').appendChild(switchUserBtn);
    
    // Добавляем кнопку сброса фильтров в контейнер с фильтрами
    document.querySelector('.filters').appendChild(resetFiltersBtn);
    
    // Инициализируем карточки с фильмами при загрузке страницы
    // Перемешиваем фильмы для рандомного показа
    filteredMovies = shuffleArray(moviesData);
    createMovieCards(filteredMovies);
  }, 100);
});
