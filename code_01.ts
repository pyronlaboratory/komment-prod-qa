import React from 'react';


const MathComponent: React.FC = () => {


    /**
     * @description takes two `number` parameters `a` and `b` and returns their sum.
     * 
     * @param { number } a - 1st operand of the addition operation performed by the
     * function `add`.
     * 
     * @param { number } b - second number to be added to the `a` input parameter and
     * returns their sum as a single number.
     * 
     * @returns { number } the sum of the two input numbers.
     */
    function add(a: number, b: number): number {
        return a + b;
    }


    /**
     * @description calculates the sine of a given number `a`.
     * 
     * @param { number } a - angle of sine calculation, which is passed to the `Math.sin()`
     * method for computation and returned as the sinusoidal value.
     * 
     * @returns { number } the sine of the input `a`, which is a number.
     */
    function sin(a: number): number {
        return Math.sin(a);
    }

    const results = [
        add(5, 3),
        subtract(5, 3),
        multiply(5, 3),
        divide(5, 3),
        modulus(5, 3),
        power(5, 3),
        squareRoot(25),
        absolute(-5),
        round(5.4),
        floor(5.8),
        ceiling(5.2),
        log(10),
        sin(Math.PI / 2)
    ];

    return (
        <div>
            <h1>Math Results</h1>
            {/**
             * @description takes an array of objects, maps each object to a list item, and returns
             * the generated list.
             */}
            <ul>
                {results.map((result, index) => (
                    <li key={index}>Result {index + 1}: {result}</li>
                ))}
            </ul>
        </div>
    );
}

export default MathComponent;
