/*
CALCULATOR LOGIC OVERVIEW (READ THIS BEFORE TOUCHING THE CODE)

This calculator is state-driven, not math-driven. The hard part is managing WHEN
numbers, operators, and results are allowed to change.

Core state variables:
- firstNumber: stores the first operand of an operation
- secondNumber: stores the second operand
- currentOperator: stores the selected operator (+, -, *, /)
- shouldResetDisplay: a critical flag that controls whether the next digit
  replaces the display or appends to it

How input flows:
1) Digits update the display directly. If a result was just shown or an operator
   was pressed, the display resets before accepting new digits.
2) Pressing an operator:
   - If an operator already exists and a second number was entered, the calculator
     evaluates the previous operation first (enables chaining like 12 + 7 - 1).
   - The current display value is saved as firstNumber.
   - The operator is stored and the display is marked to reset.
3) Pressing '=' only works if there is a valid firstNumber, operator, and secondNumber.
   The operate() function is called, the result is displayed, and that result becomes
   the new firstNumber for chaining.
4) Consecutive operator presses do NOT trigger evaluation. Only the last operator
   is kept.
5) After a result is displayed, typing a digit starts a new calculation instead of
   appending to the result (handled by shouldResetDisplay).

Safety & UX rules:
- Division by zero returns an error message instead of crashing.
- Long decimals are rounded to avoid overflow.
- Only one decimal point is allowed per number.
- Clear resets ALL state so the user truly starts fresh.
- Backspace edits the current input only, not a completed result.
- Keyboard and button input follow the exact same logic paths.

If the calculator ever behaves strangely, the bug is almost always caused by
incorrect state (especially shouldResetDisplay), not the math functions.
*/


// Basic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) return "Nice try 🤡";
  return a / b;
};

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

// DOM elements
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-num]");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

// Calculator state
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Helpers
function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(num) {
  if (display.textContent === "0" || shouldResetDisplay) {
    updateDisplay(num);
    shouldResetDisplay = false;
  } else {
    updateDisplay(display.textContent + num);
  }
}

function appendDecimal() {
  if (display.textContent.includes(".")) return;
  appendNumber(".");
}

function chooseOperator(operator) {
  if (currentOperator && !shouldResetDisplay) {
    evaluate();
  }
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (!currentOperator || shouldResetDisplay) return;

  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "number") {
    result = Math.round(result * 100000) / 100000;
  }

  updateDisplay(result);
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true;
}

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay("0");
}

function backspace() {
  if (shouldResetDisplay) return;
  display.textContent = display.textContent.slice(0, -1) || "0";
}

// Events
numberButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.num === ".") appendDecimal();
    else appendNumber(btn.dataset.num);
  });
});

operatorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    chooseOperator(btn.dataset.op);
  });
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearAll);
backspaceButton.addEventListener("click", backspace);

// Keyboard support
window.addEventListener("keydown", e => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearAll();
  if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
});
