const buttonsList = document.querySelectorAll("button");
const processingText = document.querySelector(".processing");
const resultText = document.querySelector(".result");

let opA = undefined;
let opB = undefined;
let operator = undefined;
let result = undefined;
let minusA = false;
let minusB = false;
let periodA = false;
let periodB = false;

function add(a, b) {
  return (a + b).toFixed(2);
}

function sub(a, b) {
  return (a - b).toFixed(2);
}
function mul(a, b) {
  return (a * b).toFixed(2);
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
    if (operator === undefined) {
      if (opA === undefined) {
        if (btnText === "0") return;
        opA = btnText;
        if (!minusA) processingText.textContent = btnText;
        else processingText.textContent += btnText;
      } else {
        opA += btnText;
        processingText.textContent += btnText;
      }
    } else {
      if (opB === undefined) {
        opB = btnText;
      } else {
        if (opB === "0") {
          if (btnText === "0") return;
          else {
            opB = btnText;
            let processedText = processingText.textContent;
            processingText.textContent = processedText.slice(0, -1) + btnText;
            return;
          }
        }
        opB += btnText;
      }
      processingText.textContent += btnText;
    }
  } else if (btnText === ".") {
    if (operator === undefined && !periodA) {
      if (opA === undefined) {
        opA = "0.";
        processingText.textContent = opA;
      } else {
        opA += ".";
        processingText.textContent += ".";
      }
      periodA = true;
    } else if (operator !== undefined && !periodB) {
      if (opB === undefined) {
        opB = "0.";
        processingText.textContent += opB;
      } else {
        console.log("hi");
        opB += ".";
        processingText.textContent += ".";
      }
      periodB = true;
    }
  } else if (
    btnText === "+" ||
    btnText === "/" ||
    btnText === "*" ||
    btnText === "-" ||
    btnText === "%"
  ) {
    if (opA !== undefined && operator === undefined) {
      console.log("block 1");
      operator = btnText;
      processingText.textContent += btnText;
    } else if (result !== undefined && opA === undefined) {
      console.log("block 2");
      opA = result;
      operator = btnText;
      processingText.textContent = opA + operator;
    } else if (btnText === "-") {
      console.log("block 3");
      if (opA === undefined && !minusA) {
        minusA = true;
        processingText.textContent = "-";
      } else if (operator !== undefined && opB === undefined && !minusB) {
        minusB = true;
        processingText.textContent += "-";
      }
    } else if (operator !== undefined && opB === undefined) {
      operator = btnText;
      let processedText = processingText.textContent;
      processingText.textContent = processedText.slice(0, -1) + operator;
    }
  } else if (btnText === "=") {
    if ((opA !== undefined) & (opB !== undefined) && operator !== undefined) {
      if (minusA) opA = -opA;
      if (minusB) opB = -opB;
      result = performOperation(+opA, operator, +opB);
      resultText.textContent = result;
      console.log(result);
      opA = opB = operator = undefined;
      minusA = minusB = false;
      periodA = periodB = false;
    }
  } else if (btnText === "AC" || (btnText === "C" && result !== undefined)) {
    operator = opA = opB = result = undefined;
    processingText.textContent = resultText.textContent = "0";
    minusA = minusB = false;
    periodA = periodB = false;
  } else if (btnText === "C") {
    const processingString = processingText.textContent;
    const prStrLen = processingString.length;

    processingString = processingString.slice(0, -1);
  }
}

buttonsList.forEach((button) => {
  button.addEventListener("click", processButtonClick);
});
