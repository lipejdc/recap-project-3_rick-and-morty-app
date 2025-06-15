export default function NavPagination() {
  const span = document.createElement("span");
  span.className = "navigation__pagination";
  span.setAttribute("data-js", "pagination");
  span.textContent = "1 / 1";
  return span;
}
