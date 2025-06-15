import createCharacterCard from "./components/CharacterCard/CharacterCard.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";


function onSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  searchQuery = formData.get("query").trim();
  currentPage = 1;
  fetchCharacters();
}

function onPrevClick() {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters();
  }
}

function onNextClick() {
  if (currentPage < maxPage) {
    currentPage++;
    fetchCharacters();
  }
}


const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

searchBarContainer.innerHTML = "";
navigation.innerHTML = "";

const searchBar = SearchBar({ onSubmit: onSearchSubmit });
const prevButton = NavButton({
  text: "previous",
  className: "button--prev",
  onClick: onPrevClick,
});
const nextButton = NavButton({
  text: "next",
  className: "button--next",
  onClick: onNextClick,
});
const pagination = NavPagination();


searchBarContainer.appendChild(searchBar);
navigation.append(prevButton, pagination, nextButton);


let maxPage = 1;
let currentPage = 1;
let searchQuery = "";

const baseApiUrl = "https://rickandmortyapi.com/api/character";

async function fetchCharacters(url) {
  cardContainer.innerHTML = "";
  url = `${baseApiUrl}/?page=${currentPage}`;

  if (searchQuery) {
    url += `&name=${encodeURIComponent(searchQuery)}`;
  }

  console.log(searchQuery);

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

prevButton.addEventListener("click", onPrevClick)

nextButton.addEventListener("click", onNextClick)

searchBar.addEventListener("submit", onSearchSubmit);

fetchCharacters();
