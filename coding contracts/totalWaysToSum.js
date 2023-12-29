function findDistinctCombos(num, maximum) {
    if (num === 0) {
        return 1;
    } else if (num < 0 || maximum === 0) {
        return 0;
    } else {
        return findDistinctCombos(num - maximum, maximum) + findDistinctCombos(num, maximum - 1);
    }
}

function main(num) {
    return findDistinctCombos(num, num) - 1;
}
