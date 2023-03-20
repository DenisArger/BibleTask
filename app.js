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
      let {
        book_name: nameBook,
        chapter_verse,
        verses_count,
        verses,
      } = data.results[0];
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
      for (key in data)
        infoFileCross.push({
          nameVerse: data[key].v,
          countFile: countFile,
        });
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
//Возможно эти функции  стоит перенести в config файл
function getFullnameRus(shortNameJs1) {
  return allInfoBooks.find((element) => element.shortNameJs1 == shortNameJs1)
    .fullNameRus;
}

function getShortNameRus(shortNameJs2) {
  return allInfoBooks.find((element) => element.shortNameJs2 == shortNameJs2)
    .shortNameRus;
}

function getShortNameJs2(shortNameJs1) {
  return allInfoBooks.find((element) => element.shortNameJs1 == shortNameJs1)
    .shortNameJs2;
}

function addScript(src) {
  var script = document.createElement("script");
  script.src = src;
  script.async = false; // чтобы гарантировать порядок
  document.head.appendChild(script);
}

// ------------------------------------------
addScript("config.js");

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
