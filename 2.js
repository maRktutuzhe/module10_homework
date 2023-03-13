let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  let width = window.screen.width;
  let height = window.screen.height;
  alert(`Ширина ${width}, Высота ${height}`);
})