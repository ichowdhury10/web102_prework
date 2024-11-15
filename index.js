/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/



// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(games)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {

        // create a new div element, which will become the game card

        const gameCard = document.createElement('div');

        // add the class game-card to the list

        gameCard.classList.add('gameCard');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        gameCard.innerHTML = `
        <img src="${games[i].img}" class="game-img" alt="${games[i].name}" />
        <p>Pledged: $${games[i].pledged}</p>
        <p>Goal: $${games[i].goal}</p>
        `;


        // append the game to the games-container

        gamesContainer.append(gameCard);
    }
}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

    addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
const dollarTotalCont = totalContributions.toLocaleString();

contributionsCard.innerText = `$${dollarTotalCont}.00`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged;
}, 0);


// set inner HTML using template literal

const dollarTotalRaised = totalRaised.toLocaleString();

raisedCard.innerText = `$${dollarTotalRaised}.00`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length

gamesCard.innerText = `${totalGames}`


/**************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(GAMES_JSON) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(games => games.pledged < games.goal);

    console.log("Unfunded Games:", unfundedGames);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

filterUnfundedOnly(GAMES_JSON);

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(games => games.pledged > games.goal);

    console.log('Funded Games:', fundedGames)

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(fundedGames)
}

filterFundedOnly(GAMES_JSON)

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    const allGames = GAMES_JSON

    console.log('All Games', allGames)

    addGamesToPage(allGames)

}

showAllGames(GAMES_JSON)

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', () => filterUnfundedOnly(GAMES_JSON));

fundedBtn.addEventListener('click', () => filterFundedOnly(GAMES_JSON));

allBtn.addEventListener('click', () => showAllGames(GAMES_JSON));


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGames = GAMES_JSON.filter(games => games.pledged < games.goal);

const countUnfundedGames = unfundedGames.length

console.log(countUnfundedGames)


// create a string that explains the number of unfunded games using the ternary operator

const displayString =
    `A total of $${dollarTotalRaised} has been raised for ${totalGames} games. Currently ${countUnfundedGames !== 1 ? 's' : ''} game remains unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container

const newParagraph = document.createElement("p");

newParagraph.textContent = displayString;

descriptionContainer.appendChild(newParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const  [firstGame, secondGame, ... rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
// do the same for the runner up item

// Create a new element to hold the name and other details of the top-funded game

const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second game (runner-up)

const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);