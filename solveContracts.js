function findDistinctCombos(num, maximum, memo = new Map()) {
    const key = `${num}-${maximum}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (num === 0) {
        return 1;
    } else if (num < 0 || maximum === 0) {
        return 0;
    }
    const result = findDistinctCombos(num - maximum, maximum, memo) + findDistinctCombos(num, maximum - 1, memo);
    memo.set(key, result);
    return result;
}

function arrayCombos(num, lst, index, total, memo = new Map()) {
    const key = `${num}-${index}-${total}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    if (total === num) {
        return 1;
    }
    if (total > num) {
        return 0;
    }
    if (index >= lst.length) {
        return 0;
    }
    const result = arrayCombos(num, lst, index, total + lst[index], memo) + arrayCombos(num, lst, index + 1, total, memo);
    memo.set(key, result);
    return result;
}

function printLogging(ns, str, type, server) {
    if (str != "") {
        ns.tprint("\u001b[35m" + "Solved " + type + " contract on " + server + "\u001b[0m");
    } else {
        ns.tprint("\u001b[31m" + "Failed to solve " + type + " contract on " + server + "\u001b[0m");
    }
}
/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var file = ns.args[1];
    var verbose = ns.args[2];
    switch (await ns.codingcontract.getContractType(file, server)) {
        case "Total Ways to Sum":
            var data = await ns.codingcontract.getData(file, server);
            var soln = await findDistinctCombos(data, data) - 1;
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Total Ways to Sum", server);
            }
            break;
        case "Total Ways to Sum II":
            var data = await ns.codingcontract.getData(file, server);
            var soln = await arrayCombos(data[0], data[1], 0, 0);
            var str = await ns.codingcontract.attempt(soln, file, server);
            if (verbose) {
                printLogging(ns, str, "Total Ways to Sum II", server);
            }
            break;
        default:

            break;
    }
}
