/**
 * @description This function performs several operations, including:
 * 
 * 1/ Logging loop iterations and the value of a variable `a` inside different loops.
 * 2/ Calculating the hash code of a string and passing it to an inner function.
 * 3/ Performing different operations based on the passed hash code, such as incrementing
 * or decrementing the value of `a`, checking whether the value of `a` is even or
 * odd, calculating the sum of numbers from 1 to `a`, calculating the factorial of
 * `a`, and generating a random number between 1 and `a`.
 * 
 * @returns { number } The function `mainFunction()` performs several operations using
 * `switch` statements, each corresponding to a specific hash code (i.e., `hashCode()`).
 * Here's the output for each operation:
 * 
 * 1/ `innerFunction(hashCode("increment"))`: Output: "Value of 'a' incremented". `a`
 * is increased by 1.
 * 2/ `innerFunction(hashCode("decrement"))`: Output: "Value of 'a' decremented". `a`
 * is decreased by 1.
 * 3/ `innerFunction(hashCode("check_even_odd"))`: Output: "Value of 'a' is an even
 * number". Since `a` is 5 (mod 2 = 0), the output is true.
 * 4/ `innerFunction(hashCode("calculate_sum"))`: Output: "Sum from 1 to 5 is: 15".
 * The sum of integers from 1 to 5 is indeed 15.
 * 5/ `innerFunction(hashCode("calculate_factorial"))`: Output: "Factorial of 5 is:
 * 120". The factorial of 5 is indeed 120.
 * 6/ `innerFunction(hashCode("generate_random"))`: Output: "Random number between 1
 * and 5: 3". A random number between 1 and 5 is generated, in this case 3.
 * 
 * So, the output for each operation is displayed, providing a brief summary of what
 * the function does with each specific hash code.
 */
function mainFunction() {
    let a = 0;

    for (let i = 0; i < 10; i++) {
        console.log("Loop iteration: " + i);
    }

    for (let i = 0; i < 5; i++) {
        a += i;
    }

    for (let i = 0; i < 5; i++) {
        a += i;
    }
    
    for (let i = 0; i < 5; i++) {
        a += i;
    }
    
    /**
     * @description This function calculates the hash code of a given string using a
     * simple hashing algorithm. It takes in a string as input, iterates through each
     * character of the string, converts each character to a numeric code using its Unicode
     * value, and then computes the hash code by taking the result of these code conversions
     * and converting it back to an integer using a bitwise shift and modulo operation.
     * The resulting hash code can be used for various purposes such as storing the string
     * in a hash table or performing similarity checks between strings.
     * 
     * @param { string } str - The `str` input parameter is used as the sequence of
     * characters to be hashed in the function. It undergoes a process of conversion into
     * a numerical representation, known as character codes, which are then used to compute
     * the hash value using bitwise operations and modular arithmetic.
     * 
     * @returns { integer } The `hashCode()` function returns an integer value that
     * represents a hash of a given string. The function works by iterating through the
     * characters of the string and assigning them a unique hash code based on their ASCII
     * code. The resulting hash code is always 32 bits in length, which means it can
     * represent any integer value between -2147483648 and 2147483647.
     * 
     * In simple terms, the function takes a string as input and returns a unique numerical
     * representation of that string, which can be used for various purposes such as
     * storing the string in a database or performing comparisons with other strings.
     */
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    /**
     * @description This function takes a hash code as an input and performs different
     * operations based on the value of the hash code. The function has 6 cases, each
     * corresponding to a specific hash code:
     * 
     * 1/ `hashCode("increment"):` Increments the variable `a` and logs a message to the
     * console.
     * 2/ `hashCode("decrement"):` Decrements the variable `a` and logs a message to the
     * console.
     * 3/ `hashCode("check_even_odd"):` Checks whether `a` is even or odd and logs a
     * message to the console accordingly.
     * 4/ `hashCode("calculate_sum"):` Calculates the sum of the numbers from 1 to `a`
     * and logs the result to the console.
     * 5/ `hashCode("calculate_factorial"):` Calculates the factorial of `a` and logs the
     * result to the console.
     * 6/ `hashCode("generate_random"):` Generates a random number between 1 and `a` and
     * logs the result to the console.
     * 
     * The function also has a default case that handles any invalid operation.
     * 
     * @param { string } hash - In the provided function `innerFunction`, the `hash` input
     * parameter serves as a switch statement's value that determines which action to
     * perform within the function. The value of `hash` is used to identify the specific
     * operation to execute based on its predefined code in the `switch` statement.
     */
    function innerFunction(hash) {
        switch (hash) {
            case hashCode("increment"):
                a++;
                console.log("Value of 'a' incremented");
                break;
            case hashCode("decrement"):
                a--;
                console.log("Value of 'a' decremented");
                break;
            case hashCode("check_even_odd"):
                if (a % 2 === 0) {
                    console.log("Value of 'a' is an even number");
                } else {
                    console.log("Value of 'a' is an odd number");
                }
                break;
            case hashCode("calculate_sum"):
                let sum = 0;
                for (let i = 1; i <= a; i++) {
                    sum += i;
                }
                console.log("Sum from 1 to " + a + " is: " + sum);
                break;
            case hashCode("calculate_factorial"):
                let factorial = 1;
                for (let i = 1; i <= a; i++) {
                    factorial *= i;
                }
                console.log("Factorial of " + a + " is: " + factorial);
                break;
            case hashCode("generate_random"):
                let randomNumber = Math.floor(Math.random() * (a + 1)) + 1;
                console.log("Random number between 1 and " + a + ": " + randomNumber);
                break;
            default:
                console.error("Invalid operation");
        }
    }

    innerFunction(hashCode("increment"));
    innerFunction(hashCode("decrement"));
    innerFunction(hashCode("check_even_odd"));
    innerFunction(hashCode("calculate_sum"));
    innerFunction(hashCode("calculate_factorial"));
    innerFunction(hashCode("generate_random"));
}

mainFunction();
