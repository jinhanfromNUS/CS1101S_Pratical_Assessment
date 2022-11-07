//22/23 Mock PA
//if wrong, you can check your output by copying the testcases and compare

//Question 1 of 8
// !!Important concept to check whether something is within the list or not
function is_pa_word(s) {
    return !is_null(member(s, pa_words));
}

//or my answer

//my answer
function is_pa_word(s) {
    return is_null(member(s, pa_words))
           ? false
           : true;
}

//Question 2 of 8
function count_matches(char, pos) {
    const filtered_list = filter(x => char === char_at(x, pos), pa_words);
    return length(filtered_list);
}

//Question 3 of 8
//pair the characters (the characters are obtained by using char_at function)
function char_stream(s) {
    function char_at_helper(s, n) {
        return pair(char_at(s, n), () => char_at_helper(s, n+1));
    }
    return char_at_helper(s, 0);
}

//Question 4 of 8
//!!Important concept on how to output a list which fulfills a list of conditions

function solve(n, constraints) {
    const pa_length_filtered = filter(x => string_length(x) === n, pa_words);
    function satisfy_character_condition(word) {
        return accumulate((x, y) => char_at(word, head(x)) === tail(x) && y, true, constraints);    
        //check the word whether fulfills all the conditions or not (return true/false)
        //x is one pair of constraints
    }
    return filter(satisfy_character_condition, pa_length_filtered);
    // filter function will run(put) every words from the list to the predicate to check whether it fulfills it or not
    //because filter function will extract a word from the list, therefore the parameter at the pred
}

function solve(n, constraints) {
    const pa_length_filtered = filter(x => string_length(x) === n, pa_words);
    function constraints_condition(word, constraints){
        return is_null(constraints)
               ? true
               : char_at(word, head(head(constraints))) === tail(head(constraints))
               ? constraints_condition(word, tail(constraints))
               : false;
    }
    return filter(x => constraints_condition(x, constraints), pa_length_filtered);
}

//Question 5 of 8

/*
!!Important concept on how to write a waiting function, AKA a funciton which returns a function
    (reuires parameter to work)
    
General idea:   use a helper function
function name(initial_parameter) {
    function a_function(if_given_parameter) {
        return if_given_parameter;
        display("The function has been given parameter!");
    }
    return a_function;
}

Exmaple:
function multiplication_with_x(x) {
    function waiting_unknown(unknown) {
        return unknown * x;
    }
    return waiting_unknown;
}

const multiply_2 = multiplication_with_x(2);
multiply_2(8);

*/
//accumulate method: 
function eval_poly(poly) {
    function waiting_unknown_eval_poly(unknown) {
        return accumulate((x, y) => head(x) * math_pow(unknown, tail(x)) + y, 0, poly);
        //x is one pair of poly
    }
    return waiting_unknown_eval_poly;
}

function eval_poly(poly) {
    function waiting_unknown_eval_poly(x) {                         //to wait the input unknown x
        return input_into_calculator(poly, x);                      //output a function to do the recursion
    }
    function input_into_calculator(poly, x) {                       //recursion for the calculator function
        return is_null(poly)
               ? 0
               : calculator(head(poly), x) + input_into_calculator(tail(poly), x);
    }
    function calculator(single_poly, x) {                           //calculating the value of a single poly
        return head(single_poly) * math_pow(x, tail(single_poly));
    }
    return waiting_unknown_eval_poly;
    //return a function
}

function eval_poly(poly) {
    function waiting_unknown_eval_poly(x) {
        return real_evaluater(poly, x);
    }
    function real_evaluater(poly, x) {
        return is_null(poly)
               ? 0
               : head(head(poly)) * math_pow(x, tail(head(poly))) + real_evaluater(tail(poly), x);
    }
    return waiting_unknown_eval_poly;
}

//Question 6 of 8
function add_poly(poly1, poly2) {
    if (is_null(poly1)) {
        return poly2;
    } else if (is_null(poly2)) {
        return poly1;
    } else {
        const coeff1 = head(head(poly1));
        const coeff2 = head(head(poly2));
        const exp1 = tail(head(poly1));
        const exp2 = tail(head(poly2));

        if (exp1 === exp2) {
            if (coeff1 + coeff2 === 0) {                        //note that when coeff is zero, it shouldn't include to the list
                return add_poly(tail(poly1), tail(poly2));
            }
            return pair(pair(coeff1 + coeff2, exp1), add_poly(tail(poly1), tail(poly2)));
        } else if (exp1 < exp2) {
            return pair(pair(coeff1, exp1), add_poly(tail(poly1), poly2));
        } else {
            return pair(pair(coeff2, exp2), add_poly(poly1, tail(poly2)));
        }
    }
}

//Question 7 of 8

function multiply_calculator(pair1, pair2) {                    //the calculator which calculate single term * single term
    const coeff1 = head(pair1);
    const power1 = tail(pair1);
    const coeff2 = head(pair2);
    const power2 = tail(pair2);
    return pair(coeff1 * coeff2, power1 + power2);
}

function put_poly1_to_poly2_equation(single_poly1, poly2) {             //map a function to every term of poly 2 (the function is single_poly1 * x)
    return map(x => multiply_calculator(single_poly1, x), poly2);       //if you intend to apply a function to a list, use map
}

//or my answer

function put_poly1_to_poly2_equation(single_poly1, poly2) {
    return is_null(poly2)
          ? null
          : pair(multiply_calculator(single_poly1, head(poly2)),
             put_poly1_to_poly2_equation(single_poly1, tail(poly2)));
}

function multiply_poly(poly1, poly2) {
    return is_null(poly1)
           ? null
           : add_poly(put_poly1_to_poly2_equation(head(poly1), poly2),
             multiply_poly(tail(poly1), poly2));
}

//Question 8 of 8
//When doing matrix question, it is better to draw out a matrix (table) with i/x by the sides/top
//find the relationship of the matrix (use i, x, column and row)
//you can also use if / else to ease your calculations
function alt_column_matrix(R, C) {
    const M = [];
    for(let i = 0; i < R; i = i + 1) {
        M[i] = [];
        for(let x = 0; x < C; x = x + 1) {
            if(x === 0) {
                M[i][x] = i+1;
            } else {
                M[i][x] = (2 * x * R) + 1 - M[i][x-1];      //found the relationship (using table)
            }
        }
    }
    return M;
}

/*
relationship:
Added value - last column value = current column value
Added value = 2 * x * row * 1;
last column value = M[i][x-1];
*/

alt_column_matrix(4, 5);

function alt_column_matrix(R, C) {
    const M = [];
    for(let i = 0; i < R; i = i + 1) {
        M[i] = [];
        for(let x = 0; x < C; x = x + 1) {
            if (x % 2 === 0) {                              //split by case
                M[i][x] = i + 1 + x * R;
            } else {
                M[i][x] = (x+1) * R - i;
            }
        }
    }
    return M;
}

alt_column_matrix(4, 5);




