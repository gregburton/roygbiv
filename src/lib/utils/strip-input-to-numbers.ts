export default function stripInputToNumberArray(text: string) {
  // Remove everything but numbers and period. Replace everything else with a space.
  const justNumbers = text.replace(/[^0-9.]/g, " ");
  const numArray = justNumbers
    .split(" ")
    .filter((str) => !!str) // filter out empty strings
    .map((str) => parseFloat(Number(str).toFixed(2))) // let decimals stay as decimals
    .splice(0, 4); // Max array length of 4. Strip out anything longer.

  // console.log(numArray);

  return numArray;
}
