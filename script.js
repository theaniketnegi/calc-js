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
  return a + b;
}

function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  if (b === 0) return "ERR";
  return a / b;
}
function mod(a, b) {
  if (b === 0) return "ERR";
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
        else {
          processingText.textContent += btnText;
          opA = (opA * -1).toString();
        }
      } else {
        opA += btnText;
        processingText.textContent += btnText;
      }
    } else {
      if (opB === undefined) {
        opB = btnText;
        if (minusB) opB = (opB * -1).toString();
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
      result = performOperation(+opA, operator, +opB);
      if (result !== "ERR") {
        result = result.toFixed(2);
        resultText.textContent = result;
      } else {
        resultText.textContent = "ERR";
        result = undefined;
      }
      opA = opB = operator = undefined;
      minusA = minusB = false;
      periodA = periodB = false;
    }
  } else if (
    btnText === "AC" ||
    (btnText === "C" &&
      (result !== undefined || resultText.textContent === "ERR"))
  ) {
    operator = opA = opB = result = undefined;
    processingText.textContent = resultText.textContent = "0";
    minusA = minusB = false;
    periodA = periodB = false;
  } else if (btnText === "C") {
    let processingString = processingText.textContent;
    const prLen = processingString.length;

    if (processingString[prLen - 1] === ".") {
      if (opB !== undefined) periodB = false;
      else periodA = false;
    }

    if (processingString === "0") return;

    processingString = processingString.slice(0, -1);
    if (processingString.length === 0) {
      processingText.textContent = "0";
    } else {
      if (opB !== undefined) {
        opB = opB.slice(0, -1);
        console.log(opB.length);
        if (opB.length === 0) {
          minusB = false;
          opB = undefined;
        }
      } else if (operator !== undefined && opB === undefined) {
        operator = operator.slice(0, -1);
        if (operator.length === 0) operator = undefined;
      } else if (opA !== undefined && operator == undefined) {
        opA = opA.slice(0, -1);
        if (opA.length === 0) {
          minusA = false;
          opA = undefined;
        }
      }
      processingText.textContent = processingString;
    }
  }
}

buttonsList.forEach((button) => {
  button.addEventListener("click", processButtonClick);
});
