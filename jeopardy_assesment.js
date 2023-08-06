$(document).ready(function () {
  const url = "http://jservice.io/api";
  let CATEGORIES = [];
  let NUM_CATEGORIES = [];
  let HEIGHT = 5;
  let WIDTH = 5;

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async function getCategoryIds() {
    const response = await axios.get(`${url}/categories`, {
      params: {
        offset: getRandomArbitrary(0, 18500),
        count: 5,
      },
    });

    NUM_CATEGORIES = response.data.map(category => category.id);
    return NUM_CATEGORIES;
  }

  async function getCategory(catIds) {
    for (const id of catIds) {
      const response = await axios.get(`${url}/category?id=${id}`);
      CATEGORIES.push({
        title: response.data.title,
        clues: response.data.clues,
      });
    }
  }

  async function fillTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    for (let i = 0; i < 5; i++) {
      const th = document.createElement("th");
      th.textContent = CATEGORIES[i].title.toUpperCase();
      tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < 5; i++) {
      const bodyRow = document.createElement("tr");
      for (let j = 0; j < 5; j++) {
        const cells = document.createElement("td");
        cells.setAttribute("id", `${i}-${j}`);
        cells.setAttribute("class", "cells");
        cells.innerText = "?";
        cells.addEventListener("click", handleClick);
        bodyRow.appendChild(cells);
      }
      tbody.appendChild(bodyRow);
    }

    table.appendChild(tbody);
    document.body.appendChild(table);
  }

  function handleClick(evt) {
    const [rowIndex, colIndex] = evt.target.id.split("-");
     const clue = evt.target.id
     const cell = document.getElementById(clue)
     
    if (cell.textContent === "?") {
      evt.target.innerText = CATEGORIES[colIndex].clues[rowIndex].question;
      CATEGORIES[colIndex].clues[rowIndex].showing = "question";
    } else if (CATEGORIES[colIndex].clues[rowIndex].showing === "question") {
      evt.target.innerText = CATEGORIES[colIndex].clues[rowIndex].answer;
      CATEGORIES[colIndex].clues[rowIndex].showing = "answer";
      
    }
    else {
      return 
    }
    } 
  

  async function setupAndStart() {
    const result = await getCategoryIds();
    await getCategory(result);
    fillTable(result);
  }

  $("#start").click(function () {
    console.log("START");
    setupAndStart();
  });
});
document.getElementById("reset").onclick = function() {
  document.getElementById("number").value = "";
};
