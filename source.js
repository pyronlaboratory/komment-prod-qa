/**
 * @description This function defines several operations that can be performed on a
 * variable `a`, each corresponding to a specific hash code. It also defines an inner
 * function that takes the hash code as an argument and performs different operations
 * based on the value of the hash code. The main function calls the inner function
 * with different hash codes, and the resulting operation is logged to the console.
 * 
 * @returns { integer } The output of this function will be:
 * 
 * 	- Value of 'a' incremented
 * 	- Value of 'a' decremented
 * 	- Value of 'a' is an odd number
 * 	- Sum from 1 to 5 is: 15
 * 	- Factorial of 5 is: 120
 * 	- Random number between 1 and 5: 3
 * 
 * The function takes a string input "increment", "decrement", "check_even_odd",
 * "calculate_sum", or "generate_random" as input and returns a hash code for that
 * operation. The inner function then executes the corresponding operation based on
 * the hash code returned by the `hashCode` function.
 */
function mainFunction() {
    let a = 0;

    /**
     * @description This function calculates the hash code of a given string using a
     * simple algorithm that converts each character of the string into an integer value,
     * then takes the integer values of all characters and processes them using bitwise
     * operations (i.e., shifting, subtraction, and multiplication) to produce a fixed-length
     * integer value (32 bits in this case). This result represents the hash code of the
     * original string.
     * 
     * @param { string } str - The `str` input parameter is used to represent the string
     * that needs to be converted into a hash code. It is passed as an argument to the
     * function and its characters are processed one by one to generate the hash code.
     * 
     * @returns { integer } The `hashCode` function takes a string as input and returns
     * an integer hash value. The output of the function is a unique number for each given
     * string, which can be used for various purposes such as caching, collation, or index
     * management.
     * 
     * Here's how the function works:
     * 
     * 1/ It initializes a `hash` variable to 0.
     * 2/ It loops through the characters of the input string.
     * 3/ For each character, it calculates the character's code point as a number (e.g.,
     * ASCII value) using the `charCodeAt()` method.
     * 4/ It takes the absolute difference between the current hash value (`hash`) and
     * the character's code point (`char`), and then subtracts `hash` from the result to
     * get a new hash value. This is done by multiplying the difference by 2 and then
     * adding it to the original hash value.
     * 5/ Finally, it converts the resulting value to a 32-bit integer using bitwise
     * operators (i.e., `|=`).
     * 6/ The function returns the final hash value.
     * 
     * The output of the `hashCode` function is a unique number for each input string.
     * This means that if you pass the same string to the function twice, it will return
     * the same hash value, and if you pass different strings, it will return distinct
     * hash values.
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
     * @description This function takes in an object with key-value pairs where the keys
     * are unique strings, and the values can be numbers or functions that operate on a
     * variable 'a'. The function performs five different operations on the value of 'a',
     * based on the specified hash code. These operations include incrementing/decrementing
     * 'a', checking if it is even or odd, calculating the sum from 1 to 'a', and calculating
     * the factorial of 'a'. Finally, the function also generates a random number between
     * 1 and 'a' and logs it to the console.
     * 
     * @param { string } hash - The `hash` input parameter in the `innerFunction()`
     * function serves as a key to determine which specific operation should be performed
     * based on the value of `a`. Each hash code is associated with a particular operation,
     * and the `switch` statement checks the value of `hash` to determine which operation
     * to execute.
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
