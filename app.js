const urlAllBook = "https://api.biblesupersearch.com/api/books?language=en";

const header = document.querySelector(".title-page h4");
const bibleVerses1 = document.querySelector(".column1");
const bibleVerses2 = document.querySelector(".column2");
const bibleReference = document.querySelector(".bible-reference");

const selectBook = document.querySelector(".book");
const selectPart = document.querySelector(".part");

let dataBook;
let shortname;
let part;
let infoFileCross = new Array();
let countVerses;


const allInfoBooks = new Array();
allInfoBooks.push({shortNameJs1: "Gen",  	shortNameJs2: "GEN",  shortNameRus: "Быт.",  	fullNameRus: "Бытие"});
allInfoBooks.push({shortNameJs1: "Ex",  	shortNameJs2: "EXO",  shortNameRus: "Исх.",  	fullNameRus: "Исход"});
allInfoBooks.push({shortNameJs1: "Lev",  	shortNameJs2: "LEV",  shortNameRus: "Лев.",  	fullNameRus: "Левит"});
allInfoBooks.push({shortNameJs1: "Num",  	shortNameJs2: "NUM",  shortNameRus: "Числ.",  	fullNameRus: "Числа"});
allInfoBooks.push({shortNameJs1: "Deut",  	shortNameJs2: "DEU",  shortNameRus: "Втор.",  	fullNameRus: "Второзаконие"});
allInfoBooks.push({shortNameJs1: "Josh",  	shortNameJs2: "JOS",  shortNameRus: "Ис.Нав.",  fullNameRus: "Иисус Навин"});
allInfoBooks.push({shortNameJs1: "Judg",  	shortNameJs2: "JDG",  shortNameRus: "Суд.",  	fullNameRus: "Судеи"});
allInfoBooks.push({shortNameJs1: "Ru",  	shortNameJs2: "RUT",  shortNameRus: "Руфь.",  	fullNameRus: "Руфь"});
allInfoBooks.push({shortNameJs1: "1 Sam",  	shortNameJs2: "1SA",  shortNameRus: "1Цар.",   fullNameRus: "1 Царств"});
allInfoBooks.push({shortNameJs1: "2 Sam",  	shortNameJs2: "2SA",  shortNameRus: "2Цар.",   fullNameRus: "2 Царств"});
allInfoBooks.push({shortNameJs1: "1 Ki",  	shortNameJs2: "1KI",  shortNameRus: "3Цар.",   fullNameRus: "3 Царств"});
allInfoBooks.push({shortNameJs1: "2 Ki",  	shortNameJs2: "2KI",  shortNameRus: "4Цар.",   fullNameRus: "4 Царств"});
allInfoBooks.push({shortNameJs1: "1 Chron", shortNameJs2: "1CH",  shortNameRus: "1Пар.",   fullNameRus: "1 Паралипоменон"});
allInfoBooks.push({shortNameJs1: "2 Chron", shortNameJs2: "2CH",  shortNameRus: "2Пар.",   fullNameRus: "2 Паралипоменон"});
allInfoBooks.push({shortNameJs1: "Ezra", 	shortNameJs2: "EZR",  shortNameRus: "Езр.",  	fullNameRus: "Ездра"});
allInfoBooks.push({shortNameJs1: "Neh",  	shortNameJs2: "NEH",  shortNameRus: "Неем.",  	fullNameRus: "Неемия"});
allInfoBooks.push({shortNameJs1: "Esth",  	shortNameJs2: "EST",  shortNameRus: "Эсф.",  	fullNameRus: "Есфирь"});
allInfoBooks.push({shortNameJs1: "Job",  	shortNameJs2: "JOB",  shortNameRus: "Иов.",  	fullNameRus: "Иов"});
allInfoBooks.push({shortNameJs1: "Ps",  	shortNameJs2: "PSA",  shortNameRus: "Пс.",  	fullNameRus: "Псалтирь"});
allInfoBooks.push({shortNameJs1: "Prov",  	shortNameJs2: "PRO",  shortNameRus: "Притч.",   fullNameRus: "Притчи"});
allInfoBooks.push({shortNameJs1: "Ecc",  	shortNameJs2: "ECC",  shortNameRus: "Эккл.",  	fullNameRus: "Екклесиаст"});
allInfoBooks.push({shortNameJs1: "SOS",  	shortNameJs2: "SOS",  shortNameRus: "Песн.",  	fullNameRus: "Песни Песней"});
allInfoBooks.push({shortNameJs1: "Isa",  	shortNameJs2: "ISA",  shortNameRus: "Ис.",  	fullNameRus: "Исаия"});
allInfoBooks.push({shortNameJs1: "Jer",  	shortNameJs2: "JER",  shortNameRus: "Иер.",  	fullNameRus: "Иеремия"});
allInfoBooks.push({shortNameJs1: "Lam",  	shortNameJs2: "LAM",  shortNameRus: "Плач.",  	fullNameRus: "Плач Иеремии"});
allInfoBooks.push({shortNameJs1: "Eze",  	shortNameJs2: "EZE",  shortNameRus: "Иез.",  	fullNameRus: "Иезекииль"});
allInfoBooks.push({shortNameJs1: "Dan",  	shortNameJs2: "DAN",  shortNameRus: "Дан.",  	fullNameRus: "Даниил"});
allInfoBooks.push({shortNameJs1: "Hos",  	shortNameJs2: "HOS",  shortNameRus: "Ос.",  	fullNameRus: "Осия"});
allInfoBooks.push({shortNameJs1: "Joel",  	shortNameJs2: "JOE",  shortNameRus: "Иоил.",  	fullNameRus: "Иоиль"});
allInfoBooks.push({shortNameJs1: "Amos",  	shortNameJs2: "AMO",  shortNameRus: "Амос.",  	fullNameRus: "Амос"});
allInfoBooks.push({shortNameJs1: "Obad",  	shortNameJs2: "OBA",  shortNameRus: "Авд.",  	fullNameRus: "Авдий"});
allInfoBooks.push({shortNameJs1: "Jon",  	shortNameJs2: "JON",  shortNameRus: "Ион.",  	fullNameRus: "Иона"});
allInfoBooks.push({shortNameJs1: "Micah",  	shortNameJs2: "MIC",  shortNameRus: "Мих.",  	fullNameRus: "Михей"});
allInfoBooks.push({shortNameJs1: "Nah",  	shortNameJs2: "NAH",  shortNameRus: "Наум.",  	fullNameRus: "Наум"});
allInfoBooks.push({shortNameJs1: "Hab",  	shortNameJs2: "HAB",  shortNameRus: "Авв.",  	fullNameRus: "Аввакум"});
allInfoBooks.push({shortNameJs1: "Zeph",  	shortNameJs2: "ZEP",  shortNameRus: "Соф.",  	fullNameRus: "Софония"});
allInfoBooks.push({shortNameJs1: "Hag",  	shortNameJs2: "HAG",  shortNameRus: "Агг.",  	fullNameRus: "Аггей"});
allInfoBooks.push({shortNameJs1: "Zech",  	shortNameJs2: "ZEC",  shortNameRus: "Зах.",  	fullNameRus: "Захария"});
allInfoBooks.push({shortNameJs1: "Mal",  	shortNameJs2: "MAL",  shortNameRus: "Мал.",  	fullNameRus: "Малахия"});
allInfoBooks.push({shortNameJs1: "Matt",  	shortNameJs2: "MAT",  shortNameRus: "Мф.",  	fullNameRus: "От Матфея"});
allInfoBooks.push({shortNameJs1: "Mark",  	shortNameJs2: "MAR",  shortNameRus: "Мк.",  	fullNameRus: "От Марка"});
allInfoBooks.push({shortNameJs1: "Luke",  	shortNameJs2: "LUK",  shortNameRus: "Лк.",  	fullNameRus: "От Луки"});
allInfoBooks.push({shortNameJs1: "John",  	shortNameJs2: "JOH",  shortNameRus: "Ин.",  	fullNameRus: "От Иоанна"});
allInfoBooks.push({shortNameJs1: "Acts",  	shortNameJs2: "ACT",  shortNameRus: "Деян.",  	fullNameRus: "Деяния апостолов"});
allInfoBooks.push({shortNameJs1: "Rom",  	shortNameJs2: "ROM",  shortNameRus: "Рим.",  	fullNameRus: "Римлянам"});
allInfoBooks.push({shortNameJs1: "1 Cor",  	shortNameJs2: "1CO",  shortNameRus: "1Кор.",  	fullNameRus: "1 Коринфянам"});
allInfoBooks.push({shortNameJs1: "2 Cor",  	shortNameJs2: "2CO",  shortNameRus: "2Кор.",  	fullNameRus: "2 Коринфянам"});
allInfoBooks.push({shortNameJs1: "Gal",  	shortNameJs2: "GAL",  shortNameRus: "Гал.",  	fullNameRus: "Галатам"});
allInfoBooks.push({shortNameJs1: "Eph",  	shortNameJs2: "EPH",  shortNameRus: "Эф.",  	fullNameRus: "Ефесянам"});
allInfoBooks.push({shortNameJs1: "Phil",  	shortNameJs2: "PHP",  shortNameRus: "Флп.",  	fullNameRus: "Филиппийцам"});
allInfoBooks.push({shortNameJs1: "Col",  	shortNameJs2: "COL",  shortNameRus: "Кол.",  	fullNameRus: "Колоссянам"});
allInfoBooks.push({shortNameJs1: "1 Thess", shortNameJs2: "1TH",  shortNameRus: "1Фес.",	fullNameRus: "1 Фессалоникийцам"});
allInfoBooks.push({shortNameJs1: "2 Thess", shortNameJs2: "2TH",  shortNameRus: "2Фес.",   fullNameRus: "2 Фессалоникийцам"});
allInfoBooks.push({shortNameJs1: "1 Tim",  	shortNameJs2: "1TI",  shortNameRus: "1Тим.",   fullNameRus: "1 Тимофею"});
allInfoBooks.push({shortNameJs1: "2 Tim",  	shortNameJs2: "2TI",  shortNameRus: "2Тим.",   fullNameRus: "2 Тимофею"});
allInfoBooks.push({shortNameJs1: "Titus",  	shortNameJs2: "TIT",  shortNameRus: "Тит.",  	fullNameRus: "Титу"});
allInfoBooks.push({shortNameJs1: "Phm",  	shortNameJs2: "PHM",  shortNameRus: "Флм.",  	fullNameRus: "Филимону"});
allInfoBooks.push({shortNameJs1: "Heb",  	shortNameJs2: "HEB",  shortNameRus: "Евр.",  	fullNameRus: "Евреям"});
allInfoBooks.push({shortNameJs1: "Jas",  	shortNameJs2: "JAM",  shortNameRus: "Иак.",  	fullNameRus: "Иакова"});
allInfoBooks.push({shortNameJs1: "1 Pet",  	shortNameJs2: "1PE",  shortNameRus: "1Петр.",  fullNameRus: "1 Петра"});
allInfoBooks.push({shortNameJs1: "2 Pet",  	shortNameJs2: "2PE",  shortNameRus: "2Петр.",  fullNameRus: "2 Петра"});
allInfoBooks.push({shortNameJs1: "1 John",  shortNameJs2: "1JO",  shortNameRus: "1Ин.",  	fullNameRus: "1 Иоанна"});
allInfoBooks.push({shortNameJs1: "2 John",  shortNameJs2: "2JO",  shortNameRus: "2Ин.",  	fullNameRus: "2 Иоанна"});
allInfoBooks.push({shortNameJs1: "3 John",  shortNameJs2: "3JO",  shortNameRus: "3Ин.",  	fullNameRus: "3 Иоанна"});
allInfoBooks.push({shortNameJs1: "Jude",  	shortNameJs2: "JDE",  shortNameRus: "Иуд.",  	fullNameRus: "Иуды"});
allInfoBooks.push({shortNameJs1: "Rev",  	shortNameJs2: "REV",  shortNameRus: "Откр.",  	fullNameRus: "Откровение"});

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function removeAll(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function fillSelected(node, numberItem) {
  removeAll(node);
  let option = createNode("option");
  option.disabled = true;
  option.selected = true;
  option.label = `Выберите главу Библии`;

  append(node, option);

  for (let item = 1; item <= numberItem; item++) {
    let option = createNode("option");
    option.value = `${item}`;
    option.label = `${item}`;

    append(node, option);
  }
}

function fillVerses() {
  let url = `https://api.biblesupersearch.com/api?bible=synodal&reference=${shortname}%20${part}`;

  bibleVerses1.innerHTML = "";
  bibleVerses2.innerHTML = "";

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let { book_name:nameBook, chapter_verse, verses_count, verses } = data.results[0]
      let countTextPartColumn = 0;
      countVerses = verses_count;

      /*
      Получаем количество символов в главе
      */
      for (let i = 1; i <= verses_count; i++) {
        let textVerse = verses.synodal[part][i].text;
        let countText = textVerse.length;
        countTextPartColumn += countText;
      }
      countTextPartColumn = countTextPartColumn / 2;

      header.innerHTML = `Библейская страница: ${nameBook} ${chapter_verse} глава`;

      for (let i = 1; i <= verses_count; i++) {
        let textVerse = verses.synodal[part][i].text;
        let countText = textVerse.length;
        vers = `<div class = "vers"> 
          <sup class ="sup-index "> ${i} </sup>
          ${textVerse}
          </div>`;

        countTextPartColumn -= countText;
        if (countTextPartColumn > 0) {
          bibleVerses1.innerHTML += `${vers}`;
        } else bibleVerses2.innerHTML += `${vers}`;
      }
    })
    .then(function () {
      fillCrossReference(countVerses);
    })
    .catch(function (error) {
      console.log(error);
    });
}

selectBook.addEventListener("change", function () {
  //Получаем короткое имя книги Библии из select
  shortname = this.options[this.selectedIndex].value;
  /*
    Забираем по индексу, т.к. это массив объектов
    Нумерация в массив с 0, потому index - 1 
  */
  chapters = dataBook[this.selectedIndex - 1].chapters;
  fillSelected(selectPart, chapters);
});

selectPart.addEventListener("change", function () {
  part = this.options[this.selectedIndex].value;

  fillVerses();
});


function fillObjectFileCrossRefence(countFile) {
  let usrlFileJson = `https://raw.githubusercontent.com/josephilipraja/bible-cross-reference-json/master/${countFile}.json`;
  fetch(usrlFileJson)
    .then((resp) => resp.json())
    .then(function (data) {
      for (key in data) {
          infoFileCross.push({
          nameVerse: data[key].v,
          countFile: countFile,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillInfoFileCross() {
  for (let index = 1; index < 33; index++) {
    fillObjectFileCrossRefence(index);
  }
}

function findCrossReference(countFile, shortname, part, numberVers) {
  let usrlFileJson = `https://raw.githubusercontent.com/josephilipraja/bible-cross-reference-json/master/${countFile}.json`;
  shortname = getShortNameJs2(shortname);
  fetch(usrlFileJson)
    .then((resp) => resp.json())
    .then(function (data) {
      for (key in data) {
        if (data[key].v == `${shortname} ${part} ${numberVers}`) {
          let tempVers = data[key].v.split(" ");
          let numberReference = tempVers[2];

          let vers = `<div class="vers"> 
          <sup class ="sup-index "> 
          ${numberReference}: 
          </sup>
          </div>`;

          let countRef = 0;
          let versRef = "";
          for (k in data[key].r) {
            if (countRef > 3) break;
            let tempVersRef = data[key].r[k].split(" ");
            let nameRef = tempVersRef[0];
            nameRef = getShortNameRus(nameRef);
            let partRef = tempVersRef[1];
            let verRef = tempVersRef[2];

            versRef += `${nameRef} ${partRef}:${verRef}; `;
            countRef++;
          }
          bibleReference.innerHTML += `<div class = "versRef"> 
           ${vers} ${versRef}
           </div>`;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function findCountFile(shortname, part, numberVers) {
  shortname = getShortNameJs2(shortname);
  return infoFileCross.find(
    (item) => item.nameVerse == `${shortname} ${part} ${numberVers}`
  ).countFile;
}

function fillCrossReference(countVerses) {
  bibleReference.innerHTML = "";
  for (let numberVerse = 1; numberVerse <= countVerses; numberVerse++) {
    let countFile = findCountFile(shortname, part, numberVerse);
    findCrossReference(countFile, shortname, part, numberVerse);
  }
}

function getFullnameRus(shortNameJs1){
  return allInfoBooks.find(element=>element.shortNameJs1 == shortNameJs1).fullNameRus;
}

function getShortNameRus(shortNameJs2){
  return allInfoBooks.find(element=>element.shortNameJs2 == shortNameJs2).shortNameRus;
}

function getShortNameJs2(shortNameJs1){
  return allInfoBooks.find(element=>element.shortNameJs1 == shortNameJs1).shortNameJs2;
}




// ------------------------------------------

//Заполнение файла с перекрестными ссылками и номерами файлов
fillInfoFileCross();

fetch(urlAllBook)
  .then((resp) => resp.json())
  .then(function (data) {
    dataBook = data.results;

    for (let result of data.results) {
      let option = createNode("option");
      option.value = `${result.shortname}`;
      let name = getFullnameRus(result.shortname);
      option.label = `${name}`;
      append(selectBook, option);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
