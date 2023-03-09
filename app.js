const urlAllBook = "https://api.biblesupersearch.com/api/books?language=en";

const header = document.querySelector(".title-page h4");
const bibleVerses1 = document.querySelector(".column1");
const bibleVerses2 = document.querySelector(".column2");
const selectBook = document.querySelector(".book");
const selectPart = document.querySelector(".part");
let dataBook;
let shortname;

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

      /*
      Получаем количество символов в главе
      */
      for (let i = 1; i <= data.results[0].verses_count; i++) {
        let textVerse = data.results[0].verses.synodal[part][i].text;
        let countText = textVerse.length;
        countTextPartColumn += countText;
      }
      countTextPartColumn = countTextPartColumn / 2;
      console.log("countTextPartColumn", countTextPartColumn);

      header.innerHTML = `Библейская страница: ${nameBook} ${chapterVerse} глава`;

      for (let i = 1; i <= data.results[0].verses_count; i++) {
        let textVerse = data.results[0].verses.synodal[part][i].text;
        let countText = textVerse.length;
        console.log("countText", countText);
        vers = `<div class = "vers"> 
          <sup class ="sup-index "> ${i} </sup>
          ${textVerse}
          </div>`;

        countTextPartColumn -= countText;
        if (countTextPartColumn > 0) {
          console.log("countTextPartColumn", countTextPartColumn);

          bibleVerses1.innerHTML += `${vers}`;
        } else bibleVerses2.innerHTML += `${vers}`;
      }
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

  // console.log("select=", this.options[this.selectedIndex - 1].value);
  // console.log(dataBook[this.selectedIndex].chapters);
});

selectPart.addEventListener("change", function () {
  part = this.options[this.selectedIndex].value;

  // console.log("select=", this.options[this.selectedIndex].value);
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

// ------------------------------------------

fetch(urlAllBook)
  .then((resp) => resp.json())
  .then(function (data) {
    dataBook = data.results;

    for (let result of data.results) {
      let option = createNode("option");
      option.value = `${result.shortname}`;
      option.label = `${result.name}`;
      append(selectBook, option);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
