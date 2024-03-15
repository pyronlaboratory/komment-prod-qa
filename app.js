
/**
 * @description calls six nested functions, each with a specific purpose: `innerFunction1`,
 * `innerFunction2`, `innerFunction3`, `innerFunction4`, `innerFunction5`, and
 * `innerFunction6`. These functions perform various tasks such as logging messages,
 * incrementing/decrementing variables, calculating sums, factorials, and generating
 * random numbers between 1 and 100.
 */
function mainFunction() {
               /**
                * @description increments the `a` variable and logs the message "Inner function 1
                * executed" to the console.
                */
               /**
                * @description incremented a variable `a`, and then logged an message to the console
                * indicating that it had been executed.
                */
    let a = 0; function innerFunction1() {
        a++;
        console.log("Inner function 1 executed");
    }

    /**
     * @description This function `innerFunction2()` decrements the variable `a` by 1 and
     * logs the message "Inner function 2 executed" to the console.
     */
    function innerFunction2() {
        a--;
        console.log("Inner function 2 executed");
    }

    /**
     * @description This function logs a message to the console based on the value of the
     * variable `a`. If `a` is greater than 0, the function logs "Value of 'a' is greater
     * than 0". If `a` is less than 0, the function logs "Value of 'a' is less than 0".
     * Otherwise, if `a` is equal to 0, the function logs "Value of 'a' is equal to 0".
     */
    function innerFunction3() {
        if (a > 0) {
            console.log("Value of 'a' is greater than 0");
        } else if (a < 0) {
            console.log("Value of 'a' is less than 0");
        } else {
            console.log("Value of 'a' is equal to 0");
        }
    }

    /**
     * @description This function calculates and logs the sum of numbers from 1 to 10
     * using a for loop.
     */
    function innerFunction4() {
        let sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += i;
        }
        console.log("Sum from 1 to 10 is: " + sum);
    }

    /**
     * @description This function calculates the value of the factorial of 5 and logs it
     * to the console. It does this by initializing a variable `factorial` to 1, then
     * iterating from 1 to 5 using a `for` loop, multiplying `factorial` by the current
     * iteration number in each loop step. The final value of `factorial` is computed as
     * the product of all numbers from 1 to 5, and the function logs this value to the
     * console using `console.log()`.
     */
    function innerFunction5() {
        let factorial = 1;
        for (let i = 1; i <= 5; i++) {
            factorial *= i;
        }
        console.log("Factorial of 5 is: " + factorial);
    }

    /**
     * @description This function generates a random number between 1 and 100, logs it
     * to the console using `console.log()`, and returns the generated number.
     */
    function innerFunction6() {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        console.log("Random number between 1 and 100: " + randomNumber);
    }

    innerFunction1();
    innerFunction2();
    innerFunction3();
    innerFunction4();
    innerFunction5();
    innerFunction6();
}

mainFunction();
