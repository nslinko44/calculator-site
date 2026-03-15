// Отримуємо елемент дисплея калькулятора
const display = document.getElementById("display");

// Отримуємо всі кнопки калькулятора
const buttons = document.querySelectorAll(".btn");

// Змінні для збереження стану калькулятора
let current = "";   // число, яке вводиться зараз
let previous = "";  // попереднє число
let operator = "";  // оператор (+, −, ×, ÷)

// Проходимо по всіх кнопках
buttons.forEach(function (button) {

    // Додаємо обробник кліку для кожної кнопки
    button.addEventListener("click", function () {

        // Отримуємо текст кнопки (значення)
        const value = button.textContent;

        // =========================
        // Обробка відсотків (%)
        // =========================
        if (value === "%") {

            // Якщо немає числа — нічого не робимо
            if (current === "") return;

            let percentValue; // змінна для результату %

            // Якщо є попереднє число і оператор
            if (previous !== "" && operator !== "") {

                // Якщо + або −, відсоток рахуємо від previous
                if (operator === "+" || operator === "−") {
                    percentValue = Number(previous) * (Number(current) / 100);
                } 
                // Якщо × або ÷ — просто ділимо current на 100
                else {
                    percentValue = Number(current) / 100;
                }

            } 
            // Якщо немає previous — просто ділимо на 100
            else {
                percentValue = Number(current) / 100;
            }

            // Оновлюємо current і дисплей
            current = String(percentValue);
            display.textContent = current;

            return; // зупиняємо виконання
        }

        // =========================
        // Кнопка очистки (C)
        // =========================
        if (value === "C") {
            current = "";
            previous = "";
            operator = "";
            display.textContent = "0"; // показуємо 0
            return;
        }

        // =========================
        // Кнопка зміни знаку (±)
        // =========================
        if (value === "±") {
            if (current === "") return; // якщо числа нема — нічого не робимо

            // Міняємо знак числа
            current = String(Number(current) * -1);
            display.textContent = current;
            return;
        }

        // =========================
        // Кнопка "="
        // =========================
        if (value === "=") {

            // Якщо чогось не вистачає — не рахуємо
            if (current === "" || previous === "" || operator === "") return;

            // Викликаємо функцію обчислення
            let result = calculate(previous, current, operator);

            // Виводимо результат
            display.textContent = result;

            // Готуємось до нової операції
            current = String(result);
            previous = "";
            operator = "";

            return;
        }

        // =========================
        // Якщо натиснули оператор
        // =========================
        if (value === "+" || value === "−" || value === "×" || value === "÷") {

            // Якщо немає числа — оператор не встановлюємо
            if (current === "") return;

            // Зберігаємо оператор і попереднє число
            operator = value;
            previous = current;
            current = "";

            return;
        }

        // =========================
        // Якщо натиснули цифру
        // =========================

        // Додаємо цифру до поточного числа
        current += value;

        // Оновлюємо дисплей
        display.textContent = current;
    });
});

// =========================
// Функція обчислення
// =========================
function calculate(a, b, op) {

    // Перетворюємо рядки в числа
    a = Number(a);
    b = Number(b);

    // Додавання
    if (op === "+") return a + b;

    // Віднімання
    if (op === "−") return a - b;

    // Множення
    if (op === "×") return a * b;

    // Ділення
    if (op === "÷") {
        if (b === 0) return "∞"; // захист від ділення на 0
        return a / b;
    }
}