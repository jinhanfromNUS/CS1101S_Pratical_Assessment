//2223 PA

// TASK 1A

function take(n, xs) {
    return n === 0
           ? null
           : pair(head(xs), take(n-1, tail(xs)));
}

function drop(n, xs) {
    return n === 0
           ? xs
           : drop(n-1, tail(xs));
}

function insert_subseq(L, pos, S) {

    return append(take(pos, L), append(S, drop(pos, L)));

}

// TASK 1B

function take(n, xs) {
    return n === 0
           ? null
           : pair(head(xs), take(n-1, tail(xs)));
}

function drop(n, xs) {
    return n === 0
           ? xs
           : drop(n-1, tail(xs));
}


function remove_subseq(L, start_pos, end_pos) {

    return append(take(start_pos, L), drop(end_pos+1, L));

}

// TASK 2A

function is_member(word, xs) {
    return !is_null(member(word, xs));
}


function is_prefix_of(subseq, seq) {

    return is_null(seq) && !is_null(subseq)
           ? false
           : is_null(subseq)
           ? true
           : head(subseq) === head(seq)
           ? accumulate((x, y) => is_member(x, seq) && y, true, subseq)
           : false;

}

// TASK 2B

// The following function(s) have been pre-declared here for you
// to use in this task. Do not re-declare them.
/*
function is_prefix_of(subseq, seq) {
    // Implementation not shown.
}
*/

function tail_n_times(xs, n) {
    return is_null(xs)
           ? null
           : n <= 0
           ? xs
           : tail_n_times(tail(xs), n - 1);
}

      
// ideas:

// if length of sequence < length of old subsequence
//     then return sequence

// else 
//     if is_prefix_of(old_sub, seq)                    //first case
//         const removed = tail_n_times(sequence, length of old sequence);
//         append(new_sub, subseq_replace(new_sub, old_sub, removed));  //[since new_sub is a list, so use append]
//     else pair(head(seq), subseq_replace(new_sub, old_sub, tail(seq)));


function subseq_replace(new_sub, old_sub, seq) {
    if(length(seq) < length(old_sub)) {
        return seq;
    } else {
        if(is_prefix_of(old_sub, seq)) {
            const removed = tail_n_times(seq, length(old_sub));
            return append(new_sub, subseq_replace(new_sub, old_sub, removed));
        } else {
            return pair(head(seq), subseq_replace(new_sub, old_sub, tail(seq)));
        }
    }
}

// TASK 3A

function map_tree(f, tree) {
return map(sub_tree =>
!is_list(sub_tree)
? f(sub_tree)
: map_tree(f, sub_tree),
tree);
}

function list_only(tree) {
    return filter(x => is_list(x), tree);
}

function digit_only(tree) {
    return filter(x => is_number(x), tree);
}


function make_NiFT(T) {

    const xs_list = list_only(T);
    const num_list = digit_only(T);
    return append(num_list, map(x => make_NiFT(x), xs_list));

}

// TASK 4

// You may write helper functions here.
let counter = 0;
function shortest_path_length(maze, start_row, start_col) {
    const nrows = array_length(maze);
    const ncols = array_length(maze[0]);
    let i = start_row;
    let j = start_col;

    if (maze[i][j] === "G") {   // first case
        return counter;
    }
    else if (i < 2) {
        if (maze[i+1][j] !== "#") {
            i = i + 1;
            counter = counter + 1;
        } else if (maze[i+1][j] === "#" && j !== 3 && maze[i][j+1] !== "#") {
            j = j + 1;
            counter = counter + 1;
        } else { return Infinity; }
    }
    else if (i > 2) {
        if (maze[i-1][j] !== "#") {
            i = i - 1;
            counter = counter + 1;
        } else if (maze[i-1][j] === "#" && j !== 3 && maze[i][j+1] !== "#") {
            j = j + 1;
            counter = counter + 1;
        } else { return Infinity; }
    }
    else if(i === 2) {
        if(j !== 3 && maze[i][j+1] !== "#") {
            j = j + 1;
            counter = counter + 1;
        } else { return Infinity; }
    }
    return shortest_path_length(maze, i, j); 
}

//notice: when replace else if with while
//the code does not work anymore and I do not understand why

//or
//a better version where all the Infinity path is within consideration
let counter = 0;
function shortest_path_length(maze, start_row, start_col) {
    const nrows = array_length(maze);
    const ncols = array_length(maze[0]);
    let i = start_row;
    let j = start_col;
    if (   (i === 0     || maze[i-1][j] === "#")
        && (i === nrows || maze[i+1][j] === "#")
        && (j === 0     || maze[i][j-1] === "#")
        && (j === ncols || maze[i][j+1] === "#")) {
        return Infinity;
    } else {
        if (maze[i][j] === "G") {   // first case
            return counter;
        }
        else if (i < 2) {
            if (maze[i+1][j] !== "#") {
                i = i + 1;
                counter = counter + 1;
            } else if (maze[i+1][j] === "#" && j !== 3 && maze[i][j+1] !== "#") {
                j = j + 1;
                counter = counter + 1;
            } else { return Infinity; }
        }
        else if (i > 2) {
            if (maze[i-1][j] !== "#") {
                i = i - 1;
                counter = counter + 1;
            } else if (maze[i-1][j] === "#" && j !== 3 && maze[i][j+1] !== "#") {
                j = j + 1;
                counter = counter + 1;
            } else { return Infinity; }
        }
        else if (i === 2) {
            if(j !== 3 && maze[i][j+1] !== "#") {
                j = j + 1;
                counter = counter + 1;
            } else { return Infinity; }
        }
        return shortest_path_length(maze, i, j); 
    }
}

//Take note that both version are unable to solve u-turn maze