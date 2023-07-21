const buttonsList = document.querySelectorAll("button");
const processingText = document.querySelector(".processing");
const resultText = document.querySelector(".result");

let opA = undefined;
let opB = undefined;
let operator = undefined;
let result = undefined;

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
  return Math.round((a * 100.0) / b) / 100;
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
  const btnText = e.target.textContent;
  console.log(btnText);

  if (+btnText >= 0 && +btnText <= 9) {
    if (operator == undefined) {
      if (opA == undefined) {
        opA = +btnText;
        processingText.textContent = btnText;
      } else {
        opA = opA * 10 + +btnText;
        processingText.textContent += btnText;
      }
    } else {
      if (opB == undefined) {
        opB = +btnText;
      } else {
        opB = opB * 10 + +btnText;
      }
      processingText.textContent += btnText;
    }
  } else if (
    btnText == "+" ||
    btnText == "/" ||
    btnText == "*" ||
    btnText == "-" ||
    btnText == "%"
  ) {
    if (opA !== undefined && operator === undefined) {
      operator = btnText;
      processingText.textContent += btnText;
    } else if (result !== undefined) {
      opA = result;
      operator = btnText;
      processingText.textContent = opA + operator;
    }
  } else if (btnText == "=") {
    if ((opA !== undefined) & (opB !== undefined) && operator !== undefined) {
      result = performOperation(opA, operator, opB);
      resultText.textContent = result;
      console.log(result);
      opA = opB = operator = undefined;
    }
  } else if (btnText == "AC") {
    operator = opA = opB = undefined;
    processingText.textContent = resultText.textContent = "0";
  }
}

buttonsList.forEach((button) => {
  button.addEventListener("click", processButtonClick);
});
