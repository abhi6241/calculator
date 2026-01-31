# 🧮 Calculator

A fully functional web-based calculator built using HTML, CSS, and JavaScript.

🌐 Live Demo: https://abhi6241.github.io/calculator/

This project focuses on clean state management, proper handling of edge cases, and realistic calculator behavior similar to a real calculator.

---

## ✨ Features

- Basic operations: Addition, Subtraction, Multiplication, Division
- Chained calculations (example: 12 + 7 - 1 = 18)
- Clear (C) button to reset all state
- Backspace (⌫) to delete the last digit
- Decimal support (prevents multiple decimals)
- Full keyboard support
- Safe handling of division by zero
- Prevents invalid operations:
  - No evaluation on consecutive operators
  - No accidental repeated evaluation
  - Results do not append digits

---

## 🧠 Core Concept

This calculator is state-driven, not math-driven.

The main challenge is managing:
- When numbers should append vs replace
- When operations should evaluate
- How results transition into new calculations

Explicit state variables are used instead of shortcuts to keep behavior predictable.

---

## 🗂️ Project Structure

calculator/  
├── index.html  
├── styles.css  
└── script.js  

---

## 🚀 How to Run

1. Clone the repository:  
   git clone https://github.com/abhi6241/calculator.git  

2. Open the project folder:  
   cd calculator  

3. Open index.html in your browser  
   (No server required)

---

## ⌨️ Keyboard Controls

0–9 → Number input  
+ − * / → Operators  
Enter or = → Evaluate  
Backspace → Delete last digit  
Esc → Clear calculator  

---

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript

---

## 📌 Notes

- Built as a learning project to understand state-driven UI logic
- Easily extendable to:
  - Scientific calculator
  - React or Vue version
  - Mobile-friendly UI

---

## 👤 Author

Abhiram

---

## 📄 License

This project is open-source and free to use for learning purposes.
