const buttonsList = document.querySelectorAll("button");
const processingText = document.querySelector(".processing");
const resultText = document.querySelector(".result");

let currText = "";
let firstOperandEntered = false;
let operatorEntered = false;

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}
function mod(a, b) {
  return a % b;
}

function performOperation(a, op, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return sub(a, b);
    case "*":
      return mul(a, b);
    case "/":
      return div(a, b);
    case "%":
      return mod(a, b);
  }
}

function processButtonClick(e) {
  const currTextArr = currText.split(" ");
  console.log(currTextArr);

  if (e.target.textContent === "=") {
    if (firstOperandEntered && !operatorEntered) {
      resultText.textContent = currTextArr[0];
      return;
    }
    if (!firstOperandEntered) {
      resultText.textContent = processingText.textContent;
      return;
    }
    if (firstOperandEntered && operatorEntered) {
      if (currTextArr[2])
        resultText.textContent = performOperation(
          Number(currTextArr[0]),
          currTextArr[1],
          Number(currTextArr[2])
        );
      else resultText.textContent = currTextArr[0];
      return;
    }
  }

  if (
    ["+", "-", "*", "/", "%"].includes(e.target.textContent) &&
    !operatorEntered
  ) {
    if (!currText) return;
    firstOperandEntered = true;
    currText += " " + e.target.textContent + " ";
    operatorEntered = true;
    console.log(currText);
  } else if (e.target.textContent >= "0" && e.target.textContent <= "9") {
    currText += e.target.textContent;
  }

  if(e.target.textContent==="")
  processingText.textContent = currText;
}

buttonsList.forEach((button) => {
  button.addEventListener("click", processButtonClick);
});
