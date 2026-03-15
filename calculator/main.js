const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";
let previous = "";
let operator = "";

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.textContent;

        
        if (value === "%") {
            if (current === "") return;

            let percentValue;

            if (previous !== "" && operator !== "") {

                if (operator === "+" || operator === "−") {
                    percentValue = Number(previous) * (Number(current) / 100);
                } else {
                    percentValue = Number(current) / 100;
                }

            } else {
                percentValue = Number(current) / 100;
            }

            current = String(percentValue);
            display.textContent = current;

            return;
        }


        if (value === "C") {
            current = "";
            previous = "";
            operator = "";
            display.textContent = "0";
            return;
        }

        if (value === "±") {
            if (current === "") return;
            current = String(Number(current) * -1);
            display.textContent = current;
            return;
        }

        if (value === "=") {
            if (current === "" || previous === "" || operator === "") return;

            let result = calculate(previous, current, operator);
            display.textContent = result;

            current = String(result);
            previous = "";
            operator = "";
            return;
        }

        if (value === "+" || value === "−" || value === "×" || value === "÷") {
            if (current === "") return;

            operator = value;
            previous = current;
            current = "";
            return;
        }


        current += value;
        display.textContent = current;
    });
});


function calculate(a, b, op) {
    a = Number(a);
    b = Number(b);

    
    if (op === "+") return a + b;
    if (op === "−") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") {
        if (b === 0) return "∞";
        return a / b;
    }
}


