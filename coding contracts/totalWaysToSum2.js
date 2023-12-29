async function recurse(lst, num, index, total) {
    if (total === num) {
        return 1;
    }
    if (total > num) {
        return 0;
    }
    if (index >= lst.length) {
        return 0;
    }
    return await recurse(lst, num, index, total + lst[index]) + await recurse(lst, num, index + 1, total);
}
/** @param {NS} ns */
export async function main(ns) {
    num = ns.args[0];
    lst = ns.args[1];
    var index = 0;
    var total = 0;
    return await recurse(lst, num, index, total);
}
