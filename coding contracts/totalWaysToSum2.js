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
    const lst = [1, 2, 9, 10, 11, 14, 16, 17, 18, 21, 23];
    const num = 125;
    var index = 0;
    var total = 0;
    return recurse(lst, num, index, total);
}
