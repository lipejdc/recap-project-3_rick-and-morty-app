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
  try {
    cardContainer.innerHTML = "";

    url = `${baseApiUrl}/?page=${currentPage}`;

    if (searchQuery) {
      url += `&name=${encodeURIComponent(searchQuery)}`;
    }

    console.log("Fetching:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const characters = data.results;
    console.log(characters);
    console.log(data.results);
    console.log(data.results.length);

    if (data.results.length === 0) {
      cardContainer.innerHTML = `<p class="no-results">No characters found matching your search.</p>`;
      pagination.textContent = `0 / 0`;
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    maxPage = data.info.pages;
    pagination.textContent = `${currentPage} / ${maxPage}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === maxPage;

    characters.forEach((character) => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    cardContainer.innerHTML = `<p class="error-message">Sorry, we couldn't load characters. Please try again later.</p>`;
    pagination.textContent = `– / –`;
    prevButton.disabled = true;
    nextButton.disabled = true;
  }
}

prevButton.addEventListener("click", onPrevClick);

nextButton.addEventListener("click", onNextClick);

searchBar.addEventListener("submit", onSearchSubmit);

fetchCharacters();
