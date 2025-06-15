export default function createCharacterCard(characterData) {
  const newCharacterCard = document.createElement("li");
  newCharacterCard.classList.add("card");
  newCharacterCard.setAttribute("data-js", "card");

  newCharacterCard.innerHTML = `
          <div class="card__image-container">
            <img
              class="card__image"
              src="${characterData.image}"
              alt="${characterData.name}"
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${characterData.name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${characterData.status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${characterData.type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${characterData.episode.length}</dd>
            </dl>
          </div>`;

  return newCharacterCard;
}
