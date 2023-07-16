// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

$(document).ready(function () {
  //generate a random start point for categories
  //as far as I can tell 18000 is near max on the id count
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }


//global variables, mostly for url convenience
  const url = "http://jservice.io/api";


  let CATEGORIES = [];
  let NUM_CATEGORIES = [];
  let board = [];
  let HEIGHT = 5;
  let WIDTH = 5;


  /** Get NUM_CATEGORIES random category from API.
   *
   * Returns array of category ids
   */

  async function getCategoryIds() {
    const response = await axios.get(`${url}/categories`,
      {
        params: {
          offset: getRandomArbitrary(0, 18500),
          count: 5,
        },
      });

    console.log('RESPONSE', response.data);
    for (let i = 0; i < 5; i++) {
      NUM_CATEGORIES.push(response.data[i].id);
    }
    return NUM_CATEGORIES;
  }

  /** Return object with data about a category:
   *
   *  Returns { title: "Math", clues: clue-array }
   *
   * Where clue-array is:
   *   [
   *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
   *      {question: "Bell Jar Author", answer: "Plath", showing: null},
   *      ...
   *   ]
   */

  async function getCategory(catId) {
    let res0 = await axios.get(`${url}/category?id=${catId[0]}$`);
    CATEGORIES.push(res0.data);
    let res1 = await axios.get(`${url}/category?id=${catId[1]}$`);
    CATEGORIES.push(res1.data);
    let res2 = await axios.get(`${url}/category?id=${catId[2]}$`);
    CATEGORIES.push(res2.data);
    let res3 = await axios.get(`${url}/category?id=${catId[3]}$`);
    CATEGORIES.push(res3.data);
    let res4 = await axios.get(`${url}/category?id=${catId[4]}$`);
    CATEGORIES.push(res4.data);
  }

  console.log('CATEGORIES', CATEGORIES);


  /** Fill the HTML table#jeopardy with the categories & cells for questions.
   *
   * - The <thead> should be filled w/a <tr>, and a <td> for each category
   * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
   *   each with a question for each category in a <td>
   *   (initally, just show a "?" where the question/answer would go.)
   */

  async function fillTable() {
    //creating a table
    const table = document.createElement("table");
    const body = document.querySelector("body");

    body.append(table);

    table.classList.add("center");

    const caption = document.createElement("caption");
    table.append(caption);
    caption.innerText = "Jeopardy";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(tbody);


    for (let y = 0; y < 1; y++) {
      const mainrow = document.createElement("tr");

      for (let x = 0; x < WIDTH; x++) {
        const maincell = document.createElement("th");
        maincell.innerHTML = NUM_CATEGORIES[x];
        maincell.setAttribute("id", 'category')
      }
    }
  }

  /** Handle clicking on a clue: show the question or answer.
   *
   * Uses .showing property on clue to determine what to show:
   * - if currently null, show question & set .showing to "question"
   * - if currently "question", show answer & set .showing to "answer"
   * - if currently "answer", ignore click
   * */

  function handleClick(evt) {function handleClick(evt) {
    //connect four handle click function
    //upon click reveale the question then the answer. 
    document.addEventListener(
      "click",
      function (evt) {
        // console.log(e.target.id);
      },
      false
    );
  }
  }


  /** Wipe the current Jeopardy board, show the loading spinner,
   * and update the button used to fetch data.
   */

  function showLoadingView() {
    const divContainer = document.createElement('div');
    const body = document.querySelector('body');
    body.append(divContainer);
    $(document).ready(function () {
      //* Preloader
      preloaderFadeOutTime = 500;
      function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        preloader.fadeOut(preloaderFadeOutTime);
      }
      hidePreloader();
    });
  }
  

  /** Remove the loading spinner and update the button used to fetch data. */

  function hideLoadingView() {
    $("header").hide();
    $("#spin-container").hide();
  }

  /** Start game:
   *
   * - get random category Ids
   * - get data for each category
   * - create HTML table
   * */

  async function setupAndStart() {
    let result = await getCategoryIds();
    await getCategory(result);
    fillTable(result);
  }


//when they click reset, erase data redeploy game start game
  $("#start").click(function () {
    console.log('START')
    setupAndStart();
    // TODO
    /** On click of start / restart button, set up game. */
  });

//when they click reset, erase data redeploy game start game
  $("#reset").click(function () {
    // TODO
    /** On click of start / restart button, set up game. */
  });

//when the game is done loading, load clues
  $(document).ready(function () {
    console.log('READY')
    // TODO - look at jquery docs for adding click handler
    /** On page load, add event handler for clicking clues */
  });
});

