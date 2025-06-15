export default function SearchBar() {
  const form = document.createElement("form");
  form.className = "search-bar";
  form.setAttribute("data-js", "search-bar");
  form.action = "";

  const input = document.createElement("input");
  input.name = "query";
  input.className = "search-bar__input";
  input.type = "text";
  input.placeholder = "search characters";
  input.setAttribute("aria-label", "character name");

  const button = document.createElement("button");
  button.className = "search-bar__button";
  button.setAttribute("aria-label", "search for character");

  const icon = document.createElement("img");
  icon.className = "search-bar__icon";
  icon.src = "assets/magnifying-glass.png";
  icon.alt = "";

  button.appendChild(icon);
  form.append(input, button);

  return form;
}
