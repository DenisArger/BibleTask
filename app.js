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
let numberVers;
let infoFileCross = new Array();
let books = new Array();
let countFile;
let countVerses;
let referenceVers;


//Словарь для организации соответствия между краткими названиями из разных json файлов
let nameBooksMap = new Map();
nameBooksMap.set("Gen", "GEN");
nameBooksMap.set("Ex", "EXO");
nameBooksMap.set("Lev", "LEV");
nameBooksMap.set("Num", "NUM");
nameBooksMap.set("Deut", "DEU");
nameBooksMap.set("Josh", "JOS");
nameBooksMap.set("Judg", "JDG");
nameBooksMap.set("Ru", "RUT");
nameBooksMap.set("1 Sam", "1SA");
nameBooksMap.set("2 Sam", "2SA");
nameBooksMap.set("1 Ki", "1KI");
nameBooksMap.set("2 Ki", "2KI");
nameBooksMap.set("1 Chron", "1CH");
nameBooksMap.set("2 Chron", "2CH");
nameBooksMap.set("Ezra", "EZR");
nameBooksMap.set("Neh", "NEH");
nameBooksMap.set("Esth", "EST");
nameBooksMap.set("Job", "JOB");
nameBooksMap.set("Ps", "PSA");
nameBooksMap.set("Prov", "PRO");
nameBooksMap.set("Ecc", "ECC");
nameBooksMap.set("SOS", "SOS");
nameBooksMap.set("Isa", "ISA");
nameBooksMap.set("Jer", "JER");
nameBooksMap.set("Lam", "LAM");
nameBooksMap.set("Eze", "EZE");
nameBooksMap.set("Dan", "DAN");
nameBooksMap.set("Hos", "HOS");
nameBooksMap.set("Joel", "JOE");
nameBooksMap.set("Amos", "AMO");
nameBooksMap.set("Obad", "OBA");
nameBooksMap.set("Jon", "JON");
nameBooksMap.set("Micah", "MIC");
nameBooksMap.set("Nah", "NAH");
nameBooksMap.set("Hab", "HAB");
nameBooksMap.set("Zeph", "ZEP");
nameBooksMap.set("Hag", "HAG");
nameBooksMap.set("Zech", "ZEC");
nameBooksMap.set("Mal", "MAL");
nameBooksMap.set("Matt", "MAT");
nameBooksMap.set("Mark", "MAR");
nameBooksMap.set("Luke", "LUK");
nameBooksMap.set("John", "JOH");
nameBooksMap.set("Acts", "ACT");
nameBooksMap.set("Rom", "ROM");
nameBooksMap.set("1 Cor", "1CO");
nameBooksMap.set("2 Cor", "2CO");
nameBooksMap.set("Gal", "GAL");
nameBooksMap.set("Eph", "EPH");
nameBooksMap.set("Phil", "PHP");
nameBooksMap.set("Col", "COL");
nameBooksMap.set("1 Thess", "1TH");
nameBooksMap.set("2 Thess", "2TH");
nameBooksMap.set("1 Tim", "1TI");
nameBooksMap.set("2 Tim", "2TI");
nameBooksMap.set("Titus", "TIT");
nameBooksMap.set("Phm", "PHM");
nameBooksMap.set("Heb", "HEB");
nameBooksMap.set("Jas", "JAM");
nameBooksMap.set("1 Pet", "1PE");
nameBooksMap.set("2 Pet", "2PE");
nameBooksMap.set("1 John", "1JO");
nameBooksMap.set("2 John", "2JO");
nameBooksMap.set("3 John", "3JO");
nameBooksMap.set("Jude", "JDE");
nameBooksMap.set("Rev", "REV");

//Словарь для организации соответствия между краткими и полными названиями русском
let nameAllBooksMap = new Map();
nameAllBooksMap.set("Gen", "Бытие");
nameAllBooksMap.set("Ex", "Исход");
nameAllBooksMap.set("Lev", "Левит");
nameAllBooksMap.set("Num", "Числа");
nameAllBooksMap.set("Deut", "Второзаконие");
nameAllBooksMap.set("Josh", "Иисус Навин");
nameAllBooksMap.set("Judg", "Судеи");
nameAllBooksMap.set("Ru", "Руфь");
nameAllBooksMap.set("1 Sam", "1 Царств");
nameAllBooksMap.set("2 Sam", "2 Царств");
nameAllBooksMap.set("1 Ki", "3 Царств");
nameAllBooksMap.set("2 Ki", "4 Царств");
nameAllBooksMap.set("1 Chron", "1 Паралипоменон");
nameAllBooksMap.set("2 Chron", "2 Паралипоменон");
nameAllBooksMap.set("Ezra", "Ездра");
nameAllBooksMap.set("Neh", "Неемия");
nameAllBooksMap.set("Esth", "Есфирь");
nameAllBooksMap.set("Job", "Иов");
nameAllBooksMap.set("Ps", "Псалтирь");
nameAllBooksMap.set("Prov", "Притчи");
nameAllBooksMap.set("Ecc", "Екклесиаст");
nameAllBooksMap.set("SOS", "Песни Песней");
nameAllBooksMap.set("Isa", "Исаия");
nameAllBooksMap.set("Jer", "Иеремия");
nameAllBooksMap.set("Lam", "Плач Иеремии");
nameAllBooksMap.set("Eze", "Иезекииль");
nameAllBooksMap.set("Dan", "Даниил");
nameAllBooksMap.set("Hos", "Осия");
nameAllBooksMap.set("Joel", "Иоиль");
nameAllBooksMap.set("Amos", "Амос");
nameAllBooksMap.set("Obad", "Авдий");
nameAllBooksMap.set("Jon", "Иона");
nameAllBooksMap.set("Micah", "Михей");
nameAllBooksMap.set("Nah", "Наум");
nameAllBooksMap.set("Hab", "Аввакум");
nameAllBooksMap.set("Zeph", "Софония");
nameAllBooksMap.set("Hag", "Аггей");
nameAllBooksMap.set("Zech", "Захария");
nameAllBooksMap.set("Mal", "Малахия");
nameAllBooksMap.set("Matt", "От Матфея");
nameAllBooksMap.set("Mark", "От Марка");
nameAllBooksMap.set("Luke", "От Луки");
nameAllBooksMap.set("John", "От Иоанна");
nameAllBooksMap.set("Acts", "Деяния апостолов");
nameAllBooksMap.set("Rom", "Римлянам");
nameAllBooksMap.set("1 Cor", "1 Коринфянам");
nameAllBooksMap.set("2 Cor", "2 Коринфянам");
nameAllBooksMap.set("Gal", "Галатам");
nameAllBooksMap.set("Eph", "Ефесянам");
nameAllBooksMap.set("Phil", "Филиппийцам");
nameAllBooksMap.set("Col", "Колоссянам");
nameAllBooksMap.set("1 Thess", "1 Фессалоникийцам");
nameAllBooksMap.set("2 Thess", "2 Фессалоникийцам");
nameAllBooksMap.set("1 Tim", "1 Тимофею");
nameAllBooksMap.set("2 Tim", "2 Тимофею");
nameAllBooksMap.set("Titus", "Титу");
nameAllBooksMap.set("Phm", "Филимону");
nameAllBooksMap.set("Heb", "Евреям");
nameAllBooksMap.set("Jas", "Иакова");
nameAllBooksMap.set("1 Pet", "1 Петра");
nameAllBooksMap.set("2 Pet", "2 Петра");
nameAllBooksMap.set("1 John", "1 Иоанна");
nameAllBooksMap.set("2 John", "2 Иоанна");
nameAllBooksMap.set("3 John", "3 Иоанна");
nameAllBooksMap.set("Jude", "Иуды");
nameAllBooksMap.set("Rev", "Откровение");

//Словарь для организации соответствия между краткими названиями на англ и рус
let nameShortBooksMap = new Map();
nameShortBooksMap.set("GEN", "Быт.");
nameShortBooksMap.set("EXO", "Исх.");
nameShortBooksMap.set("LEV", "Лев.");
nameShortBooksMap.set("NUM", "Числ.");
nameShortBooksMap.set("DEU", "Втор.");
nameShortBooksMap.set("JOS", "Ис.Нав.");
nameShortBooksMap.set("JDG", "Суд.");
nameShortBooksMap.set("RUT", "Руфь.");
nameShortBooksMap.set("1SA", "1Цар.");
nameShortBooksMap.set("2SA", "2Цар.");
nameShortBooksMap.set("1KI", "3Цар.");
nameShortBooksMap.set("2KI", "4Цар.");
nameShortBooksMap.set("1CH", "1Пар.");
nameShortBooksMap.set("2CH", "2Пар.");
nameShortBooksMap.set("EZR", "Эзр.");
nameShortBooksMap.set("NEH", "Неем.");
nameShortBooksMap.set("EST", "Эсф.");
nameShortBooksMap.set("JOB", "Иов.");
nameShortBooksMap.set("PSA", "Пс.");
nameShortBooksMap.set("PRO", "Притч.");
nameShortBooksMap.set("ECC", "Эккл.");
nameShortBooksMap.set("SOS", "Песн.");
nameShortBooksMap.set("ISA", "Ис.");
nameShortBooksMap.set("JER", "Иер.");
nameShortBooksMap.set("LAM", "Плач.");
nameShortBooksMap.set("EZE", "Иез.");
nameShortBooksMap.set("DAN", "Дан.");
nameShortBooksMap.set("HOS", "Ос.");
nameShortBooksMap.set("JOE", "Иоил.");
nameShortBooksMap.set("AMO", "Амос.");
nameShortBooksMap.set("OBA", "Авд.");
nameShortBooksMap.set("JON", "Ион.");
nameShortBooksMap.set("MIC", "Мих.");
nameShortBooksMap.set("NAH", "Наум.");
nameShortBooksMap.set("HAB", "Авв.");
nameShortBooksMap.set("ZEP", "Соф.");
nameShortBooksMap.set("HAG", "Агг.");
nameShortBooksMap.set("ZEC", "Зах.");
nameShortBooksMap.set("MAL", "Мал.");
nameShortBooksMap.set("MAT", "Мф.");
nameShortBooksMap.set("MAR", "Мк.");
nameShortBooksMap.set("LUK", "Лк.");
nameShortBooksMap.set("JOH", "Ин.");
nameShortBooksMap.set("ACT", "Деян.");
nameShortBooksMap.set("ROM", "Рим.");
nameShortBooksMap.set("1CO", "1Кор.");
nameShortBooksMap.set("2CO", "2Кор.");
nameShortBooksMap.set("GAL", "Гал.");
nameShortBooksMap.set("EPH", "Эф.");
nameShortBooksMap.set("PHP", "Флп.");
nameShortBooksMap.set("COL", "Кол.");
nameShortBooksMap.set("1TH", "1Фес.");
nameShortBooksMap.set("2TH", "2Фес.");
nameShortBooksMap.set("1TI", "1Тим.");
nameShortBooksMap.set("2TI", "2Тим.");
nameShortBooksMap.set("TIT", "Тит.");
nameShortBooksMap.set("PHM", "Флм.");
nameShortBooksMap.set("HEB", "Евр.");
nameShortBooksMap.set("JAM", "Иак.");
nameShortBooksMap.set("1PE", "1Петр.");
nameShortBooksMap.set("2PE", "2Петр.");
nameShortBooksMap.set("1JO", "1Ин.");
nameShortBooksMap.set("2JO", "2Ин.");
nameShortBooksMap.set("3JO", "3Ин.");
nameShortBooksMap.set("JDE", "Иуд.");
nameShortBooksMap.set("REV", "Откр.");

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
      nameBook = data.results[0].book_name;
      chapterVerse = data.results[0].chapter_verse;
      let countTextPartColumn = 0;
      countVerses = data.results[0].verses_count;

      /*
      Получаем количество символов в главе
      */
      for (let i = 1; i <= data.results[0].verses_count; i++) {
        let textVerse = data.results[0].verses.synodal[part][i].text;
        let countText = textVerse.length;
        countTextPartColumn += countText;
      }
      countTextPartColumn = countTextPartColumn / 2;
      // console.log("countTextPartColumn", countTextPartColumn);

      header.innerHTML = `Библейская страница: ${nameBook} ${chapterVerse} глава`;

      for (let i = 1; i <= data.results[0].verses_count; i++) {
        let textVerse = data.results[0].verses.synodal[part][i].text;
        let countText = textVerse.length;
        // console.log("countText", countText);
        vers = `<div class = "vers"> 
          <sup class ="sup-index "> ${i} </sup>
          ${textVerse}
          </div>`;

        countTextPartColumn -= countText;
        if (countTextPartColumn > 0) {
          // console.log("countTextPartColumn", countTextPartColumn);

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

function up() {
  var top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, (top + 100) / -10);
    t = setTimeout("up()", 20);
  } else clearTimeout(t);
  return false;
}

function fillObjectFileCrossRefence(countFile) {
  let usrlFileJson = `https://raw.githubusercontent.com/josephilipraja/bible-cross-reference-json/master/${countFile}.json`;
  fetch(usrlFileJson)
    .then((resp) => resp.json())
    .then(function (data) {
      for (key in data) {
        const str = data[key].v;

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findCrossReference(countFile, shortname, part, numberVers) {
  let usrlFileJson = `https://raw.githubusercontent.com/josephilipraja/bible-cross-reference-json/master/${countFile}.json`;
  shortname = nameBooksMap.get(shortname);
  fetch(usrlFileJson)
    .then((resp) => resp.json())
    .then(function (data) {
      for (key in data) {
        if (data[key].v == `${shortname} ${part} ${numberVers}`) {
          let tempVers = data[key].v.split(" ");
          let numberReference = tempVers[2];

          let vers = `<div class = "vers"> 
          <sup class ="sup-index "> 
          ${numberReference}: 
          </sup>
          </div>`;

          let countRef = 0;
          let versRef = "";
          for (k in data[key].r) {
            if (countRef > 3) break;
            let tempVersRef = data[key].r[k].split(" ");
            console.log(tempVersRef);
            let nameRef = tempVersRef[0];
            nameRef = nameShortBooksMap.get(nameRef);
            let partRef = tempVersRef[1];
            let verRef = tempVersRef[2];

            versRef += `${nameRef} ${partRef}:${verRef}; `;
            console.log(data[key].r[k]);
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
  shortname = nameBooksMap.get(shortname);
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
      let name = nameAllBooksMap.get(result.shortname);
      option.label = `${name}`;
      append(selectBook, option);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
