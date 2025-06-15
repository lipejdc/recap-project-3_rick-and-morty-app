import createCharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let currentPage = 1;
let searchQuery = "";

const baseApiUrl = "https://rickandmortyapi.com/api/character";


async function fetchCharacters(url) {
  cardContainer.innerHTML = "";
  url = `${baseApiUrl}/?page=${currentPage}`;
  const response = await fetch(url);
  const data = await response.json();
  const characters = data.results;
  console.log(characters);

  maxPage = data.info.pages;
  pagination.textContent = `${currentPage} / ${maxPage}`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === maxPage;

  characters.forEach((character) => {
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });
}

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < maxPage) {
      currentPage++;
      fetchCharacters();
    }
  });

fetchCharacters();
