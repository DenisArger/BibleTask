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

      console.log(data.results[0]);

      header.innerHTML = `Библейская страница: ${nameBook} ${chapterVerse} глава`;

      for (let i = 1; i <= data.results[0].verses_count; i++) {
        vers =
          `<sup> ${i} </sup>` + data.results[0].verses.synodal[part][i].text;

        if (i <= 30) bibleVerses1.innerHTML += vers;
        else bibleVerses2.innerHTML += vers;
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}


selectBook.addEventListener("change", function () {
  shortname = this.options[this.selectedIndex].value;
  chapters = dataBook[this.selectedIndex].chapters;
  fillSelected(selectPart, chapters);

  console.log("select=", this.options[this.selectedIndex].value);
  console.log(dataBook[this.selectedIndex].chapters);
});



selectPart.addEventListener("change", function () {
  part = this.options[this.selectedIndex].value;

  console.log("select=", this.options[this.selectedIndex].value);
  fillVerses();
});


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
