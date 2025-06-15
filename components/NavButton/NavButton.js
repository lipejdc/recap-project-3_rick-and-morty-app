export default function NavButton({ text, className }) {
  const button = document.createElement("button");
  button.className = `button ${className}`;
  button.setAttribute(
    "data-js",
    className.includes("prev") ? "button-prev" : "button-next"
  );
  button.textContent = text;
  return button;
}
