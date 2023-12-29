function recurse(lst, num, index, total) {
    if (total === num) {
        return 1;
    }
    if (total > num) {
        return 0;
    }
    if (index >= lst.length) {
        return 0;
    }
    return recurse(lst, num, index, total + lst[index]) + recurse(lst, num, index + 1, total);
}

function main(lst, num) {
    var index = 0;
    var total = 0;
    return recurse(lst, num, index, total);
}
