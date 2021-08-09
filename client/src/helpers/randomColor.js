export default function randomColor() {
  const colors = [
    "#35d461",
    "#37b6f6",
    "#639fb0",
    "#047cac",
    "#9ad2a9",
    "#f5f5f5",
  ];
  let randomNum = Math.floor(Math.random() * 5) + 1;
  return colors[randomNum];
}
