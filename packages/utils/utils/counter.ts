export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerText = `count is ${counter}`;
  };
  console.log("Hello");
  element.addEventListener("click", () => setCounter(++counter));
  setCounter(0);
}
